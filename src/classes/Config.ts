import Cache from "./Cache";

export default class Config<T> extends Cache<T> {
  defaults: T;

  constructor(name: string, defaults: T) {
    super(name);
    this.defaults = defaults;

    const fm = FileManager.iCloud();
    const spmPath = fm.joinPath(fm.documentsDirectory(), "spm");

    this.dir = fm.joinPath(spmPath, "config");
    this.path = fm.joinPath(this.dir, this.filename);

    // Create config file with defaults, if it doesn't exist
    if (!this.exists()) {
      this.set(defaults);
    }
  }
}
