import { oak, Context } from "../../deps.ts";
import { asserts } from "../../dev-deps.ts";
import { respond, responseCodes } from "./respond.ts";

Deno.test("should respond with 201 Created", () => {
  const context = {
    response: {
      status: 0,
      body: ""
    }
  }
  respond(responseCodes.success, context as Context);
  
  asserts.assertEquals(context.response.status, oak.Status.Created);
});

Deno.test("should respond with error", () => {
  const context = {
    response: {
      status: 0,
      body: "",
    },
  };
  respond(responseCodes.success, context as Context, "hiya!");

  asserts.assertEquals(context.response.status, oak.Status.Created);
  asserts.assertEquals(context.response.body, "hiya!");
});
