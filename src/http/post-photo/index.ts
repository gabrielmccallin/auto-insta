import * as data from "https://registry.begin.com/begin-data@master/mod.ts";
import { authenticate } from "../../lib/authenticate.ts";
import {
  recordSaved,
} from "../../lib/responses.ts";
import { request } from "../../lib/request.ts";
import { validatePayload } from "../../lib/payload.ts";

type payload = {
  created: number;
  key: string;
  title: string;
  location: string;
  photo: string;
  description: string;
};

export const handler = async (req: request) => {
  return await authenticate(req, () => validatePayload(req.body, saveRecord));
};

const saveRecord = async (payload: payload) => {
  const { title, location, photo, description } = payload;
  await data.set({
    table: "photos",
    title,
    location,
    photo,
    description,
    created: Date.now(),
  });

  return recordSaved;
};
