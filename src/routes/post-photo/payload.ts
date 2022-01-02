export const expectedKeys = ["location", "photoId", "description", "username", "password"];

export const validatePayload = (payload: Record<never, never>) => {
  const keys = Object.keys(payload);
  const checker = (arr: string[], target: string[]) =>
    target.every((item) => arr.includes(item));

  return checker(keys, expectedKeys) ? true : false;
};
