import { Request, Response } from "express";
import ytdl from "ytdl-core";
import { YtdlService } from "../service/ytdlService";
import { createWriteStream} from "fs";
import fs from "fs";
import { errorHandler } from "../../error";
import fetch from "cross-fetch";


export class YtdlController {
  constructor(private ytdlService: YtdlService) {
    this.ytdlService = ytdlService
  }

  downloadVideo = (req: Request, res: Response) => {
    try {
      let URL = req.body.url;
      let language = req.body.language
      console.log(req.body)
      ytdl.getInfo(URL as string).then(async (data) => {
        console.log(data);
        
        //download audio only
        ytdl(URL as string, {
          filter: "audioonly",
          quality: "highestaudio"
        }).pipe(
          createWriteStream(
            `./media_hub/audio/${data.videoDetails.videoId}.mp3`
          )
        );

        //download video only
        ytdl(URL as string, {
          filter: "audioandvideo",
          quality: "highestvideo",
        }).pipe(
          createWriteStream(
            `./media_hub/video/${data.videoDetails.videoId}.mp4`
          )
        );

        await this.ytdlService.newSong(data.videoDetails.title, data.videoDetails.videoId, data.videoDetails.thumbnails.at(-1))
        
        // pass video data to sanic server
        // function checkFileExist (){
        //   if (!fs.existsSync(`./media_hub/audio/${data.videoDetails.videoId}.mp3`) || !fs.existsSync(`./media_hub/video/${data.videoDetails.videoId}.mp4`)){
        //     setTimeout(checkFileExist, 10000);
        //   }else{
        //     fetch("http://127.0.0.1:8080/sanicytdl", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type":"application/json"
        //   },
        //   body:JSON.stringify({
        //     thumbnail: data.videoDetails.thumbnails.at(-1),
        //     ytId: data.videoDetails.videoId,
        //     name: data.videoDetails.title,
        //     language: language,
        //   })
        // }).then(()=>{
        //   res.status(200).json({success:true});
        // })
        //   }
        // }
        
        // checkFileExist ()

        
      });
    } catch (err) {
       console.log(err);
       errorHandler(err, req, res);
    }
  };
}


