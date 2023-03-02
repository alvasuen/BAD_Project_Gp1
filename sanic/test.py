import subprocess

a = "vx2u5uUu3DE"

subprocess.call(['ffmpeg', '-i', '../media_hub/video/vx2u5uUu3DE.mp4', '-vf', 'ass='+'../media_hub/SrtFiles/'+ a +'.ass', '../media_hub/combined/vx2u5uUu3DE.mp4'])
print("merged!!")