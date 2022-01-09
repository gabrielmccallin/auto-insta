import { serve } from "./deps.ts";
import { photo } from "./routes/post-photo/post-photo.ts";

serve({
  "/photo": async (request: Request) => {
    if (request.method === "POST") {
      return await photo(request);
    }
    return new Response("Method not allowed", {
      status: 405,
    });
  },
});
