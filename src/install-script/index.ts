import Request from "../helpers/Request";
import Console from "../utils/Console";

async function installWrapper() {
  const url = `https://raw.githubusercontent.com/demenik/spm-package/main/dist/spm-wrapper.bundle.js`;
  const fileData = await new Request(url).loadString();
  const fm = FileManager.iCloud();

  const spmPath = fm.joinPath(fm.documentsDirectory(), "spm");
  const path = fm.joinPath(spmPath, "spm-wrapper.js");

  if (!fm.fileExists(spmPath)) {
    fm.createDirectory(spmPath);
  }

  fm.writeString(path, fileData);
}

function deleteSelf() {
  const fm = FileManager.iCloud();
  const path = fm.joinPath(fm.documentsDirectory(), "install-spm.js");
  try {
    fm.remove(path);
  } catch {
    return;
  }
}

export default async function installScript(version: string) {
  Console.warn("spm not found, installing...");
  await installWrapper();
  Console.log("spm installed");
  deleteSelf();
  return await importModule("spm/spm-wrapper")(version);
}
