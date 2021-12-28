import { assertEquals } from "https://deno.land/std@0.119.0/testing/asserts.ts";
import { authenticate, key, keyName } from "./authenticate.ts";

Deno.test("should return true", () => {
  const header = {
    [keyName]: key
  }
  const authenticated = authenticate(header[keyName]);
  assertEquals(authenticated, false);
});

Deno.test("should return false", () => {
  const header = {
    [keyName]: "bad key"
  }
  const authenticated = authenticate(header[keyName]);
  assertEquals(authenticated, false);
});
