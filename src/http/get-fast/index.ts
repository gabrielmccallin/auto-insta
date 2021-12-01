import { request } from "../../lib/request.ts";
import { authenticate } from "../../lib/authenticate.ts";
import { successWithBody } from "../../lib/responses.ts";

export const handler = async (req: request) => {
  return await authenticate(req, () => someotherstuff("this fast"));
};

const someotherstuff = (param: string) => {
  return {
    ...successWithBody,
    body: param,
  };
};
