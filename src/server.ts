import {
  serve,
} from "https://deno.land/x/sift@0.4.2/mod.ts";
import {photo } from "./routes/post-photo/post-photo-sift.ts";

serve({
  "/photo": async (request: Request) => {
    if(request.method === "POST") {
      return await photo(request);
    }
    return new Response("Method not allowed", {
      status: 415
    })
  },
});
