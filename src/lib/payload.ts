import { badRequest } from "./responses.ts";

export const validatePayload = async (
  payload: string,
  // deno-lint-ignore no-explicit-any
  next: (payload: any) => any
) => {
  let parsedPayload;
  try {
    parsedPayload = JSON.parse(payload);
  } catch {
    return badRequest;
  }

  return await next(parsedPayload);
};
