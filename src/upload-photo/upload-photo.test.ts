import { assertEquals } from "https://deno.land/std@0.119.0/testing/asserts.ts";
import { uploadPhoto } from "./upload-photo.ts";
import { S3Bucket } from "https://deno.land/x/s3@0.4.1/mod.ts";
import * as sinon from "https://cdn.skypack.dev/sinon@12.0.1?dts";

const stubPutObject  = sinon.stub(S3Bucket.prototype, "putObject");

Deno.test("should upload photo", async () => {
  stubPutObject.resolves();
  
  const photo = new Uint8Array();
  const { success } = await uploadPhoto("Uma", photo);
  
  assertEquals(success, true);
  stubPutObject.reset();
});

Deno.test("should fail upload photo", async () => {
  stubPutObject.rejects();
  
  const photo = new Uint8Array();
  const { success } = await uploadPhoto("Uma", photo);
  
  assertEquals(success, false);
  stubPutObject.reset();
});
