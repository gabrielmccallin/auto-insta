// deno-lint-ignore-file no-explicit-any
import { firebase } from "../deps.ts";

let db: any;
export let auth: any;

export const users = new Map();

export const deletePhotoById = async (id: string, db: any) => {
  try {
    // Create a query against the collection.
    const photoCollection = firebase.collection(db, "photos");
    const q = firebase.query(
      photoCollection,
      firebase.where("photoId", "==", id)
    );

    const querySnapshot = await firebase.getDocs(q);
    let docId;
    querySnapshot.forEach((doc: any) => {
      docId = doc.id;
    });

    await firebase.deleteDoc(firebase.doc(db, "photos", docId));
  } catch (error) {
    return [false, error];
  }

  return [true, {}];
};

export const savePhotoMetaData = async ({
  description,
  location,
  photoId,
  config,
  signedInUid = { uid: "uid" },
  password,
  username,
}: {
  description: string;
  location: string;
  photoId: string;
  config: any;
  signedInUid: { uid: string };
  password: string;
  username: string;
}): Promise<
  [
    boolean,
    { error?: {name?: string, message: string}; userId?: string; db?: any }
  ]
> => {
  const [initialiseSuccess, { error }] = initialise(config);
  if (!initialiseSuccess) {
    return [false, { error }];
  }

  const [signInSuccess, { error: signInOutputError, userId }] = await signIn({
    signedInUid,
    username,
    password,
  });
  if (!signInSuccess) {
    return [false, { error: signInOutputError }];
  }

  try {
    const photoCollection = firebase.collection(db, "photos");
    await firebase.addDoc(photoCollection, { description, location, photoId });
  } catch (error) {
    return [false, { error }];
  }
  return [true, { userId, db }];
};

export const signIn = async ({
  signedInUid = { uid: "uid" },
  password = "",
  username = "",
}: {
  signedInUid: { uid: string };
  password: string;
  username: string;
}): Promise<[boolean, { error?: any; userId?: string }]> => {
  const signedInUser =
    signedInUid != null ? users.get(signedInUid.uid) : undefined;

  if (!signedInUid || !signedInUser || !auth.currentUser) {
    let userId = "";
    try {
      const creds = await firebase.signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      const { user } = creds;
      if (user) {
        users.set(user.uid, user);
        // cookies.set("LOGGED_IN_UID", user.uid);
        userId = user.uid;
      } else if (signedInUser && signedInUid.uid !== auth.currentUser?.uid) {
        firebase.updateCurrentUser(signedInUser);
      }
    } catch (error) {
      return [false, { error }];
    }
    return [true, { userId }];
  }
  return [true, {}];
};

export const initialise = (
  config: Record<never, never>
): [boolean, { error?: any }] => {
  try {
    const firebaseApp = firebase.initializeApp(config);
    auth = firebase.getAuth(firebaseApp);
    db = firebase.getFirestore(firebaseApp);
  } catch (error) {
    return [false, { error }];
  }

  return [true, {}];
};
