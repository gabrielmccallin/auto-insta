import * as data from "https://registry.begin.com/begin-data@master/mod.ts";

// this is so that we can stub the begin data module. sinon lets us stub methods of classes but not static e6 module imports. So we wrap the begin data module in a class. Not ideal but better than managing different import maps.

export class BeginData {
  // deno-lint-ignore no-explicit-any
  async set(params: any) {
      await data.set(params);
  }
}
