import "https://deno.land/x/dotenv/load.ts";
import { S3Bucket, PutObjectResponse } from "../deps.ts";

export const uploadPhoto = async ({
  photoId,
  file,
  accessKeyID,
  secretKey,
  bucket,
  region,
}: {
  photoId: string;
  file?: Uint8Array;
  accessKeyID: string;
  secretKey: string;
  bucket: string;
  region: string;
}) => {
  if (!file)
    return {
      success: false,
      message: "No file sent to upload",
    };

  const s3bucket = new S3Bucket({
    accessKeyID,
    secretKey,
    bucket,
    region,
  });

  let uploadResponse: PutObjectResponse;

  try {
    uploadResponse = await s3bucket.putObject(photoId, file, {
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
