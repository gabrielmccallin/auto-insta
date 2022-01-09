import { assertEquals } from "../../dev-deps.ts";
import { validatePayload, expectedKeys } from "./payload.ts";


Deno.test("should return false for invalid payload", () => {
  const response = validatePayload([]);
  assertEquals(response, false);
});

Deno.test("should return false for missing keys", () => {
  const response = validatePayload(["description"]);
  assertEquals(response, false);
});

Deno.test("should return true for valid payload", () => {
  const response = validatePayload(expectedKeys);
  assertEquals(response, true);
});


