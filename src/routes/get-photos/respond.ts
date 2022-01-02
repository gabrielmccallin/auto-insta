import { oak, Context } from "../../deps.ts";

export enum responseCodes {
  authFailed,
  getPhotosFailed,
  success,
}

export const responseMessages = {
  [responseCodes.success]: {
    message: "",
    status: oak.Status.OK,
  },
  [responseCodes.authFailed]: {
    message: "Access denied",
    status: oak.Status.BadRequest,
  },
  [responseCodes.getPhotosFailed]: {
    message: "Connection error: could not contact store",
    status: oak.Status.BadGateway,
  },
};

export const respond = ({
  code,
  context,
  message,
}: {
  code: responseCodes;
  context: Context;
  message?: string;
}) => {
  const { message: defaultMessage, status } = responseMessages[code];
  context.response.status = status;
  context.response.body = message ? message : defaultMessage;
};
