import "https://deno.land/x/dotenv/load.ts";
import { responseTypes } from "../../../lib/responses.ts";
import { S3Bucket} from "./S3Bucket.ts";

export const uploadPhoto = async (s3bucket: typeof S3Bucket) => {
  const photoName = crypto.randomUUID();

  const bucket = new s3bucket({
    accessKeyID: Deno.env.get("aws_access_key_id")!,
    secretKey: Deno.env.get("aws_secret_access_key")!,
    bucket: "photos",
    region: "eu-west-2",
    endpointURL: "https://auto-insta.s3.amazonaws.com/",
  });

  const photo = await Deno.readFile("me.png");

  try {
    // Put an object into a bucket.
    await bucket.putObject(photoName, photo, {
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
    payload: photoName,
  };
};
