import { Request, Response } from "express";
import ytdl from "ytdl-core";
import { createWriteStream } from "fs";
import { errorHandler } from "../../error";

export class YtdlController {
  constructor() {}

  downloadVideo = async (req: Request, res: Response) => {
    try {
      let URL = req.query.URL;
      ytdl.getInfo(URL as string).then((data) => {
        // console.log(data);
        //get video thumbnail and set it as the cover photo of karaoke song
        // console.log(data.videoDetails.thumbnails.at(-1));
        ytdl(URL as string, {
          filter: "audioonly",
          quality: "highestaudio",
        }).pipe(
          createWriteStream(
            `./media_hub/video/${data.videoDetails.videoId}.mp3`
          )
        );
        ytdl(URL as string, {
          filter: "videoonly",
          quality: "highestvideo",
        }).pipe(
          createWriteStream(
            `./media_hub/video/${data.videoDetails.videoId}.mp4`
          )
        );
      });
    } catch (err) {
      console.log(err);
      errorHandler(err, req, res);
    }
  };
}
