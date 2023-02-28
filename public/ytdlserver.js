// const express = require("express");
// const cors = require("cors");
// const ytdl = require("ytdl-core");
// const { createWriteStream } = require("fs");
// const app = express();


// app.use(cors());

// app.listen(4000, () => {
//   console.log("Server Works !!! At port 4000");
// });

// app.get("/download", (req, res) => {
//   var URL = req.query.URL;
//   //   res.json({ url: URL });

//  ytdl.getInfo(URL,{downloadURL: true}).then((data)=>{
//   console.log(data.videoDetails.thumbnails.at(-1));
//   ytdl(URL, { filter: "audioonly", quality: "highestaudio" }).pipe(createWriteStream(`../separation/spleeter/spleeter/script/${data.videoDetails.videoId}.mp3`));
//   ytdl(URL, { filter: "videoonly", quality: "highestvideo" }).pipe(createWriteStream(`../media_hub/video/${data.videoDetails.videoId}.mp4`));
// })
// });