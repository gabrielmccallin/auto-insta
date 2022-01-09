import { initializeApp } from "https://cdn.skypack.dev/firebase@9.6.2/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  updateCurrentUser,
} from "https://cdn.skypack.dev/firebase@9.6.2/auth";

import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDoc,
  getDocs,
} from "https://cdn.skypack.dev/firebase@9.6.2/firestore";

// ================================================

export { serve } from "https://deno.land/x/sift@0.4.2/mod.ts";

export {
  getCookies,
  setCookie,
} from "https://deno.land/std@0.120.0/http/mod.ts";

export { S3Bucket } from "https://deno.land/x/s3@0.4.1/mod.ts";

export type {
  PutObjectResponse,
  S3BucketConfig,
} from "https://deno.land/x/s3@0.4.1/mod.ts";

export const firebase = {
  getAuth,
  signInWithEmailAndPassword,
  updateCurrentUser,
  getFirestore,
  collection,
  addDoc,
  initializeApp,
  deleteDoc,
  doc,
  query,
  where,
  getDoc,
  getDocs,
};
