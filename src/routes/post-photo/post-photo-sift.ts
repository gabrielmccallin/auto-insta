import { Context, std } from "../../deps.ts";
import { repository, savePhotoMetaData } from "../../repository/repository.ts";
import "https://deno.land/x/dotenv@v3.1.0/load.ts";
import { validatePayload } from "./payload.ts";
import { respond, responseCodes } from "./respond.ts";
import { uploadPhoto } from "../../upload-photo/upload-photo.ts";

export type ContextWithUpload = Context & { uploadedFiles?: Uint8Array };

declare global {
  interface Crypto {
    randomUUID: () => string;
  }
}

export const photo = async (request: Request) => {
  const formData = await request.formData();
  const keys = formData.keys();
  const arrayEntries = [...keys];

  if (!formData || !validatePayload(arrayEntries)) {
    return respond(responseCodes.invalidPayload);
  }

  const file = formData.get("file") as Blob;

  if (!file) return respond(responseCodes.invalidPayload);

  const buffer = await file.arrayBuffer();
  const uint = new Uint8Array(buffer);

  const photoId = crypto.randomUUID();
  const { success } = await uploadPhoto(photoId, uint);

  if (!success) {
    return respond(responseCodes.uploadPhotoFailed);
  }

  const fromEntries = Object.fromEntries(formData.entries());

  const { password, username, description, location } = fromEntries;

  const configString = Deno.env.get("FIREBASE_CONFIG") || "[]";
  const config = JSON.parse(configString);

  const cookies = request.headers.get("cookie") || "";
  const parseCookie = (str: string): Record<never, never> => {
    if (!str) return {};
    const array = str.split("; ").map((v) => v.split("="));
    return Object.fromEntries(array);
  };

  const [repositoryInitialised, message] = await repository({
    cookies: parseCookie(cookies),
    password: password as string,
    username: username as string,
    config,
  });

  if (!repositoryInitialised) {
    return respond(responseCodes.loginFail);
  }

  const savePhotoMetaDataResult = await savePhotoMetaData({
    description: description as string,
    location: location as string,
    photoId,
  });
  if (!savePhotoMetaDataResult) {
    return respond(responseCodes.photoMetaDataFailed);
  }

  if (message !== "no cookie set") {
    const headers = new Headers();
    std.setCookie(headers, {
      name: "LOGGED_IN_UID",
      value: message,
    });
    return new Response("Photo metadata was saved to database", {headers, status: 201});
  }

  return respond(responseCodes.success);
};
