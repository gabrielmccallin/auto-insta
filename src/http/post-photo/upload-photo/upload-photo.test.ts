import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { uploadPhoto } from "./upload-photo.ts";
import { responseTypes } from "../../../lib/responses.ts";
import { S3Bucket } from "./S3Bucket.ts";
import * as sinon from "https://cdn.skypack.dev/sinon@12.0.1?dts";

import {
  describe,
  it,
} from "https://deno.land/x/test_suite@0.9.3/mod.ts";

describe("Photo upload", () => {
  const s3bucketStub = sinon.stub(S3Bucket.prototype, "putObject");

  it("should upload photo", async () => {
    s3bucketStub.resolves();

    const { type } = await uploadPhoto(S3Bucket);
    assertEquals(type, responseTypes.success);
  });

  it("should fail upload photo", async () => {
    s3bucketStub.rejects();

    const { type } = await uploadPhoto(S3Bucket);
    assertEquals(type, responseTypes.uploadPhotoFailed);
  });
});
