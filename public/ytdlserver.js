const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");
const { createWriteStream } = require("fs");
const app = express();


app.use(cors());

app.listen(4000, () => {
  console.log("Server Works !!! At port 4000");
});

app.get("/download", (req, res) => {
  var URL = req.query.URL;
  //   res.json({ url: URL });

  
  res.header("Content-Disposition", 'attachment; filename="video.mp4"');
  ytdl(URL, {
    format: "mp4",
  })
  // .pipe(res);
  .pipe(createWriteStream('../upload/video.mp4'));
 
});
