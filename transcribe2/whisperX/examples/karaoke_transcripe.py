print("1")
import datetime
import os
import whisperx
# import stable_whisper

device = "cpu"

model = whisperx.load_model("medium")
print("2")
result = model.transcribe("那些年.mp4", fp16=False, language='Chinese' )
# stable_whisper.results_to_sentence_srt(result, 'audio.srt')
print("3")
model_a, metadata = whisperx.load_align_model(language_code="zh", device=device)
print("4")
result_aligned = whisperx.align(result["segments"], model_a, metadata, "那些年.mp4", device)
print("5")
aligned_segments = result_aligned["segments"]
print("6")
aligned_word_segments = result_aligned["word_segments"]
print("7")

print(aligned_segments,aligned_word_segments)


def generate_sentence_srt():
    print('8')
    #generate sentence-level srt
    count = 1
    for segment in aligned_segments:
        startTime = str(0)+str(datetime.timedelta(seconds=int(segment['start'])))+','+ str(str(segment['start'])+'000').split('.')[1][0:3]
        endTime = str(0)+str(datetime.timedelta(seconds=int(segment['end'])))+','+ str(str(segment['end'])+'000').split('.')[1][0:3]
        text = segment['text']
        segmentId = count
        count+=1
        segment = f"{segmentId}\n{startTime} --> {endTime}\n{text[1:] if text[0] is ' ' else text}\n\n"


        srtFilename = os.path.join("SrtFiles", f"sentence.srt")
        with open(srtFilename, 'a', encoding='utf-8') as srtFile:
            srtFile.write(segment)

    return srtFilename


def generate_word_srt ():
    #generate word-level srt
    count = 1

    for segment in aligned_word_segments:
        startTime = str(0)+str(datetime.timedelta(seconds=int(segment['start'])))+','+ str(str(segment['start'])+'000').split('.')[1][0:3]
        endTime = str(0)+str(datetime.timedelta(seconds=int(segment['end'])))+','+ str(str(segment['end'])+'000').split('.')[1][0:3]
        text = segment['text']
        segmentId = count
        count+=1
        segment = f"{segmentId}\n{startTime} --> {endTime}\n{text[1:] if text[0] is ' ' else text}\n\n"

        srtFilename = os.path.join("SrtFiles", f"word.srt")
        with open(srtFilename, 'a', encoding='utf-8') as srtFile:
            srtFile.write(segment)

    return srtFilename

if __name__ == '__main__':
    # generate_sentence_srt()
    print('9')
    # generate_word_srt ()
    print("10")

