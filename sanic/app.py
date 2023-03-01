from sanic import Sanic
from sanic.response import json
import subprocess
import os
import datetime
import os
import whisperx
import ffmpeg


app = Sanic("Karaoke")

# model_en = whisperx.load_model("medium.en")
# model_zh = whisperx.load_model("large")

# models = [model_en, model_zh]

model = whisperx.load_model("medium")


def generate_sentence_srt(data, aligned_segments):
    count = 1
    for segment in aligned_segments:
        startTime = str(0)+str(datetime.timedelta(seconds=int(segment['start'])))+',' + str(
            str(segment['start'])+'000').split('.')[1][0:3]
        endTime = str(0)+str(datetime.timedelta(seconds=int(segment['end'])))+',' + str(
            str(segment['end'])+'000').split('.')[1][0:3]
        text = segment['text']
        segmentId = count
        count += 1
        segment = f"{segmentId}\n{startTime} --> {endTime}\n{text[1:] if text[0] is ' ' else text}\n\n"

        srtFilename = os.path.join(
            "../media_hub/SrtFiles", f"{ytId}_sentence.srt")
        with open(srtFilename, 'a', encoding='utf-8') as srtFile:
            srtFile.write(segment)

    return srtFilename


def generate_word_srt(data, aligned_word_segments):
    count = 1

    for segment in aligned_word_segments:
        startTime = str(0)+str(datetime.timedelta(seconds=int(segment['start'])))+',' + str(
            str(segment['start'])+'000').split('.')[1][0:3]
        endTime = str(0)+str(datetime.timedelta(seconds=int(segment['end'])))+',' + str(
            str(segment['end'])+'000').split('.')[1][0:3]
        text = segment['text']
        segmentId = count
        count += 1
        segment = f"{segmentId}\n{startTime} --> {endTime}\n{text[1:] if text[0] is ' ' else text}\n\n"

        srtFilename = os.path.join(
            "../media_hub/SrtFiles", f"{ytId}_word.srt")
        with open(srtFilename, 'a', encoding='utf-8') as srtFile:
            srtFile.write(segment)

    return srtFilename


@app.post("/sanicytdl")
def test(request):

    try:
        data = request.json
        ytId = data["ytId"]
        # print(ytId)

        #Step1: vocal and accompaniment separation
        with subprocess.Popen(['spleeter', 'separate', '-p', 'spleeter:2stems', '-o', '../media_hub/spleeter', '../media_hub/audio/{}.mp3'.format(ytId)], stdout=subprocess.PIPE) as proc:
            print(proc.stdout.read())

        old_name1 = r'..\media_hub\spleeter\vocals.wav'
        new_name1 = r'..\media_hub\spleeter\{}_vocals.wav'.format(ytId)
        os.rename(old_name1, new_name1)
        print('Amended name of the vocal file')

        old_name2 = r'..\media_hub\spleeter\accompaniment.wav'
        new_name2 = r'..\media_hub\spleeter\{}_accompaniment.wav'.format(ytId)
        os.rename(old_name2, new_name2)
        print('Amended name of the accompaniment file')

        # open a folder in S3 (name: the video ID)
        # save the video file in S3
        # save the vocal file in S3

        # Gen whisper lyrics subtitle
        device = "cpu"

        if (data.language == "English"):
            video_language = "English"
            video_language_code = "en"
            # model=models[0]
        elif (data.languae == "mandarin"):
            video_language = "Chinese"
            video_language_code = "zh"
            # model=models[1]

        result = model.transcribe(
            "../media_hub/spleeter/{}_vocals.wav".format(ytId), fp16=False, language=video_language)
        model_a, metadata = whisperx.load_align_model(
            language_code=video_language_code, device=device)
        result_aligned = whisperx.align(
            result["segments"], model_a, metadata, "../media_hub/spleeter/{}_vocals.wav".format(ytId), device)
        aligned_segments = result_aligned["segments"]
        aligned_word_segments = result_aligned["word_segments"]

        # generate sentence-level srt
        generate_sentence_srt(data, aligned_segments)
        print("Generated sentence-level subtitles")

        # generate word-level srt
        generate_word_srt(data, aligned_word_segments)
        print("Generated word-level subtitles")

        # save the srt files in S3
        # TO-BE-DONE

        # MERGE THE AUDIO WITH VIDEO
        input_video = ffmpeg.input("../media_hub/video/{}.mp4".format(ytId))
        input_audio = ffmpeg.input(
            "../media_hub/spleeter/{}_accompaniment.wav".format(ytId))
        with ffmpeg.concat(input_video, input_audio, v=1, a=1).output("../media_hub/combined/{}_finished.mp4".format(ytId)):
            print("Merged the audio with video")

        # MERGE THE VIDEO WITH SRT
        srtFile = "../media_hub/SrtFile/{}.srt".format(ytId)
        input_video1 = "../media_hub/combined/{}.mp4".format(ytId)
        # TO-BE-DONE

        # save the finished video to S3
        # TO-BE-DONE

        return json({"success": "true"})

    except:
        print("Attempt fail!")
        return json({"success": "false"})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
