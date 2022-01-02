import { getPhotos } from "./get-photos.ts";
import { S3Bucket } from "https://deno.land/x/s3@0.4.1/mod.ts";
import { Context, auth } from "../../deps.ts";
import { asserts, sinon } from "../../dev-deps.ts";
import {responseCodes, responseMessages} from "./respond.ts"

const stubListObjects = sinon.stub(S3Bucket.prototype, "listAllObjects");
const authStub = sinon.stub(auth, "authenticate");

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

Deno.test("should list all photos", async () => {
  const context: DeepPartial<Context> = {
    response: {
      status: 0,
      body: "",
    },
    request: {
      headers: {
        get: () => {},
      },
    },
  };

  const fixture = "fake";
  const stubAsyncIterable = async function* () {
    yield { key: fixture };
  };

  const generator = stubAsyncIterable();
  stubListObjects.returns(generator);

  authStub.returns(true);

  await getPhotos(context as Context);
  asserts.assertEquals(context.response?.body, JSON.stringify([fixture]));
  asserts.assertEquals(context.response?.status, responseMessages[responseCodes.success].status);

  stubListObjects.reset();
  authStub.reset();
});

Deno.test("should fail to retrieve photos", async () => {
  const context: DeepPartial<Context> = {
    response: {
      status: 0,
      body: "",
    },
    request: {
      headers: {
        get: () => {},
      },
    },
  };

  const fixture = "Oh no!";
  stubListObjects.throws(fixture);

  authStub.returns(true);

  await getPhotos(context as Context);
  asserts.assertEquals(
    context.response?.body,
    responseMessages[responseCodes.getPhotosFailed].message
  );
  asserts.assertEquals(
    context.response?.status,
    responseMessages[responseCodes.getPhotosFailed].status
  );

  stubListObjects.reset();
  authStub.reset();
});

Deno.test("should fail authentication", async () => {
  const context: DeepPartial<Context> = {
    response: {
      status: 0,
      body: "",
    },
    request: {
      headers: {
        get: () => {},
      },
    },
  };

  authStub.returns(false);

  await getPhotos(context as Context);
  asserts.assertEquals(
    context.response?.body,
    responseMessages[responseCodes.authFailed].message
  );
  asserts.assertEquals(
    context.response?.status,
    responseMessages[responseCodes.authFailed].status
  );

  authStub.reset();
});
