export const headers = {
  "content-type": "application/json; charset=utf8",
  "cache-control": "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
};

const success = {
  statusCode: 200,
  headers
};

export const unauthorized = {
  statusCode: 401,
  headers,
  body: "🚫 No baby!",
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

export const successWithBody = {
  body: "HI!",
  ...success
}
