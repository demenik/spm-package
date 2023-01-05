export default class Cache<T> {
  dir: string;
  path: string;
  filename: string;

  constructor(name: string) {
    const fm = FileManager.iCloud();
    const spmPath = fm.joinPath(fm.documentsDirectory(), "spm");

    this.filename = name + ".json";
    this.dir = fm.joinPath(spmPath, "cache");
    this.path = fm.joinPath(this.dir, this.filename);
  }

  set(data: T) {
    const fm = FileManager.iCloud();

    if (!fm.fileExists(this.dir)) {
      fm.createDirectory(this.dir);
    }
    fm.writeString(this.path, JSON.stringify(data, null, 2));
  }

  get(): T {
    const fm = FileManager.iCloud();

    if (!fm.fileExists(this.path)) {
      return {} as T;
    }
    return JSON.parse(fm.readString(this.path));
  }

  exists(): boolean {
    const fm = FileManager.iCloud();
    return fm.fileExists(this.path);
  }

  getKey<K extends keyof T>(key: K): T[K] {
    const data = this.get();
    return data[key];
  }

  setKey(key: keyof T, value: T[keyof T]) {
    const data = this.get();
    data[key] = value;
    this.set(data);
  }

  deleteKey(key: keyof T) {
    const data = this.get();
    delete data[key];
    this.set(data);
  }
}
