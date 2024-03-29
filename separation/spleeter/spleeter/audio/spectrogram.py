#!/usr/bin/env python
# coding: utf8

""" Spectrogram specific data augmentation. """

# pyright: reportMissingImports=false
# pylint: disable=import-error
import numpy as np
import tensorflow as tf
from tensorflow.signal import hann_window, stft

# pylint: enable=import-error

__email__ = "spleeter@deezer.com"
__author__ = "Deezer Research"
__license__ = "MIT License"


def compute_spectrogram_tf(
    waveform: tf.Tensor,
    frame_length: int = 2048,
    frame_step: int = 512,
    spec_exponent: float = 1.0,
    window_exponent: float = 1.0,
) -> tf.Tensor:
    """
    Compute magnitude / power spectrogram from waveform as a
    `n_samples x n_channels` tensor.

    Parameters:
        waveform (tensorflow.Tensor):
            Input waveform as `(times x number of channels)` tensor.
        frame_length (int):
            Length of a STFT frame to use.
        frame_step (int):
            HOP between successive frames.
        spec_exponent (float):
            Exponent of the spectrogram (usually 1 for magnitude
            spectrogram, or 2 for power spectrogram).
        window_exponent (float):
            Exponent applied to the Hann windowing function (may be
            useful for making perfect STFT/iSTFT reconstruction).

    Returns:
        tensorflow.Tensor:
            Computed magnitude / power spectrogram as a
            `(T x F x n_channels)` tensor.
    """
    stft_tensor: tf.Tensor = tf.transpose(
        stft(
            tf.transpose(waveform),
            frame_length,
            frame_step,
            window_fn=lambda f, dtype: hann_window(
                f, periodic=True, dtype=waveform.dtype
            )
            ** window_exponent,
        ),
        perm=[1, 2, 0],
    )
    return tf.abs(stft_tensor) ** spec_exponent


def time_stretch(
    spectrogram: tf.Tensor,
    factor: float = 1.0,
    method: tf.image.ResizeMethod = tf.image.ResizeMethod.BILINEAR,
) -> tf.Tensor:
    """
    Time stretch a spectrogram preserving shape in tensorflow. Note that
    this is an approximation in the frequency domain.

    Parameters:
        spectrogram (tensorflow.Tensor):
            Input spectrogram to be time stretched as tensor.
        factor (float):
            (Optional) Time stretch factor, must be > 0, default to `1`.
        method (tensorflow.image.ResizeMethod):
            (Optional) Interpolation method, default to `BILINEAR`.

    Returns:
        tensorflow.Tensor:
            Time stretched spectrogram as tensor with same shape.
    """
    T = tf.shape(spectrogram)[0]
    T_ts = tf.cast(tf.cast(T, tf.float32) * factor, tf.int32)[0]
    F = tf.shape(spectrogram)[1]
    ts_spec = tf.image.resize_images(
        spectrogram, [T_ts, F], method=method, align_corners=True
    )
    return tf.image.resize_image_with_crop_or_pad(ts_spec, T, F)


def random_time_stretch(
    spectrogram: tf.Tensor, factor_min: float = 0.9, factor_max: float = 1.1, **kwargs
) -> tf.Tensor:
    """
    Time stretch a spectrogram preserving shape with random ratio in
    tensorflow. Applies time_stretch to spectrogram with a random ratio
    drawn uniformly in `[factor_min, factor_max]`.

    Parameters:
        spectrogram (tensorflow.Tensor):
            Input spectrogram to be time stretched as tensor.
        factor_min (float):
            (Optional) Min time stretch factor, default to `0.9`.
        factor_max (float):
            (Optional) Max time stretch factor, default to `1.1`.

    Returns:
        tensorflow.Tensor:
            Randomly time stretched spectrogram as tensor with same shape.
    """
    factor = (
        tf.random_uniform(shape=(1,), seed=0) * (factor_max - factor_min) + factor_min
    )
    return time_stretch(spectrogram, factor=factor, **kwargs)


def pitch_shift(
    spectrogram: tf.Tensor,
    semitone_shift: float = 0.0,
    method: tf.image.ResizeMethod = tf.image.ResizeMethod.BILINEAR,
) -> tf.Tensor:
    """
    Pitch shift a spectrogram preserving shape in tensorflow. Note that
    this is an approximation in the frequency domain.

    Parameters:
        spectrogram (tensorflow.Tensor):
            Input spectrogram to be pitch shifted as tensor.
        semitone_shift (float):
            (Optional) Pitch shift in semitone, default to `0.0`.
        method (tensorflow.image.ResizeMethod):
            (Optional) Interpolation method, default to `BILINEAR`.

    Returns:
        tensorflow.Tensor:
            Pitch shifted spectrogram (same shape as spectrogram).
    """
    factor = 2 ** (semitone_shift / 12.0)
    T = tf.shape(spectrogram)[0]
    F = tf.shape(spectrogram)[1]
    F_ps = tf.cast(tf.cast(F, tf.float32) * factor, tf.int32)[0]
    ps_spec = tf.image.resize_images(
        spectrogram, [T, F_ps], method=method, align_corners=True
    )
    paddings = [[0, 0], [0, tf.maximum(0, F - F_ps)], [0, 0]]
    return tf.pad(ps_spec[:, :F, :], paddings, "CONSTANT")


def random_pitch_shift(
    spectrogram: tf.Tensor, shift_min: float = -1.0, shift_max: float = 1.0, **kwargs
) -> tf.Tensor:
    """
    Pitch shift a spectrogram preserving shape with random ratio in
    tensorflow. Applies pitch_shift to spectrogram with a random shift
    amount (expressed in semitones) drawn uniformly in
    `[shift_min, shift_max]`.

    Parameters:
        spectrogram (tensorflow.Tensor):
            Input spectrogram to be pitch shifted as tensor.
        shift_min (float):
            (Optional) Min pitch shift in semitone, default to -1.
        shift_max (float):
            (Optional) Max pitch shift in semitone, default to 1.

    Returns:
        tensorflow.Tensor:
            Randomly pitch shifted spectrogram (same shape as spectrogram).
    """
    semitone_shift = (
        tf.random_uniform(shape=(1,), seed=0) * (shift_max - shift_min) + shift_min
    )
    return pitch_shift(spectrogram, semitone_shift=semitone_shift, **kwargs)
