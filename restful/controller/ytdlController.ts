import { Request, Response } from "express";
import ytdl from "ytdl-core";
import { YtdlService } from "../service/ytdlService";
import { createWriteStream } from "fs";
import { errorHandler } from "../../error";
import fetch from "cross-fetch";

export class YtdlController {
  constructor(private ytdlService: YtdlService) {
    this.ytdlService = ytdlService
  }

  downloadVideo = (req: Request, res: Response) => {
    try {
      let URL = req.query.url;
      ytdl.getInfo(URL as string).then(async (data) => {
        console.log(data);

        // console.log(data.videoDetails.thumbnails.at(-1));
        
        //download audio only
        ytdl(URL as string, {
          filter: "audioonly",
          quality: "highestaudio",
        }).pipe(
          createWriteStream(
            `./media_hub/audio/${data.videoDetails.videoId}.mp3`
          )
        );

        //download video only
        ytdl(URL as string, {
          filter: "videoonly",
          quality: "highestvideo",
        }).pipe(
          createWriteStream(
            `./media_hub/video/${data.videoDetails.videoId}.mp4`
          )
        );

        await this.ytdlService.newSong(data.videoDetails.videoId, data.videoDetails.videoId, data.videoDetails.thumbnails.at(-1))
        
        // pass video data to sanic server
        fetch("http://127.0.0.1:8080/sanicytdl", {
          method: "POST",
          headers: {
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            thumbnail: data.videoDetails.thumbnails.at(-1),
            ytId: data.videoDetails.videoId,
            name: data.videoDetails.title,
          })
        }).then(()=>{
          res.status(200).json({success:true});
        })

      });
    } catch (err) {
      console.log(err);
      errorHandler(err, req, res);
    }
  };
}
