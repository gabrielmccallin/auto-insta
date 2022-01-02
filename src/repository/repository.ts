// deno-lint-ignore-file no-explicit-any
// import "https://deno.land/x/xhr@0.1.1/mod.ts";
import { firebase } from "../deps.ts";

let firebaseApp: any;
let auth: any;
let db: any;

const users = new Map();

export const savePhotoMetaData = async ({
  description,
  location,
  photoId,
}: {
  description: string;
  location: string;
  photoId: string;
}) => {
  try {
    const photoCollection = firebase.collection(db, "photos");
    await firebase.addDoc(photoCollection, { description, location, photoId });
  } catch (_error) {
    return false;
  }
  return true;
};

const signIn = async ({
  cookies,
  password = "",
  username = "",
}: {
  cookies: any;
  password?: string;
  username?: string;
}) => {
  const signedInUid = await cookies.get("LOGGED_IN_UID");
  const signedInUser = signedInUid != null ? users.get(signedInUid) : undefined;
  if (!signedInUid || !signedInUser || !auth.currentUser) {
    try {
      const creds = await firebase.signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      const { user } = creds;
      if (user) {
        users.set(user.uid, user);
        cookies.set("LOGGED_IN_UID", user.uid);
      } else if (signedInUser && signedInUid.uid !== auth.currentUser?.uid) {
        firebase.updateCurrentUser(signedInUser);
      }
    } catch (_error) {
      return false;
    }
  }
  return true;
};

export const repository = async ({
  cookies,
  password = "",
  username = "",
  config = {},
}: {
  cookies: any;
  password?: string;
  username?: string;
  config: Record<never, never>;
}) => {
  !firebaseApp && (firebaseApp = firebase.initializeApp(config));
  !auth && (auth = firebase.getAuth(firebaseApp));
  !db && (db = firebase.getFirestore(firebaseApp));

  return await signIn({ cookies, username, password });
};
