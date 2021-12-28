import { serve } from "https://deno.land/std@0.119.0/http/server.ts";
import { handler as photosList } from "./http/get-photos/index.ts";

const handler = async (req: Request): Promise<Response> => {
  console.log("Method:", req.method);

  const url = new URL(req.url);
  console.log("Path:", url.pathname);
  console.log("Query parameters:", url.searchParams);

  console.log("Headers:", req.headers);

  if (req.body) {
    const body = await req.text();
    console.log("Body:", body);
  }

  const list = await photosList();
  return new Response(list.toString());
};

serve(handler);
