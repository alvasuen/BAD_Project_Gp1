import { Request, Response } from "express";
import ytdl from "ytdl-core";
import { YtdlService } from "../service/ytdlService";
import { createWriteStream} from "fs";
import fs from "fs";
import { errorHandler } from "../../error";
<<<<<<< HEAD
import fetch from "cross-fetch";
const youtubeMp3Converter = require('youtube-mp3-converter')

=======
// import fetch from "cross-fetch";
>>>>>>> ec3d7aa959b1ff46982bee43e6eda11087de6b8c

export class YtdlController {
  constructor(private ytdlService: YtdlService) {
    this.ytdlService = ytdlService;
  }

  downloadVideo = (req: Request, res: Response) => {
    try {
      let URL = req.body.url;
      let language = req.body.language;
      console.log(req.body);
      ytdl.getInfo(URL as string).then(async (data) => {
        console.log(data);

        // creates Download function
        const convertLinkToMp3 = youtubeMp3Converter(`./media_hub/audio/`)
        await convertLinkToMp3(URL, {
        title: `${data.videoDetails.videoId}`
    })

        //download video only
        ytdl(URL as string, {
          filter: "videoonly",
          quality: "highestvideo",
        }).pipe(
          createWriteStream(
            `./media_hub/video/${data.videoDetails.videoId}.mp4`
          )
        );

        await this.ytdlService.newSong(data.videoDetails.title, data.videoDetails.videoId, data.videoDetails.thumbnails.at(-1))
        
          fetch("http://127.0.0.1:8080/sanicytdl", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify({
            ytId: data.videoDetails.videoId,
            language: language,
          })
        }).then(()=>{
          res.status(200).json({success:true});
          console.log("fetch success!")
        })
        
      });
    } catch (err) {
      console.log(err);
      errorHandler(err, req, res);
    }
  };
}
