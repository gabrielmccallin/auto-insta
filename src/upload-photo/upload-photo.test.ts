import { assertEquals, stub } from "../dev-deps.ts";
import { uploadPhoto } from "./upload-photo.ts";
import { S3Bucket } from "../deps.ts";

const uploadPhotoOptions = {
  accessKeyID: "",
  secretKey: "",
  bucket: "bucket",
  region: "eu-west-2",
  photoId: "",
  file: new Uint8Array(),
};

const stubPutObject = stub(S3Bucket.prototype, "putObject");

Deno.test("should upload photo", async () => {
  stubPutObject.resolves();

  const { success } = await uploadPhoto(uploadPhotoOptions);

  assertEquals(success, true);
});

Deno.test("should fail upload photo", async () => {
  stubPutObject.rejects();

  const { success } = await uploadPhoto(uploadPhotoOptions);

  assertEquals(success, false);
});
