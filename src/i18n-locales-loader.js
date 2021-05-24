const path = require("path");
const { getOptions, getHashDigest } = require("loader-utils");

const BASE_DIR = path.join("static", "locales");

const makeLocalesMap = (allLocalesJson, baseDir) => {
  const localeKeys = Object.keys(allLocalesJson);
  const localesMap = localeKeys
    .map((localeKey) => {
      const localeJson = allLocalesJson[localeKey];
      const localeJsonHash = getHashDigest(
        JSON.stringify(localeJson),
        "sha1",
        "base64",
        5
      );

      const webpackPath = path.join(
        baseDir,
        `${localeKey}.${localeJsonHash}.json`
      );
      const webPath = path.join(path.sep, webpackPath);

      const entry = {
        [localeKey]: { webPath, webpackPath, content: localeJson },
      };
      return entry;
    })
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
  return localesMap;
};

const jsonStringify = (obj) => {
  const value = JSON.stringify(obj)
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
  return value;
};

function i18nLocalesLoader(content, map, meta) {
  const { resourcePath, rootContext } = this;
  const options = getOptions(this);

  const allLocalesJson = JSON.parse(content);

  const allLocalesJsonDir = path.dirname(resourcePath);
  const relativeBaseDir = path.join(
    BASE_DIR,
    allLocalesJsonDir.replace(rootContext, "")
  );

  const allLocalesMap = makeLocalesMap(allLocalesJson, relativeBaseDir);

  const localeKeys = Object.keys(allLocalesMap);
  localeKeys.forEach((localeKey) => {
    const { webpackPath, content } = allLocalesMap[localeKey];
    const localeStringified = JSON.stringify(content);
    this.emitFile(webpackPath, localeStringified);
  });

  const moduleExport = localeKeys.reduce((acc, localeKey) => {
    return { ...acc, [localeKey]: allLocalesMap[localeKey].webPath };
  }, {});
  const value = jsonStringify(moduleExport);

  const esModule =
    typeof options.esModule !== "undefined" ? options.esModule : true;
  const output = `${esModule ? "export default" : "module.exports ="} ${value}`;
  return output;
}

module.exports = i18nLocalesLoader;
