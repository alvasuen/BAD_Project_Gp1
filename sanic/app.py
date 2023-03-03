from sanic import Sanic
from sanic.response import json
import subprocess
import os
import datetime
import os
import whisperx
import ffmpeg
import asyncio
import psycopg2

# conn = psycopg2.connect(dbname = DB_NAME, user=DB_USER, password=DB_PASSWORD, host=DB_HOST)
conn = psycopg2.connect(dbname = "karaoke", user="karaoke", password="karaoke", host="localhost")
cur = conn.cursor()

print("1")
app = Sanic("Karaoke")

model = whisperx.load_model("medium")
print("model loaded")


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
        segment = f"{segmentId}\n{startTime} --> {endTime}\n{text[1:] if text[0] == ' ' else text}\n\n"

        a= data["ytId"]

        srtFilename = os.path.join(
            "../media_hub/SrtFiles", f"{a}_sentence.srt")
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
        segment = f"{segmentId}\n{startTime} --> {endTime}\n{text[1:] if text[0] == ' ' else text}\n\n"

        a= data["ytId"]

        srtFilename = os.path.join(
            "../media_hub/SrtFiles", f"{a}_word.srt")
        with open(srtFilename, 'a', encoding='utf-8') as srtFile:
            srtFile.write(segment)

    return srtFilename


def generate_ass (ytId):
    print("test generate ass function")
    with open(f"../media_hub/SrtFiles/{ytId}_sentence.srt", "r", encoding="utf-8") as f:
        sentenceLines = f.read().split("\n")

    # Read the word-level .srt file
    with open(f"../media_hub/SrtFiles/{ytId}_word.srt", "r", encoding="utf-8") as f:
        wordLines = f.read().split("\n")

    assLines = []
    assLines.append("[Script Info]")
    assLines.append("ScriptType: v4.00+")
    assLines.append("PlayResX: 384")
    assLines.append("PlayResY: 288")
    assLines.append("ScaledBorderAndShadow: yes")
    assLines.append("")
    assLines.append("[V4+ Styles]")
    assLines.append(
    "Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding"
    )
    assLines.append(
    "Style: Default,Arial,18,&Hffffff,&Hff66ff,&H0,&H0,0,0,0,0,100,100,0,0,1,1,0,2,10,10,10,0"
    )
    assLines.append("[Events]")
    assLines.append(
    "Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text"
    )

    # mark the first word of every sentence
    sentenceWordCount = []
    count = 0
    sentenceWordCount.append(1)
    for i in range(2,len(sentenceLines),4):
        words = sentenceLines[i].split(' ')
        count += len(words)
        sentenceWordCount.append(count + 1)
    sentenceWordCount.pop()

    wordDuration = []
    word = []

    for i in range(2,len(wordLines),4):
    # count first word of every sentence
        wordCount = int(wordLines[i - 2])
        if wordCount in sentenceWordCount:
            msStart = int(wordLines[i - 1][9:11])
            sStart = int(wordLines[i - 1][6:8]) * 100
            mStart = int(wordLines[i - 1][3:5]) * 60 * 100

            wordStart = msStart + sStart + mStart

            msEnd = int(wordLines[i - 1][26:28])
            sEnd = int(wordLines[i - 1][23:25]) * 100
            mEnd = int(wordLines[i - 1][20:22]) * 60 * 100

            wordEnd = msEnd + sEnd + mEnd
            duration = wordEnd - wordStart
            wordDuration.append(duration)
            word.append(wordLines[i])
        else:
            msStart = int(wordLines[i - 5][26:28])
            sStart = int(wordLines[i - 5][23:25]) * 100
            mStart = int(wordLines[i - 5][20:22]) * 60 * 100

            wordStart = msStart + sStart + mStart

            msEnd = int(wordLines[i - 1][26:28])
            sEnd = int(wordLines[i - 1][23:25]) * 100
            mEnd = int(wordLines[i - 1][20:22]) * 60 * 100

            wordEnd = msEnd + sEnd + mEnd
            duration = wordEnd - wordStart
            wordDuration.append(duration)
            word.append(wordLines[i])

    arr = []
    for i in range(0,len(sentenceLines),1):
        # Split the sentence line into fields
        sentenceFields = sentenceLines[i].split(" ")
        arr.append(sentenceFields)

    str1 = ""
    for i in range(2,len(sentenceLines),4):
        words = sentenceLines[i].split(" ")
        for m in range(0,len(words),1): 
            # loop every sentenceLines every lyrics
            str1 += arr[i][m] + ' '

    singleWord = str1.split(" ")

    count2 = 0
    sentenceWordLine = ""
    for i in range(2,len(sentenceLines),4):
        words = sentenceLines[i].split(" ")
        for m in range(0,len(words),1):

            sentenceWordLine += "{\\kf" + str(wordDuration[count2])+ "}"
            sentenceWordLine += singleWord[count2] + " "
            count2 = count2 + 1

        assLine = "Dialogue: 0," + sentenceLines[i-1][0:11].replace(",",".") + "," + sentenceLines[i-1][17:28].replace(",",".") + ",Default,,0000,0000,0000,karaoke," + sentenceWordLine
        assLines.append(assLine)
        sentenceWordLine = ""

    # Write the .ass file
    with open(f"../media_hub/SrtFiles/{ytId}.ass", "w", encoding="utf-8") as f:
        f.write( "\n".join(assLines))
    # f = open("Video.mp4.ass", assLines.join("\n"), "utf-8", "w")
    print(assLines)


job_status = {}

async def background_runner(request, job_id):
    try:
        job_status[job_id] = 1
        # Step1:
        data = request.json
        ytId = data["ytId"]
        status_id = data["status_id"]
        print(ytId)
        print(data["language"])

        cur.execute("UPDATE download_status SET status = %s WHERE status_id = %s;", (1, status_id))
        conn.commit()

        job_status[job_id] = 2
        # Step2: vocal and accompaniment separation
        subprocess.call(['spleeter', 'separate', '-p', 'spleeter:2stems', '-o', '../media_hub/spleeter', '../media_hub/audio/{}.mp3'.format(ytId)])
        print("separation done!")

        cur.execute("UPDATE download_status SET status = %s WHERE status_id = %s;", (2, status_id))
        conn.commit()

        job_status[job_id] = 3
        # Step3: generate the subtitles
        device = "cpu"
        
        if (data["language"] == "English"):
            video_language = "English"
            video_language_code = "en"
            print("English123")
        elif (data["language"] == "Mandarin"):
            video_language = "Chinese"
            video_language_code = "zh"
            print("Mandarin123")

        print("got video language")

        result = model.transcribe(
            f"../media_hub/audio/{ytId}.mp3", fp16=False, language=video_language)
        
        job_status[job_id] = 4
        # Step4: load the aligned version of the subtitles
        model_a, metadata = whisperx.load_align_model(
            language_code=video_language_code, device=device)
        
        print("model_a, metadata ran")

        cur.execute("UPDATE download_status SET status = %s WHERE status_id = %s;", (3, status_id))
        conn.commit()

        result_aligned = whisperx.align(
            result["segments"], model_a, metadata, f"../media_hub/audio/{ytId}.mp3", device)
        
        print("result_aligned ran")

        aligned_segments = result_aligned["segments"]
        aligned_word_segments = result_aligned["word_segments"]

        print((aligned_segments, aligned_word_segments))

        cur.execute("UPDATE download_status SET status = %s WHERE status_id = %s;", (4, status_id))
        conn.commit()

        job_status[job_id] = 5
         # generate sentence-level srt
        generate_sentence_srt(data, aligned_segments)
        print("generated sentence level srt")

        # generate word-level srt
        generate_word_srt(data, aligned_word_segments)
        print("generated word-level subtitles")

        job_status[job_id] = 6
        #generated ass file
        generate_ass (ytId)
        print("ass generated")

        cur.execute("UPDATE download_status SET status = %s WHERE status_id = %s;", (5, status_id))
        conn.commit()

        job_status[job_id] = 8
        #merge videos and ass subtitles
        subprocess.call(['ffmpeg', '-i', f'../media_hub/video/{ytId}.mp4', '-vf', 'ass='+'../media_hub/SrtFiles/'+ ytId +'.ass', f'../media_hub/combined/{ytId}.mp4'])
        print("Merge video with subtitles")

        cur.execute("UPDATE download_status SET status = %s WHERE status_id = %s;", (6, status_id))
        conn.commit()

        job_status[job_id] = 9
        #rename the vocal and accompaniment files in spleeter folder for easier recognition
        os.rename(f'../media_hub/spleeter/{ytId}/vocals.wav', f'../media_hub/spleeter/{ytId}/{ytId}_vocals.wav')
        print("vocals file renamed")

        os.rename(f'../media_hub/spleeter/{ytId}/accompaniment.wav', f'../media_hub/spleeter/{ytId}/{ytId}_accompaniment.wav')
        print("accompaniment file renamed")

        job_status[job_id] = 10
        #save video merged with ass, vocal and accompaniment mp3 to S3

        cur.execute("UPDATE download_status SET status = %s WHERE status_id = %s;", (7, status_id))
        conn.commit()

        return json({"success": "true"})


    except Exception as e:
        print(e)
        return json({"success": "false"})

import time


@app.post("/add_job")
def add_job(request):
    ts = time.time()
    job_id = str(ts)

    job_status[job_id] = 0
    task = request.app.add_task(background_runner(request, job_id = job_id), name = job_id)

    return json({ "job_id" : job_id })


@app.post("/get_job")
def get_job(request):

    data = request.json

    job_id = data["job_id"]

    task = request.app.get_task(job_id)

    return json({ "job_done" : task.done(), "job_status" : job_status[job_id] })



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
