import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { clone } from "https://deno.land/x/object_clone@1.1.0/mod.ts";
import { handler } from "./index.ts";
import { baseRequest } from "../../lib/request.ts";
import { headers, recordSaved } from "../../lib/responses.ts";
import { key } from "../../lib/authenticate.ts";
// import { Stub, stub } from "https://deno.land/x/mock@v0.10.0/stub.ts";
// import * as data from "https://registry.begin.com/begin-data@master/mod.ts";

// Simple name and function, compact form, but not configurable
Deno.test("should fail authentication", async () => {
  const expected = {
    body: "🚫 No baby!",
    headers,
    statusCode: 401,
  };

  const response = await handler(baseRequest);
  assertEquals(response, expected);
});

Deno.test("should pass authentication and return message", async () => {
  const expected: typeof recordSaved = clone(recordSaved);
  expected.body = "✊ Photo saved";

  const requestWithAuthHeader: typeof baseRequest = clone(baseRequest);
  requestWithAuthHeader.headers["x-api-key"] = key;
  requestWithAuthHeader.body = JSON.stringify({
    hello: "payload"
  });

  const response = await handler(requestWithAuthHeader);
  assertEquals(response, expected);
});

// Fully fledged test definition, longer form, but configurable (see below)
// Deno.test({
//   name: "hello world #2",
//   fn: () => {
//     const x = 1 + 2;
//     assertEquals(x, 3);
//   },
// });
