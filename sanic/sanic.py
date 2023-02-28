from sanic import Sanic
from sanic.response
import json


app = Sanic ("Karaoke")


@app.post("/")
def test(request):
   return json({"hello":"world"})



if __name__ == '__main__':
   app.run(host='0.0.0.0', port=8080, debug=True)
