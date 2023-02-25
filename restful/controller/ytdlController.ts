import express from 'express';
const cors = require("cors");
const ytdl = require("ytdl-core");
const { createWriteStream } = require("fs");

let app = express();
export class ytdlController{

}

app.get("/download", (req, res) => {
    var URL = req.query.URL;
  
   ytdl.getInfo(URL,{downloadURL: true}).then((data)=>{
    console.log(data);
    ytdl(URL, { filter: "audioonly", quality: "highestaudio" }).pipe(createWriteStream(`../media_hub/audio/${data.videoDetails.videoId}.mp3`));
    ytdl(URL, { filter: "videoonly", quality: "highestvideo" }).pipe(createWriteStream(`../media_hub/video/${data.videoDetails.videoId}.mp4`));
  })
  });