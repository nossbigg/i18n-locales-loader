const path = require("path");
const { getHashDigest } = require("loader-utils");
const { mergeObjects } = require("./reducerUtils");

const makeLocalesMap = (allLocalesJson, baseDir) => {
  const localeKeys = Object.keys(allLocalesJson);
  const localesMap = localeKeys
    .map(makeLocaleMapEntry(allLocalesJson, baseDir))
    .reduce(mergeObjects, {});
  return localesMap;
};

const makeLocaleMapEntry = (allLocalesJson, baseDir) => (localeKey) => {
  const content = allLocalesJson[localeKey];

  const localeJson = { [localeKey]: content };
  const localeJsonHash = getHashDigest(
    JSON.stringify(localeJson),
    "sha1",
    "base64",
    5
  );

  const webpackPath = path.join(baseDir, `${localeKey}.${localeJsonHash}.json`);
  const webPath = path.join(path.sep, webpackPath);

  const entry = {
    [localeKey]: { localeKey, webPath, webpackPath, content: localeJson },
  };
  return entry;
};

exports.makeLocalesMap = makeLocalesMap;
