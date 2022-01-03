export enum responseCodes {
  photoMetaDataFailed,
  success,
  loginFail,
  loginSuccess,
  invalidPayload,
  invalidFormData,
  uploadPhotoFailed,
}

const responseMessages = {
  [responseCodes.photoMetaDataFailed]: {
    message:
      "Photo metadata was not saved due to an upstream issue or missing store configuration (check environment variables)",
    status: 502,
  },
  [responseCodes.success]: {
    message: "Photo metadata was saved to database",
    status: 201,
  },
  [responseCodes.loginFail]: {
    message: "Repository login failed",
    status: 502,
  },
  [responseCodes.loginSuccess]: {
    message: "Repository login succeeded",
    status: 200,
  },
  [responseCodes.invalidPayload]: {
    message: "Invalid payload",
    status: 400,
  },
  [responseCodes.invalidFormData]: {
    message: "Invalid form data",
    status: 400,
  },
  [responseCodes.uploadPhotoFailed]: {
    message: "Photo save failed",
    status: 502,
  },
};

export const respond = (code: responseCodes) => {
  const { message, status } = responseMessages[code];
  return new Response(message, {
    status
  })
};
