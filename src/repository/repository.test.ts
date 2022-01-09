// deno-lint-ignore-file no-explicit-any
import { assertEquals, assertExists, stub } from "../dev-deps.ts";
import {
  initialise,
  signIn,
  savePhotoMetaData,
  auth
} from "./repository.ts";
import { firebase } from "../deps.ts";

const config = {
  apiKey: "stub",
  authDomain: "stub",
  projectId: "stub",
  storageBucket: "stub",
  messagingSenderId: "stub",
  appId: "stub",
  measurementId: "stub",
};

const username = "";
const password = "";

const signInStub = stub(firebase, "signInWithEmailAndPassword");
const addDocStub = stub(firebase, "addDoc");

Deno.test({
  name: "should initialise repository",
  sanitizeResources: false,
  sanitizeOps: false,
  fn: () => {
    const [success] = initialise(config);

    assertEquals(success, true);
  },
});

Deno.test({
  name: "should fail initialise repository",
  sanitizeResources: false,
  sanitizeOps: false,
  fn: () => {
    const [success, { error }] = initialise({});

    assertEquals(success, false);
    assertExists(error);
  },
});

Deno.test({
  name: "should login to repository",
  sanitizeResources: false,
  sanitizeOps: false,
  fn: async () => {
    const [intialiseSuccess] = initialise(config);

    signInStub.resolves({ user: { uid: "uid"} } as any);

    const [success, { userId }] = await signIn({
      signedInUid: { uid: "uid" },
      username,
      password,
    });
    assertEquals(userId, "uid");
    assertEquals(intialiseSuccess, true);
    assertEquals(success, true);
  },
});

Deno.test({
  name: "should not return userid on the second signIn",
  sanitizeResources: false,
  sanitizeOps: false,
  fn: async () => {
    initialise(config);

    signInStub.resolves({ user: { uid: "uid" } } as any);

    const [success, result] = await signIn({
      signedInUid: { uid: "" },
      username,
      password,
    });

    auth.currentUser = { uid: "uid" };

    const [secondSignInSuccess, secondSignInResult] = await signIn({
      signedInUid: { uid: result?.userId || "" },
      username,
      password,
    });

    assertEquals(secondSignInResult?.userId, undefined);
    assertEquals(secondSignInSuccess, true);
  },
});

Deno.test({
  name: "should fail to save photo metadata in the repository",
  sanitizeResources: false,
  sanitizeOps: false,
  fn: async () => {

    signInStub.resolves({ user: { uid: "uid" } } as any);
    addDocStub.rejects();

    const [success, { error }] = await savePhotoMetaData({
      description: "",
      location: "",
      photoId: "",
      config,
      password: "",
      signedInUid: { uid: "uid" },
      username: "",
    });

    assertEquals(success, false);
    assertExists(error?.message);
  },
});

Deno.test({
  name: "should save photo document in the repository",
  sanitizeResources: false,
  sanitizeOps: false,
  fn: async () => {

    signInStub.resolves({ user: { uid: "uid" } } as any);
    addDocStub.resolves();

    const photoId = Date.now().toString();
    const [success, { error }] = await savePhotoMetaData({
      description: "all together now",
      location: "all together now",
      photoId,
      config,
      password,
      signedInUid: { uid: "uid" },
      username,
    });

    assertEquals(success, true);
    assertEquals(error, undefined);
  },
});
