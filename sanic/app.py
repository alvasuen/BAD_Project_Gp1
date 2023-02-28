from sanic import Sanic
from sanic.response import json
import subprocess
import os
import datetime
import os
import whisperx
import ffmpeg


app = Sanic ("Karaoke")


@app.post("/sanicytdl")
def test(request):
   try:
      data = request.json
      # print(data.data.videoDetails.videoId)
      with subprocess.Popen(['spleeter', 'separate', '-p', 'spleeter:2stems', '-o', '../media_hub/spleeter', '{data.data.videoDetails.videoId}.mp3'], stdout=subprocess.PIPE) as proc:
         print(proc.stdout.read())

      old_name1 = r'C:\Users\Alva\Karaoke_Proj\BAD_Project_Gp1\media_hub\spleeter\vocals.wav'
      new_name2 = r'C:\Users\Alva\Karaoke_Proj\BAD_Project_Gp1\media_hub\spleeter\{data.data.videoDetails.videoId}_vocals.wav'
      with os.rename(old_name1,new_name2):
         print('Amended name of the vocal file')

      old_name3 = r'C:\Users\Alva\Karaoke_Proj\BAD_Project_Gp1\media_hub\spleeter\accompaniment.wav'
      new_name4 = r'C:\Users\Alva\Karaoke_Proj\BAD_Project_Gp1\media_hub\spleeter\{data.data.videoDetails.videoId}_accompaniment.wav'
      with os.rename(old_name3,new_name4):
         print('Amended name of the accompaniment file')

      #open a folder in S3 (name: the video ID)
      #save the video file in S3
      #save the vocal file in S3

      #Gen whisper lyrics subtitle
      device = "cpu"

      model = whisperx.load_model("medium.en")
      result = model.transcribe("SomeoneLikeYou.mp4", fp16=False, language='English' )
      model_a, metadata = whisperx.load_align_model(language_code="en", device=device)
      result_aligned = whisperx.align(result["segments"], model_a, metadata, "SomeoneLikeYou.mp4", device)
      aligned_segments = result_aligned["segments"]
      aligned_word_segments = result_aligned["word_segments"]

    #generate sentence-level srt
      def generate_sentence_srt():
         count = 1
         for segment in aligned_segments:
            startTime = str(0)+str(datetime.timedelta(seconds=int(segment['start'])))+','+ str(str(segment['start'])+'000').split('.')[1][0:3]
            endTime = str(0)+str(datetime.timedelta(seconds=int(segment['end'])))+','+ str(str(segment['end'])+'000').split('.')[1][0:3]
            text = segment['text']
            segmentId = count
            count+=1
            segment = f"{segmentId}\n{startTime} --> {endTime}\n{text[1:] if text[0] is ' ' else text}\n\n"


            srtFilename = os.path.join("../media_hub/SrtFiles", f"{data.data.videoDetails.videoId}_sentence.srt")
            with open(srtFilename, 'a', encoding='utf-8') as srtFile:
               srtFile.write(segment)

         return srtFilename

      #generate word-level srt
      def generate_word_srt ():
         count = 1

         for segment in aligned_word_segments:
            startTime = str(0)+str(datetime.timedelta(seconds=int(segment['start'])))+','+ str(str(segment['start'])+'000').split('.')[1][0:3]
            endTime = str(0)+str(datetime.timedelta(seconds=int(segment['end'])))+','+ str(str(segment['end'])+'000').split('.')[1][0:3]
            text = segment['text']
            segmentId = count
            count+=1
            segment = f"{segmentId}\n{startTime} --> {endTime}\n{text[1:] if text[0] is ' ' else text}\n\n"

            srtFilename = os.path.join("../media_hub/SrtFiles", f"{data.data.videoDetails.videoId}_word.srt")
            with open(srtFilename, 'a', encoding='utf-8') as srtFile:
               srtFile.write(segment)

         return srtFilename
   

      with generate_sentence_srt():
         print("Generated sentence-level subtitles")
      
      with generate_word_srt ():
         print("Generated word-level subtitles")

      #save the srt files in S3


      #MERGE THE AUDIO WITH VIDEO
      input_video = ffmpeg.input("../media_hub/video/{data.videoDetails.videoId}.mp4")
      input_audio = ffmpeg.input("../media_hub/spleeter/{data.videoDetails.videoId}_accompaniment.wav")
      ffmpeg.concat(input_video, input_audio, v=1, a=1).output("../media_hub/combined/{data.videoDetails.videoId}_finished.mp4")

      #MERGE THE VIDEO WITH SRT
      srtFile = "../media_hub/SrtFile/{data.data.videoDetails.videoId}.srt"
      input_video1 = "../media_hub/combined/{data.data.videoDetails.videoId}.mp4"


      #save the finished video to S3

      return json({"success":"true"})
   
   except:
      print("Attempt fail!")
      return json({"success":"false"})



if __name__ == '__main__':
   app.run(host='0.0.0.0', port=8080, debug=True)
