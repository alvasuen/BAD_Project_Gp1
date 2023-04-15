import { Request, Response } from "express";
import ytdl from "ytdl-core";
import { YtdlService } from "../service/ytdlService";
import { createWriteStream } from "fs";
// import fs from "fs";
import { errorHandler } from "../../error";
import fetch from "cross-fetch";
const youtubeMp3Converter = require("youtube-mp3-converter");
import "../../session";

export class YtdlController {
  constructor(private ytdlService: YtdlService) {
    this.ytdlService = ytdlService;
  }

  downloadVideo = (req: Request, res: Response) => {
    try {
      let URL = req.body.url;
      let language = req.body.language;
      // console.log(req.body);
      ytdl.getInfo(URL as string).then(async (data) => {
        // console.log(data);

        //check duplicates and reject requests to avoid duplicated data in S3
        const msg_1 = "In Progress";
        let result = await this.ytdlService.download_status(
          data.videoDetails.title,
          data.videoDetails.videoId,
          URL,
          0,
          req.session.userId as number,
          data.videoDetails.thumbnails.at(-1),
          msg_1
        );
        let status_id = result[0]["status_id"];

        let checkDuplicate = await this.ytdlService.checkDuplicate(
          data.videoDetails.videoId
        );
        if (checkDuplicate.length > 0) {
          console.log("123");
          await this.ytdlService.updateDuplicate_status(status_id);
          res.json({
            success: false,
            duplicated: true,
          });
          return;
        }

        // creates Download function
        const convertLinkToMp3 = youtubeMp3Converter(`./media_hub/audio/`);
        await convertLinkToMp3(URL, {
          title: `${data.videoDetails.videoId}`,
        });

        //download video only
        ytdl(URL as string, {
          filter: "videoonly",
          quality: "highestvideo",
        }).pipe(
          createWriteStream(
            `./media_hub/video/${data.videoDetails.videoId}.mp4`
          )
        );

        //fetch to sanic server for karaoke subtitle processing
        fetch("http://127.0.0.1:8080/add_job", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ytId: data.videoDetails.videoId,
            language: language,
            status_id: status_id,
          }),
        }).then(() => {
          console.log("fetch success!");
        });
        let a = await this.ytdlService.newSong(
          data.videoDetails.title,
          data.videoDetails.videoId,
          data.videoDetails.thumbnails.at(-1)
        );

        console.log({status_id});
        await this.ytdlService.download_update(a[0]["songs_id"], status_id);
        res.status(200).json({ success: true });
      });
    } catch (err) {
      console.log(err);
      errorHandler(err, req, res);
    }
  };
}
