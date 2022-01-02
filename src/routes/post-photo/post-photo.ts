import { Context } from "../../deps.ts";
import { repository, savePhotoMetaData } from "../../repository/repository.ts";
import "https://deno.land/x/dotenv@v3.1.0/load.ts";
import { validatePayload } from "./payload.ts";
import { respond, responseCodes } from "./respond.ts";
import { uploadPhoto } from "../../upload-photo/upload-photo.ts";

export type ContextWithUpload = Context & { uploadedFiles?: Uint8Array };

export const photo = async (context: ContextWithUpload) => {
  const { cookies, request } = context;
  const config = JSON.parse(Deno.env.get("FIREBASE_CONFIG") || "");

  let parsed;
  let formData;
  let files;
  try {
    parsed = await request.body({ type: "form-data" }).value.read();
    formData = parsed.fields;
    files = parsed.files || [];
  } catch (_error) {
    return respond(responseCodes.invalidPayload, context);
  }

  if (formData && !validatePayload(formData)) {
    return respond(responseCodes.invalidPayload, context);
  }

  let fileContent;
  try {
    fileContent = await Deno.readFile(files[0].filename as string);
  } catch (_error) {
    fileContent = new Uint8Array();
  }

  const photoId = crypto.randomUUID();
  const { success } = await uploadPhoto(photoId, fileContent);

  if (!success) {
    return respond(responseCodes.uploadPhotoFailed, context);
  }

  const { password, username } = formData;
  const repositoryInitialised = await repository({
    cookies,
    password,
    username,
    config,
  });

  if (!repositoryInitialised) {
    return respond(responseCodes.loginFail, context);
  }

  const { description, location } = formData;
  const savePhotoMetaDataResult = await savePhotoMetaData({
    description,
    location,
    photoId,
  });
  if (!savePhotoMetaDataResult) {
    return respond(responseCodes.photoMetaDataFailed, context);
  }

  return respond(responseCodes.success, context);
};
