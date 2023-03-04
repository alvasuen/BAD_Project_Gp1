import { S3Client, GetObjectCommand, PutObjectCommand, CreateBucketCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Request, Response } from "express";
import { errorHandler } from "../../error";
import {VideoService} from "../service/videoService";
//S3
const MRAP = "karaoke-gcat";
const client = new S3Client({ region: "ap-southeast-1", disableMultiregionAccessPoints: true });


export class VideoController{
    constructor(private videoService: VideoService){
        this.videoService = videoService;
    }

    video = async (req:Request, res:Response)=>{
        try{
            const songs_id = req.query.id

            let ytId = this.videoService.videos(songs_id)

            let mp4_link = async function signGet() {
                const getCommand = new GetObjectCommand({
                    Bucket: MRAP,
                    Key: `${ytId}.mp4`
                })
                const signedUrl = await getSignedUrl(client, getCommand, { expiresIn: 3600 });
                console.log(signedUrl)
                return signedUrl;
            }

            let accompaniment_link = async function signGet() {
                const getCommand = new GetObjectCommand({
                    Bucket: MRAP,
                    Key: `${ytId}_accompaniment.wav`
                })
                const signedUrl = await getSignedUrl(client, getCommand, { expiresIn: 3600 });
                console.log(signedUrl)
                return signedUrl;
            }

            let vocals_link = async function signGet() {
                const getCommand = new GetObjectCommand({
                    Bucket: MRAP,
                    Key: `${ytId}_vocals.wav`
                })
                const signedUrl = await getSignedUrl(client, getCommand, { expiresIn: 3600 });
                console.log(signedUrl)
                return signedUrl;
            }

            res.json({mp4_link, accompaniment_link, vocals_link})

        }catch (err){
            console.log(err);
            errorHandler(err, req, res)
        }
    }

}

