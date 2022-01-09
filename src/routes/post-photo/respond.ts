import { setCookie } from "../../deps.ts";

export enum responseCodes {
  photoMetaDataFailed,
  success,
  loginFail,
  loginSuccess,
  invalidPayload,
  invalidFormData,
  uploadPhotoFailed,
}

export const responseMessages = {
  [responseCodes.photoMetaDataFailed]: {
    defaultMessage:
      "Photo metadata was not saved due to an upstream issue or missing store configuration (check environment variables)",
    status: 502,
  },
  [responseCodes.success]: {
    defaultMessage: "Photo was saved in storage, photo metadata was saved to database",
    status: 201,
  },
  [responseCodes.loginFail]: {
    defaultMessage: "Repository login failed",
    status: 502,
  },
  [responseCodes.loginSuccess]: {
    defaultMessage: "Repository login succeeded",
    status: 200,
  },
  [responseCodes.invalidPayload]: {
    defaultMessage: "Invalid payload",
    status: 400,
  },
  [responseCodes.invalidFormData]: {
    defaultMessage: "Invalid form data",
    status: 400,
  },
  [responseCodes.uploadPhotoFailed]: {
    defaultMessage: "Photo save failed",
    status: 502,
  },
};

export const respond = ({
  code,
  message,
  cookie,
}: {
  code: responseCodes;
  message?: string;
  cookie?: { name: string; value: string };
}) => {
  const { defaultMessage, status } = responseMessages[code];

  const headers = new Headers();

  if (cookie) {
    const { name, value } = cookie;
    setCookie(headers, {
      name,
      value,
      httpOnly: true,
      secure: true,
      maxAge: 3,
    });
  }

  return new Response(message || defaultMessage, {
    status,
    headers,
  });
};
