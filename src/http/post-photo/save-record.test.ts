import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { saveRecord } from "./save-record.ts";
import { responseTypes } from "../../lib/responses.ts";
import * as sinon from "https://cdn.skypack.dev/sinon@12.0.1?dts";

import { BeginData } from "./stubs/beginStub.ts";

const beginDataStub = sinon.stub(BeginData.prototype, "set");
Deno.test("should fail to save data", async () => {
  const fixture = {
    title: "tere",
    location: "",
    photo: "",
    description: ""
  };

  beginDataStub.rejects();

  const response = await saveRecord(fixture);
  assertEquals(response.type, responseTypes.dataSaveFailed);
  beginDataStub.reset();
});

Deno.test("should save data", async () => {
  const fixture = {
    title: "tere",
    location: "",
    photo: "",
    description: ""
  };

  beginDataStub.resolves();

  const response = await saveRecord(fixture);
  assertEquals(response.type, responseTypes.success);

  beginDataStub.reset();
});
