import { authenticate, keyName } from "../../lib/authenticate.ts";
import { validatePayload } from "../../lib/payload.ts";
import { uploadPhoto } from "./upload-photo/upload-photo.ts";
import { saveRecord } from "./save-record.ts";
import { beginRequest } from "../../lib/request.ts";
import {
  responseTypes,
  unauthorized,
  badRequest,
  uploadFailed,
  recordSaved,
  recordSaveFailed,
} from "../../lib/responses.ts";
import { S3Bucket } from "https://deno.land/x/s3@0.4.1/mod.ts";

export const handler = async (req: beginRequest) => {
  const { body, headers } = req;

  if (!authenticate(headers[keyName])) return unauthorized;
  
  if ((await validatePayload(body)) === responseTypes.invalidPayload)
    return badRequest;

  const { type } = await uploadPhoto(S3Bucket);
  if (type === responseTypes.uploadPhotoFailed) return uploadFailed;

  const { type: saveRecordResponse } = await saveRecord(body);
  return saveRecordResponse !== responseTypes.dataSaveFailed
    ? recordSaved
    : recordSaveFailed;
};
