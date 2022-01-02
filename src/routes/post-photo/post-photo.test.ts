import { oak, firebase } from "../../deps.ts";
import { photo, ContextWithUpload } from "./post-photo.ts";
import { asserts, sinon } from "../../dev-deps.ts";
import { S3Bucket } from "https://deno.land/x/s3@0.4.1/mod.ts";

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

Deno.test("should respond with 201 Created", async () => {
  const context: DeepPartial<ContextWithUpload> = {
    response: {
      status: 0,
      body: "",
    },
    request: {
      body: () => {
        return {
          value: {
            read: () => {
              return {
                fields: {
                  photoId: "",
                  location: "",
                  description: "",
                  username: "",
                  password: "",
                },
                files: [
                  {
                    filename: "/var/folders/blah.jpg",
                  },
                ],
              };
            },
          },
        };
      },
    },
    cookies: {
      get: () => {},
      set: () => {},
    },
    uploadedFiles: new Uint8Array(),
  };

  Deno.env.set(
    "FIREBASE_CONFIG",
    `{"apiKey": "","authDomain": "","projectId": "","storageBucket": "auto","messagingSenderId": "","appId": "","measurementId": ""}`
  );

  sinon
    .stub(firebase, "signInWithEmailAndPassword")
    // deno-lint-ignore no-explicit-any
    .resolves({ user: "hello" } as any);

  sinon.stub(firebase, "getAuth").returns({});
  sinon.stub(firebase, "addDoc").resolves();
  sinon.stub(S3Bucket.prototype, "putObject").resolves();

  await photo(context as ContextWithUpload);

  asserts.assertEquals(context.response?.status, oak.Status.Created);
});
