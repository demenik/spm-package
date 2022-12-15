import Console from "../utils/Console";
import Request from "./Request";

type PackageInfo = {
  name: string;
  author: string;
  description: string;
  versions: {
    [version: string]: {
      file: string;
      changelog?: string[];
      spmVersion?: string;
    };
  };
  latest?: string;
};

export default class Package {
  packageId: string;
  author: string;
  name: string;
  version: string;

  url: string;
  description: string;
  fileData: string | null;

  constructor(author: string, name: string, version: string) {
    this.packageId = `${author}>${name}>${version}`;
    this.author = author;
    this.name = name;
    this.version = version;
  }

  async fetchPackageInfo() {
    const url = `https://raw.githubusercontent.com/demenik/spm/main/packages/${this.author}/${this.name}/spm.json`;
    const data: PackageInfo = await new Request(url).loadJSON();

    const version = data.versions[this.version];

    if (!version) {
      throw new Error("Version not found");
    }

    this.url = `https://raw.githubusercontent.com/demenik/spm/main/packages/${this.author}/${this.name}/${version.file}`;
    this.description = data.description;
  }

  async fetchFileData(force = false): Promise<string> {
    if (this.fileData && !force) {
      return this.fileData;
    }

    if (!this.url) {
      await this.fetchPackageInfo();
    }

    this.fileData = await new Request(this.url).loadString();
    return this.fileData;
  }

  async installFile(): Promise<string> {
    const fm = FileManager.iCloud();
    const spmPath = fm.joinPath(fm.documentsDirectory(), "spm");
    const path = fm.joinPath(spmPath, `${this.packageId}.js`);

    if (!fm.fileExists(spmPath)) {
      fm.createDirectory(spmPath);
    }

    // Check if file exists
    if (fm.fileExists(path)) {
      return path;
    }

    Console.log(`${this.author}>${this.name}>${this.version} : downloading...`);
    await this.fetchFileData();

    fm.writeString(path, this.fileData);
    Console.log(`${this.author}>${this.name}>${this.version} : downloaded`);

    return path;
  }

  async import() {
    const path = await this.installFile();
    return importModule(path);
  }
}
