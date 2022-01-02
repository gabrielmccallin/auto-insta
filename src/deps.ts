import { initializeApp } from "https://cdn.skypack.dev/firebase@9.6.1/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  updateCurrentUser,
} from "https://cdn.skypack.dev/firebase@9.6.1/auth";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://cdn.skypack.dev/firebase@9.6.1/firestore";

import {
  Application,
  Router,
  Status,
} from "https://deno.land/x/oak@v10.1.0/mod.ts";

import { authenticate, key } from "./authenticate/authenticate.ts";

// ================================================

export { Context } from "https://deno.land/x/oak@v10.1.0/mod.ts";

export const firebase = {
  getAuth,
  signInWithEmailAndPassword,
  updateCurrentUser,
  getFirestore,
  collection,
  addDoc,
  initializeApp,
};

export const oak = {
  Application,
  Router,
  Status,
};

export const auth = {
  authenticate,
  key,
};
