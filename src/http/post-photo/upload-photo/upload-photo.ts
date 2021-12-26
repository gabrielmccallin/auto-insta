import "https://deno.land/x/dotenv/load.ts";
import { responseTypes } from "../../../lib/responses.ts";
import { S3Bucket, PutObjectResponse } from "https://deno.land/x/s3@0.4.1/mod.ts";

export const uploadPhoto = async () => {
  const photoName = crypto.randomUUID();

  const bucket = new S3Bucket({
    accessKeyID: Deno.env.get("aws_access_key_id")!,
    secretKey: Deno.env.get("aws_secret_access_key")!,
    bucket: "demo-bucket",
    region: "eu-west-2",
    endpointURL: "https://gateway.eu1.storjshare.io",
  });

  const photo = await Deno.readFile("me.png");
  let uploadResponse: PutObjectResponse;
  try {
    // Put an object into a bucket.
    uploadResponse = await bucket.putObject(photoName, photo, {
      contentType: "image/jpeg",
    });
  } catch (error) {
    return {
      type: responseTypes.uploadPhotoFailed,
      payload: error,
    };
  }

  return {
    type: responseTypes.success,
    payload: {
      photoName,
      message: uploadResponse,
    },
  };
};
