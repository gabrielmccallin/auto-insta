import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { uploadPhoto } from "./upload-photo.ts";
import { responseTypes } from "../../../lib/responses.ts";
import { S3Bucket } from "https://deno.land/x/s3@0.4.1/mod.ts";
import * as sinon from "https://cdn.skypack.dev/sinon@12.0.1?dts";


const stubPutObject  = sinon.stub(S3Bucket.prototype, "putObject");

Deno.test("should upload photo", async () => {
  stubPutObject.reset();
  stubPutObject.resolves();

  const { type } = await uploadPhoto();
  assertEquals(type, responseTypes.success);
});

Deno.test("should fail upload photo", async () => {
  stubPutObject.reset();
  stubPutObject.rejects();

  const { type } = await uploadPhoto();
  assertEquals(type, responseTypes.uploadPhotoFailed);
});
