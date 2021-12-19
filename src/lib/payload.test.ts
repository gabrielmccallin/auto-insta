import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { responseTypes } from "./responses.ts";
import { validatePayload, expectedKeys } from "./payload.ts";


Deno.test("should return bad request", async () => {
  const response = await validatePayload("hello");
  assertEquals(response, responseTypes.invalidPayload);
});

Deno.test("should return payload as object", async () => {
  const fixture = expectedKeys.reduce((o, key) => ({ ...o, [key]: ""}), {})

  const response = await validatePayload(JSON.stringify(fixture));
  assertEquals(response, responseTypes.validPayload);
});


