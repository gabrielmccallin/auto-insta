import "https://deno.land/x/dotenv/load.ts";
import { Context, auth } from "../../deps.ts";
import { S3Bucket } from "https://deno.land/x/s3@0.4.1/mod.ts";
import { respond, responseCodes } from "./respond.ts";

export const getPhotos = async (context: Context) => {
  const authValue = Deno.env.get("auth_value") || "";
  const headers = context.request.headers;
  const authValueSubmitted = headers.get(auth.key) || "";
  const authenticated = auth.authenticate(authValue, authValueSubmitted);
  
  if (!authenticated) {
    return respond({ code: responseCodes.authFailed, context });
  }

  const bucket = new S3Bucket({
    accessKeyID: Deno.env.get("aws_access_key_id")!,
    secretKey: Deno.env.get("aws_secret_access_key")!,
    bucket: "auto-insta",
    region: "eu-west-2",
    endpointURL: "https://auto-insta.s3.eu-west-2.amazonaws.com",
  });

  let photos;
  try {
    const list = bucket.listAllObjects({
      batchSize: 10,
    });
    photos = [];
    for await (const obj of list) {
      photos.push(obj.key);
    }

  } catch (_error) {
    return respond({
      code: responseCodes.getPhotosFailed,
      context,
    });
  }
  // List 10 most recent objects in the bucket.

  return respond({
    code: responseCodes.success,
    context,
    message: JSON.stringify(photos),
  });
};
