import { responseTypes } from "../../lib/responses.ts";

import * as data from "https://registry.begin.com/begin-data@master/mod.ts";

export type beginData = {
  title: string;
  location: string;
  photo: string;
  description: string;
};

export const saveRecord = async (payload: beginData) => {
  const { title, location, photo, description } = payload;
  try {
      await data.set({
        table: "photos",
        title,
        location,
        photo,
        description,
        created: Date.now(),
      });
  } catch (error) {
      return {
          type: responseTypes.dataSaveFailed,
          payload: error
      }
  }

  return {
      type: responseTypes.success,
      payload: "Data saved"
  };
};
