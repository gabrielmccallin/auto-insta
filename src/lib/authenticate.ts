import { request } from "./request.ts";
import { unauthorized } from "./responses.ts";

export const key = "ð¤©";

// deno-lint-ignore no-explicit-any
export const authenticate = (req: request, next: () => any) => {
  const { headers } = req;
  return headers["x-api-key"] === key ? next() : unauthorized;
};
