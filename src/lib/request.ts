export type beginRequest = {
  version: string;
  routeKey: string;
  rawPath: string;
  rawQueryString: string;
  headers: {
    host: string;
    "user-agent": string;
    accept: string;
    "x-api-key": string;
  };
  requestContext: {
    http: { method: string; path: string };
    routeKey: string;
  };
  isBase64Encoded: boolean;
  // deno-lint-ignore no-explicit-any
  body: any;
};

export const baseRequest = {
  version: "what!?",
  routeKey: "what!?",
  rawPath: "what!?",
  rawQueryString: "what!?",
  headers: {
    host: "what!?",
    "user-agent": "what!?",
    accept: "what!?",
    "x-api-key": "what!?",
  },
  requestContext: {
    http: { method: "GET", path: "adfasdf" },
    routeKey: "what!?",
  },
  isBase64Encoded: false,
  body: JSON.stringify({
    "hello": "there",
  }),
};
