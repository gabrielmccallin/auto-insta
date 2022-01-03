import {
  serve,
} from "https://deno.land/x/sift@0.4.0/mod.ts";
import { uploadPhoto } from "./upload-photo/upload-photo.ts";

serve({
  "/photo": async (request) => {
    const formData = await request.formData();
    const file = formData.get("file") as Blob;

    const buffer = await file.arrayBuffer();
    const uint = new Uint8Array(buffer);

    const { success } = await uploadPhoto("wahhey", uint);

    return new Response(JSON.stringify(success));
  },
});
