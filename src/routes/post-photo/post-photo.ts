import { savePhotoMetaData } from "../../repository/repository.ts";
import "https://deno.land/x/dotenv@v3.1.0/load.ts";
import { validatePayload } from "./payload.ts";
import { respond, responseCodes } from "./respond.ts";
import { uploadPhoto } from "../../upload-photo/upload-photo.ts";

declare global {
  interface Crypto {
    randomUUID: () => string;
  }
}

export const cookieKey = "LOGGED_IN_UID";

export const photo = async (request: Request) => {
  const formData = await request.formData();
  const arrayEntries = [...formData.keys()];
  const file = formData.get("file") as Blob;

  if (!formData || !validatePayload(arrayEntries) || !file) {
    return respond({ code: responseCodes.invalidPayload });
  }

  const buffer = await file.arrayBuffer();
  const uint = new Uint8Array(buffer);

  const photoId = crypto.randomUUID();

  const uploadPhotoOptions = {
    accessKeyID: Deno.env.get("aws_access_key_id")!,
    secretKey: Deno.env.get("aws_secret_access_key")!,
    bucket: Deno.env.get("bucket") || "bucket",
    region: Deno.env.get("region") || "eu-west-2",
    photoId,
    file: uint,
  };
  const { success } = await uploadPhoto(uploadPhotoOptions);

  if (!success) {
    return respond({ code: responseCodes.uploadPhotoFailed });
  }

  const configString = Deno.env.get("FIREBASE_CONFIG") || "[]";
  const config = JSON.parse(configString);

  const cookies = request.headers.get("cookie") || "";

  const formDataEntries = Object.fromEntries(formData.entries()) as {
    [k: string]: string;
  };

  const { password, username, description, location } = formDataEntries;

  const [savePhotoSuccess, { userId, error }] = await savePhotoMetaData({
    description: description as string,
    location: location as string,
    photoId,
    signedInUid: { uid: parseCookie(cookies)[cookieKey] },
    password,
    username,
    config,
  });
  if (!savePhotoSuccess) {
    return respond({
      code: responseCodes.photoMetaDataFailed,
      message: error?.message
    });
  }

  return respond({
    code: responseCodes.success,
    cookie: { name: cookieKey, value: userId || "" },
  });
};

const parseCookie = (str: string): Record<string, string> => {
  if (!str) return {};
  const array = str.split("; ").map((v) => v.split("="));
  return Object.fromEntries(array);
};
