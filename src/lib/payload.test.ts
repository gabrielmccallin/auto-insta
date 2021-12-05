import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { clone } from "https://deno.land/x/object_clone@1.1.0/mod.ts";
import { baseRequest } from "./request.ts";
import { badRequest } from "./responses.ts";
import { validatePayload } from "./payload.ts";
import {
  Spy,
  spy,
  assertSpyCallsMin,
} from "https://deno.land/x/mock@0.12.1/mod.ts";


Deno.test("should return bad request", async () => {
  // const req = clone(baseRequest);
  const next = () => {};

  const response = await validatePayload("hello", next);
  assertEquals(response, badRequest);
});

Deno.test("should call next", async () => {
  const req: typeof badRequest = clone(baseRequest);
  const next: Spy<void> = spy();

  
  await validatePayload(req.body, next);
  assertSpyCallsMin(next, 1);
});


