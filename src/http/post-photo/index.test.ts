import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { clone } from "https://deno.land/x/object_clone@1.1.0/mod.ts";
import { handler } from "./index.ts";
import { baseRequest } from "../../lib/request.ts";
import { headers, recordSaved, badRequest, uploadFailed, recordSaveFailed } from "../../lib/responses.ts";
import { key, keyName } from "../../lib/authenticate.ts";
import { S3Bucket } from "https://deno.land/x/s3@0.4.1/mod.ts";
import * as sinon from "https://cdn.skypack.dev/sinon@12.0.1?dts";
import { BeginData } from "./stubs/beginStub.ts";

Deno.test("should fail authentication", async () => {
  const expected = {
    body: {
      message: "🚫 No baby!",
    },
    headers,
    statusCode: 401,
  };

  const response = await handler(baseRequest);
  assertEquals(response, expected);
});

Deno.test("should pass authentication but fail valid payload", async () => {
  const payload: typeof baseRequest = clone(baseRequest);
  payload.headers[keyName] = key;
  payload.body = "no object here!";

  const response = await handler(payload);
  assertEquals(response, badRequest);
});

const putPhotoStub = sinon.stub(S3Bucket.prototype, "putObject");
const beginDataStub = sinon.stub(BeginData.prototype, "set");

Deno.test({
  name: "should fail upload photo",
  async fn() {
    const payload: typeof baseRequest = clone(baseRequest);
    payload.headers[keyName] = key;
    payload.body = JSON.stringify({
      title: "",
      location: "",
      photo: "",
      description: "",
    });

    putPhotoStub.rejects();

    const response = await handler(payload);
    assertEquals(response, uploadFailed);

    beginDataStub.reset();
    putPhotoStub.reset();
  },
});

Deno.test({
  name: "should succeed upload picture but fail save data",
  async fn() {
    const payload: typeof baseRequest = clone(baseRequest);
    payload.headers[keyName] = key;
    payload.body = JSON.stringify({
      title: "",
      location: "",
      photo: "",
      description: "",
    });

    beginDataStub.rejects();

    const response = await handler(payload);
    assertEquals(response, recordSaveFailed);

    beginDataStub.reset();
    putPhotoStub.reset();
  },
});


Deno.test({
  name: "should upload photo and save a record",
  async fn() {
    putPhotoStub.resolves();
    beginDataStub.resolves();

    const payload: typeof baseRequest = clone(baseRequest);
    payload.headers[keyName] = key;
    payload.body = JSON.stringify({
      title: "",
      location: "",
      photo: "",
      description: "",
    });

    const response = await handler(payload);
    assertEquals(response, recordSaved);

    beginDataStub.reset();
    putPhotoStub.reset();
  },
});
