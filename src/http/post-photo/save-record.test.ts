import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
// import { unauthorized, badRequest } from "../../lib/responses.ts";
// import { postPhoto } from "./post-photo.ts";
// import { keyName, key } from "../../lib/authenticate.ts";
import { saveRecord } from "./save-record.ts";
import { responseTypes } from "../../lib/responses.ts";
// Deno.test("should fail from lack of begin creds", async () => {
//   const fixture = {
//     title: "tere",
//     location: "",
//     photo: "",
//     description: ""
//   };

//   const response = await saveRecord(fixture);
//   assertEquals(response.type, responseTypes.dataSaveFailed);
// });

Deno.test("should save data", async () => {
  const fixture = {
    title: "tere",
    location: "",
    photo: "",
    description: ""
  };

  const response = await saveRecord(fixture);
  assertEquals(response.type, responseTypes.success);
});
