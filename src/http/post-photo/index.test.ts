import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { clone } from "https://deno.land/x/object_clone@1.1.0/mod.ts";
import { handler } from "./index.ts";
import { baseRequest } from "../../lib/request.ts";
import {
  headers,
  recordSaved,
  badRequest,
} from "../../lib/responses.ts";
import { key, keyName } from "../../lib/authenticate.ts";

Deno.test("should fail authentication", async () => {
  const expected = {
    body: {
      message: "🚫 No baby!",
    },
    headers,
    statusCode: 401,
  };

  const response = await handler(baseRequest);
  assertEquals(response, expected);
});

Deno.test("should pass authentication but fail valid payload", async () => {
  const payload: typeof baseRequest = clone(baseRequest);
  payload.headers[keyName] = key;
  payload.body = "no object here!";

  const response = await handler(payload);
  assertEquals(response, badRequest);
});

// Cannot run this test without creating a specific import map pointing to a failing S3Bucket putObject method. Also would have to use a different deno test command to point to that import map. Not really what I want...
// Deno.test({
//   name: "should fail upload photo",
//   async fn() {
//     const payload: typeof baseRequest = clone(baseRequest);
//     payload.headers[keyName] = key;
//     payload.body = JSON.stringify({
//       title: "",
//       location: "",
//       photo: "",
//       description: "",
//     });

//     const response = await handler(payload);
//     assertEquals(response, uploadFailed);
//   },
// });

Deno.test("should upload photo and save a record", async () => {
  const payload: typeof baseRequest = clone(baseRequest);
  payload.headers[keyName] = key;
  payload.body = JSON.stringify({
    title: "",
    location: "",
    photo: "",
    description: "",
  });

  const response = await handler(payload);
  assertEquals(response, recordSaved);
});
