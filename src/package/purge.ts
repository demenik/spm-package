import Cache from "../helpers/Cache";
import Config from "../helpers/Config";
import Console from "../utils/Console";

export default function purge() {
  // Package cache
  const cache = new Cache<Record<string, number>>("purge");
  const packages = cache.get();

  // Purge config
  const config = new Config("purge", {
    enablePurge: true,
    deleteAfterDays: 7, // 1 week
  });
  const enablePurge = config.getKey("enablePurge");
  const deleteAfter = config.getKey("deleteAfterDays") * 24 * 60 * 60 * 1000;

  if (!enablePurge) {
    Console.warn(
      "Purge is disabled. This will cause packages to pile up. To enable purge, set 'purgeEnabled' in 'spm/config/purge.json' to 'true'."
    );
    return;
  }

  const fm = FileManager.iCloud();
  const spmPath = fm.joinPath(fm.documentsDirectory(), "spm");

  for (const [name, timestamp] of Object.entries(packages)) {
    if (timestamp + deleteAfter < Date.now()) {
      cache.deleteKey(name as keyof typeof packages);
      fm.remove(fm.joinPath(spmPath, name + ".js"));

      Console.log(
        `purge : ${name} was last used ${new Date(
          timestamp
        ).toLocaleString()}, and therefore has been deleted.`
      );
    }
  }

  Console.log("purge : completed");
}
