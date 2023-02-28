from sanic import Sanic
from sanic.response import json
import json

app = Sanic ("Karaoke")

@app.post("/")


if __name__ == '__main__':
   app.run(host='0.0.0.0', port=8000, debug=True)
