import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { clone } from "https://deno.land/x/object_clone@1.1.0/mod.ts";
import { baseRequest, request } from "./request.ts";
import { unauthorized } from "./responses.ts";
import { authenticate, key } from "./authenticate.ts";
import {
  Spy,
  spy,
  assertSpyCallsMin,
} from "https://deno.land/x/mock@0.12.1/mod.ts";

Deno.test("should return unauthorized", () => {
  const req = clone(baseRequest);
  const next = () => {};

  const response = authenticate(req, next);
  assertEquals(response, unauthorized);
});

Deno.test("should not call next", () => {
  const req = clone(baseRequest);
  const next: Spy<void> = spy();

  const response = authenticate(req, next);
  assertSpyCallsMin(next, 0);
  assertEquals(response, unauthorized);
});

Deno.test("should call next and return result of next", () => {
  const returnedValue = "hello";
  const req: request = clone(baseRequest);
  req.headers["x-api-key"] = key;
  const next = () => "hello";

  const response = authenticate(req, next);
  assertEquals(response, returnedValue);
});

