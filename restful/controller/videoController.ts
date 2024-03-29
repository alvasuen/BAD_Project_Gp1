import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  CreateBucketCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { sign } from "crypto";
import { Request, Response } from "express";
import { errorHandler } from "../../error";
import { VideoService } from "../service/videoService";
import {env} from "../../env"
//S3
const MRAP = env.MRAP;
let keyId = env.keyId;
let accessKey = env.accessKey;
const client = new S3Client({
  credentials: {
    accessKeyId: keyId as string,
    secretAccessKey: accessKey as string,
  },
  region: "ap-southeast-1",
  disableMultiregionAccessPoints: true,
});

export class VideoController {
  constructor(private videoService: VideoService) {
    this.videoService = videoService;
  }

  video = async (req: Request, res: Response) => {
    try {
      const songs_id = req.query.id as string;
      let playlists_id = songs_id.slice(9);

      if (songs_id.includes("playlist")) {
        let songsInPlaylist = await this.videoService.playlist(playlists_id);

        const mp4 = [];
        const accompaniment = [];
        const vocal = [];

        for (let i = 0; i < songsInPlaylist.length; i++) {
          console.log(songsInPlaylist.length);
          console.log(songsInPlaylist[i]);

          let mp4_link = async function signGet(ytId: string) {
            const getCommand = new GetObjectCommand({
              Bucket: MRAP,
              Key: `${ytId}/${ytId}.mp4`,
            });
            const signedUrl = await getSignedUrl(client, getCommand, {
              expiresIn: 3600,
            });
            return signedUrl;
          };
          mp4.push(await mp4_link(songsInPlaylist[i].yt_id));

          let accompaniment_link = async function signGet(ytId: string) {
            const getCommand = new GetObjectCommand({
              Bucket: MRAP,
              Key: `${ytId}/${ytId}_accompaniment.wav`,
            });
            const signedUrl = await getSignedUrl(client, getCommand, {
              expiresIn: 3600,
            });
            return signedUrl;
          };
          accompaniment.push(
            await accompaniment_link(songsInPlaylist[i].yt_id)
          );

          let vocals_link = async function signGet(ytId: string) {
            const getCommand = new GetObjectCommand({
              Bucket: MRAP,
              Key: `${ytId}/${ytId}_vocals.wav`,
            });
            const signedUrl = await getSignedUrl(client, getCommand, {
              expiresIn: 3600,
            });
            return signedUrl;
          };
          vocal.push(await vocals_link(songsInPlaylist[i].yt_id));
        }

        res.json({ mp4, accompaniment, vocal });
      } else {
        let ytIdObj = await this.videoService.videos(songs_id);
        console.log(ytIdObj);

        let ytId = await ytIdObj[0].yt_id;
        console.log(ytId);

        let mp4_link = async function signGet(ytId: string) {
          const getCommand = new GetObjectCommand({
            Bucket: MRAP,
            Key: `${ytId}/${ytId}.mp4`,
          });
          const signedUrl = await getSignedUrl(client, getCommand, {
            expiresIn: 3600,
          });
          return signedUrl;
        };

        let accompaniment_link = async function signGet(ytId: string) {
          const getCommand = new GetObjectCommand({
            Bucket: MRAP,
            Key: `${ytId}/${ytId}_accompaniment.wav`,
          });
          const signedUrl = await getSignedUrl(client, getCommand, {
            expiresIn: 3600,
          });
          return signedUrl;
        };

        let vocals_link = async function signGet(ytId: string) {
          const getCommand = new GetObjectCommand({
            Bucket: MRAP,
            Key: `${ytId}/${ytId}_vocals.wav`,
          });
          const signedUrl = await getSignedUrl(client, getCommand, {
            expiresIn: 3600,
          });
          return signedUrl;
        };

        let mp4 = await mp4_link(ytId);
        let accompaniment = await accompaniment_link(ytId);
        let vocals = await vocals_link(ytId);

        res.json({
          mp4,
          accompaniment,
          vocals,
        });
      }
    } catch (err) {
      console.log(err);
      errorHandler(err, req, res);
    }
  };
}
