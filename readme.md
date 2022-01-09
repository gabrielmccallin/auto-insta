# auto-insta

See `.vscode/tasks.json` for commands to run and test this project.

## Tests
These network calls are stubbed with Sinon.
- `putObject` method on `S3Bucket` class  
https://deno.land/x/s3@0.4.1/mod.ts

- `signInWithEmailAndPassword` 
https://cdn.skypack.dev/firebase@9.6.2/auth

- `addDoc`  
https://cdn.skypack.dev/firebase@9.6.2/firestore

**There are no smoke tests calling the API.**

This is because of the way that Deno Deploy picks up changes from the repository. 
- Pipeline tests run on push to the `main` branch. 
- A successful pipeline run will push the changeset to the `production` branch.
- Deploy to the environment will happen on push to the `production` branch.

So post deploy tasks are not available to the current pipeline.

Ideally there would be a post deploy pipeline that could run integration tests. A successful run here could potentially deploy to another environment and provide a more complete preproduction / production test pipeline.
