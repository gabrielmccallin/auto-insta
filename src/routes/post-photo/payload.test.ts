import { assertEquals } from "https://deno.land/std@0.119.0/testing/asserts.ts";
import { validatePayload, expectedKeys } from "./payload.ts";


Deno.test("should return false for invalid payload", () => {
  const response = validatePayload("hello");
  assertEquals(response, false);
});

Deno.test("should return false for missing keys", () => {
  const response = validatePayload({
    description: "what?"
  });
  assertEquals(response, false);
});

Deno.test("should return true for valid payload", async () => {
  const fixture = expectedKeys.reduce((o, key) => ({ ...o, [key]: "" }), {});

  const response = await validatePayload(fixture);
  assertEquals(response, true);
});


