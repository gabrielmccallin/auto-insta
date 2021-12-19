export const key = "ð¤©";
export const keyName = "x-api-key";

export const authenticate = (keyToTest: string) => {
  return keyToTest === key;
};


