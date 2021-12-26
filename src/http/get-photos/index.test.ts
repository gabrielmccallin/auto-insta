import { assertExists } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { handler } from "./index.ts";
import { S3Bucket } from "https://deno.land/x/s3@0.4.1/mod.ts";
import * as sinon from "https://cdn.skypack.dev/sinon@12.0.1?dts";

const stubListObjects = sinon.stub(S3Bucket.prototype, "listAllObjects");

Deno.test("should list all photos", async () => {
  const stubAsyncIterable = async function* () {
    yield { key: "fake" };
  };

  const generator = stubAsyncIterable();
  stubListObjects.returns(generator);

  const response = await handler();
  assertExists(response.length);

  stubListObjects.reset();
});
