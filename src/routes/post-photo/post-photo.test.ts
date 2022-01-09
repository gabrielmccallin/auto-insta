import { photo, cookieKey } from "./post-photo.ts";
import { S3Bucket, firebase } from "../../deps.ts";
import { assertEquals, stub } from "../../dev-deps.ts";
import {responseMessages, responseCodes} from "./respond.ts"

const stubPutObject = stub(S3Bucket.prototype, "putObject");
const signInStub = stub(firebase, "signInWithEmailAndPassword");
const addDocStub = stub(firebase, "addDoc");
Deno.env.set("FIREBASE_CONFIG", '{"apiKey": "apiKey","authDomain": "","projectId": "","storageBucket": "","messagingSenderId": "","appId": "","measurementId": ""}');

Deno.test({
  name: "should respond with 201 Created",
  sanitizeResources: false,
  sanitizeOps: false,
  fn: async () => {
    stubPutObject.resolves();
    // deno-lint-ignore no-explicit-any
    signInStub.resolves({ user: { uid: "uid" } } as any);
    addDocStub.resolves();

    const file = new Blob();

    const formData = new FormData();
    formData.set("location", "HLT");
    formData.set("description", "HLT");
    formData.set("photoId", "HLT");
    formData.set("file", file);
    formData.set("username", "");
    formData.set("password", "");
    const request = new Request("http://hello", {
      method: "POST",
      body: formData,
    });

    const response = await photo(request);
    const cookies = response.headers.get("set-cookie");

    assertEquals(response.status, responseMessages[responseCodes.success].status);
    assertEquals(
      cookies?.includes(cookieKey),
      true
    );
    assertEquals(await response.text(), responseMessages[responseCodes.success].defaultMessage)
  },
});

Deno.test({
  name: "should respond with 400 Bad Request",
  sanitizeResources: false,
  sanitizeOps: false,
  fn: async () => {
    stubPutObject.resolves();
    // deno-lint-ignore no-explicit-any
    signInStub.resolves({ user: { uid: "uid" } } as any);
    addDocStub.resolves();

    const file = new Blob();

    const formData = new FormData();
    formData.set("location", "HLT");
    formData.set("description", "HLT");
    formData.set("photoId", "HLT");
    formData.set("file", file);
    formData.set("password", "");
    const request = new Request("http://hello", {
      method: "POST",
      body: formData,
    });

    const response = await photo(request);

    assertEquals(response.status, responseMessages[responseCodes.invalidPayload].status);
  },
});

Deno.test({
  name: "should respond with 502 Bad Gateway and not insert document",
  sanitizeResources: false,
  sanitizeOps: false,
  fn: async () => {
    const errorMessage = "Could not add document";
    stubPutObject.resolves();
    // deno-lint-ignore no-explicit-any
    signInStub.resolves({ user: { uid: "uid" } } as any);
    addDocStub.rejects({ message: errorMessage });

    const file = new Blob();

    const formData = new FormData();
    formData.set("location", "HLT");
    formData.set("description", "HLT");
    formData.set("photoId", "HLT");
    formData.set("file", file);
    formData.set("password", "");
    formData.set("username", "");
    const request = new Request("http://hello", {
      method: "POST",
      body: formData,
    });

    const response = await photo(request);

    assertEquals(
      response.status,
      responseMessages[responseCodes.photoMetaDataFailed].status
    );
    assertEquals(await response.text(), errorMessage);
  },
});

Deno.test({
  name: "should respond with initialised failure and 502 Bad Gateway",
  sanitizeResources: false,
  sanitizeOps: false,
  fn: async () => {
    stubPutObject.resolves();
    // deno-lint-ignore no-explicit-any
    signInStub.rejects({ user: { uid: "uid" } } as any);
    addDocStub.resolves();

    const file = new Blob();

    const formData = new FormData();
    formData.set("location", "HLT");
    formData.set("description", "HLT");
    formData.set("photoId", "HLT");
    formData.set("file", file);
    formData.set("password", "");
    formData.set("username", "");
    const request = new Request("http://hello", {
      method: "POST",
      body: formData,
    });

    const response = await photo(request);

    assertEquals(
      response.status,
      responseMessages[responseCodes.photoMetaDataFailed].status
    );
    assertEquals(await response.text(), responseMessages[responseCodes.photoMetaDataFailed].defaultMessage)
  },
});
