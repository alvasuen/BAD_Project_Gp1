import { S3Client, GetObjectCommand, PutObjectCommand, CreateBucketCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Constants:
const MRAP = "karaoke-gcat";
// const BODY = "hello-world";
const KEY = "k4V3Mo61fJM.mp4"

const client = new S3Client({ region: "ap-southeast-1", disableMultiregionAccessPoints: true });

async function signGet() {
    const getCommand = new GetObjectCommand({
        Bucket: MRAP,
        Key: KEY
    })
    const signedUrl = await getSignedUrl(client, getCommand, { expiresIn: 3600 });
    console.log(signedUrl)
}
signGet()