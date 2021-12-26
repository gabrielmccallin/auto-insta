export const headers = {
  "content-type": "application/json; charset=utf8",
  "cache-control": "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
};


export const success = {
  statusCode: 200,
  headers,
};

export const unauthorized = {
  statusCode: 401,
  headers,
  body:{
    message: "🚫 No baby!"
  }
};

export const uploadFailed = {
  statusCode: 503,
  headers,
  body: JSON.stringify({
    message: "Upload photo failed",
  }),
};

export const badRequest = {
  statusCode: 400,
  headers,
  body: "😢 Bad request",
};

export const recordSaved = {
  ...success,
  body: "✊ Photo saved",
};

export const recordSaveFailed = {
  statusCode: 503,
  headers,
  body: JSON.stringify({
    message: "Save record failed",
  }),
};

// export const successWithBody = {
//   body: "HI!",
//   ...success
// }

export enum responseTypes {
  "unauthorized",
  "badRequest",
  "success",
  "validPayload",
  "invalidPayload",
  "uploadPhotoFailed",
  "dataSaveFailed"
}
