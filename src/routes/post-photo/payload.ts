export const expectedKeys = ["location", "photoId", "description", "username", "password"];

export const validatePayload = (submittedKeys: string[]) => {
  const checker = (arr: string[], target: string[]) =>
    target.every((item) => arr.includes(item));

  return checker(submittedKeys, expectedKeys) ? true : false;
};
