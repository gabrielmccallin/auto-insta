// deno-lint-ignore-file no-explicit-any
import { firebase } from "../deps.ts";
import { asserts, sinon } from "../dev-deps.ts";
import { repository, savePhotoMetaData } from "./repository.ts";
import "https://deno.land/x/dotenv@v3.1.0/load.ts";

const firebaseStubConfig = {
  apiKey: "stub",
  authDomain: "stub",
  projectId: "stub",
  storageBucket: "stub",
  messagingSenderId: "stub",
  appId: "stub",
  measurementId: "stub",
};

const firebaseStub = sinon.stub(firebase, "signInWithEmailAndPassword");

const collectionStub = sinon.stub(firebase, "addDoc").resolves();

Deno.test("should login into repository", async () => {
  firebaseStub.resolves({ user: "hello" } as any);

  const success = await repository({
    cookies: { get: () => {}, set: () => {} },
    password: "",
    username: "",
    config: firebaseStubConfig,
  });

  asserts.assertEquals(success, true);

  firebaseStub.reset();
});

Deno.test("should fail login to repository", async () => {
  firebaseStub.rejects();

  const success = await repository({
    cookies: { get: () => {}, set: () => {} },
    password: "",
    username: "",
    config: firebaseStubConfig,
  });

  asserts.assertEquals(success, false);

  firebaseStub.reset();
});

Deno.test({
  name: "should fail to save photo metadata in the repository",
  fn: async () => {
    firebaseStub.resolves({ user: "hello" } as any);
    
    await repository({
      cookies: { get: () => {}, set: () => {} },
      password: "",
      username: "",
      config: firebaseStubConfig,
    });
    
    collectionStub.rejects();
    const saveResponse = await savePhotoMetaData({
      description: "",
      location: "",
      photoId: ""
    });

    asserts.assertEquals(saveResponse, false);

    firebaseStub.reset();
    collectionStub.reset();
  },
});
