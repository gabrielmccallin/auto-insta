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

import { serve } from "https://deno.land/x/sift@0.4.2/mod.ts";

import { getCookies, setCookie } from "https://deno.land/std/http/mod.ts";

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

export const sift = {
  serve,
};

export const std = {
  getCookies,
  setCookie,
};
