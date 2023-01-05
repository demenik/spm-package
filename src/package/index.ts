import Cache from "../helpers/Cache";
import Package from "../helpers/Package";
import Console from "../utils/Console";
import purge from "./purge";

export default {
  version: "0.0.7",
  purgeCache: new Cache<Record<string, number>>("purge"),

  async import(author: string, name: string, version: string) {
    this.purgeCache.setKey(`${author}>${name}>${version}`, Date.now());

    const _package = new Package(author, name, version);
    const _import = await _package.import();

    Console.log(`${author}>${name}>${version} : imported`);
    return _import;
  },
};

// Delete packages that haven't been used in a week
purge();
