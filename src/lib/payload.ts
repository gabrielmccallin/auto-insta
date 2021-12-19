import { responseTypes } from "./responses.ts";

export const expectedKeys = ["title", "location", "photo", "description"];

export const validatePayload = async (payload: string) => {
  let parsed;
  try {
    parsed = await JSON.parse(payload);
  } catch {
    return responseTypes.invalidPayload;
  }

  const keys = Object.keys(parsed);
  const checker = (arr: string[], target: string[]) =>
    target.every((item) => arr.includes(item));

  return checker(keys, expectedKeys)
    ? responseTypes.validPayload
    : responseTypes.invalidPayload;
};
