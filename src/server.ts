import { oak } from "./deps.ts";
import { photo, ContextWithUpload } from "./routes/post-photo/post-photo.ts";
import { getPhotos } from "./routes/get-photos/get-photos.ts";

const router = new oak.Router();

router
.post("/photo", async (context) => {
  return await photo(context as ContextWithUpload);
})
.get("/photos", async (context) => {
  return await getPhotos(context);
});

const app = new oak.Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
