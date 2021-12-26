import { responseTypes } from "../../lib/responses.ts";
import { BeginData } from "./stubs/beginStub.ts";

export type beginData = {
  title: string;
  location: string;
  photo: string;
  description: string;
};

export const saveRecord = async (payload: beginData) => {
  const { title, location, photo, description } = payload;
  try {
    const beginData = new BeginData();
    await beginData.set({
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
      payload: error,
    };
  }

  return {
    type: responseTypes.success,
    payload: "Data saved",
  };
};
