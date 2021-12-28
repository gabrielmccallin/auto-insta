import "https://deno.land/x/dotenv/load.ts";
import { S3Bucket } from "https://deno.land/x/s3@0.4.1/mod.ts";

export const handler = async () => {
  const bucket = new S3Bucket({
    accessKeyID: Deno.env.get("aws_access_key_id")!,
    secretKey: Deno.env.get("aws_secret_access_key")!,
    bucket: "demo-bucket",
    region: "eu-west-2",
    endpointURL: "https://gateway.eu1.storjshare.io",
  });

  // List 10 most recent objects in the bucket.
  const list = bucket.listAllObjects({
    batchSize: 10
  });
  const photos = [];
  for await (const obj of list) {
    photos.push(obj.key);
  }

  return "pushed to production";
};
