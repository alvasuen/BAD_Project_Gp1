import subprocess

with subprocess.Popen(['spleeter', 'separate', '-p', 'spleeter:2stems', '-o', 'output', 'LoveStory.mp3'], stdout=subprocess.PIPE) as proc:
    print(proc.stdout.read())


# && python xx.py