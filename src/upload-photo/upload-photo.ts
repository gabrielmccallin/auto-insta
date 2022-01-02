import "https://deno.land/x/dotenv/load.ts";
import { S3Bucket, PutObjectResponse } from "https://deno.land/x/s3@0.4.1/mod.ts";

export const uploadPhoto = async (photoName: string, file?: Uint8Array) => {
  if(!file) return {
    success: false,
    message: "No file sent to upload",
  };

  const bucket = new S3Bucket({
    accessKeyID: Deno.env.get("aws_access_key_id")!,
    secretKey: Deno.env.get("aws_secret_access_key")!,
    bucket: "auto-insta",
    region: "eu-west-2",
    endpointURL: "https://auto-insta.s3.eu-west-2.amazonaws.com",
  });

  let uploadResponse: PutObjectResponse;

  try {
    uploadResponse = await bucket.putObject(photoName, file, {
      contentType: "image/gif",
    });
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }

  return {
    success: true,
    message: uploadResponse,
  };
};
