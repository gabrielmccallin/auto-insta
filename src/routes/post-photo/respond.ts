import { oak, Context } from "../../deps.ts";

export enum responseCodes {
  photoMetaDataFailed,
  success,
  loginFail,
  loginSuccess,
  invalidPayload,
  uploadPhotoFailed
}

const responseMessages = {
  [responseCodes.photoMetaDataFailed]: {
    message: "Photo metadata was not saved due to an upstream issue or missing store configuration (check environment variables)",
    status: oak.Status.BadGateway,
  },
  [responseCodes.success]: {
    message: "Photo metadata was saved to database",
    status: oak.Status.Created,
  },
  [responseCodes.loginFail]: {
    message: "Repository login failed",
    status: oak.Status.BadGateway,
  },
  [responseCodes.loginSuccess]: {
    message: "Repository login succeeded",
    status: oak.Status.OK,
  },
  [responseCodes.invalidPayload]: {
    message: "Invalid payload",
    status: oak.Status.BadRequest,
  },
  [responseCodes.uploadPhotoFailed]: {
    message: "Photo save failed",
    status: oak.Status.BadGateway,
  },
};

export const respond = (code: responseCodes, context: Context) => {
  const { message, status } = responseMessages[code];
  context.response.status = status;
  context.response.body = message;
};
