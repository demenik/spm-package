import Package from "../helpers/Package";

export default async function wrapper(version: string) {
  const _package = new Package("spm-team", "spm", version);
  return await _package.import();
}
