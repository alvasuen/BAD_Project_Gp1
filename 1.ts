import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  CreateBucketCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "./env";

// Constants:
const MRAP = "karaoke-gcat";
// const BODY = "hello-world";
const KEY = "logo3.PNG";
let AWS_ACCESS_KEY = env.accessKey;
let AWS_ACCESS_SECRET_KEY = "F1qzQ+ZH9NzWf8+gMh4aPAah9lMvUBl5uqyGrlt9";
const client = new S3Client({
  region: "ap-southeast-1",
  disableMultiregionAccessPoints: true,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_ACCESS_SECRET_KEY,
  },
});

async function signGet() {
  const getCommand = new GetObjectCommand({
    Bucket: MRAP,
    Key: KEY,
  });
  const signedUrl = await getSignedUrl(client, getCommand, { expiresIn: 3600 });
  console.log(signedUrl);
}
signGet();
