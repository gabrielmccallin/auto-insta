import { badRequest } from "./responses.ts";

export const validatePayload = async (
  payload: string,
  // deno-lint-ignore no-explicit-any
  next: (payload: any) => any
) => {
  console.log("******************");
  let parsedPayload;
  console.log(JSON.parse(payload));
  try {
    parsedPayload = JSON.parse(payload);
  } catch {
    return badRequest;
  }

  return await next(parsedPayload);
};
