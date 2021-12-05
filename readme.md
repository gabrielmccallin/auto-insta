# Begin with Deno
Local development with Begin using `@architect/sandbox`

## Running locally
- Initialise with `npm i`
- Start dev server with `npm start`

This will start `@architect/sandbox` and allow you to make http requests to the local development server, mimicking the behaviour of the hosted Begin services. 

Server starts by default at port 3333.

## Tests
One of the tests mocks out the database call (which is an in memory DynamoDB when running with `@architect/sandbox`). 

An import map mocks the Begin data package, see: `src/http/post-photo/unit.test.importmap.json`

This command will run all the tests in `src` and load the import map.

```
deno test --import-map=src/http/post-photo/unit.test.importmap.json src 
```

## Reference
- [Quickstart](https://docs.begin.com/en/guides/quickstart/) - basics on working locally, project structure, deploying, and accessing your Begin app
- [Creating new routes](https://docs.begin.com/en/functions/creating-new-functions) - basics on expanding the capabilities of your app

Head to [docs.begin.com](https://docs.begin.com/) to learn more!
