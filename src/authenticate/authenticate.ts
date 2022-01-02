import "https://deno.land/x/dotenv/load.ts";
export const key = "x-api-key";

export const authenticate = (value: string, keyToTest: string) => {
  return keyToTest === value;
};
