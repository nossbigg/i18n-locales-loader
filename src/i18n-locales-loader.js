const path = require("path");
const { getOptions } = require("loader-utils");
const { makeLocalesMap } = require("./utils/makeLocalesMap");
const { makeModuleOutput } = require("./utils/makeModuleOutput");
const { makeLocalesBaseDir } = require("./utils/makeLocalesBaseDir");
const { emitLocaleFiles } = require("./utils/emitLocaleFiles");
const { makeLocalesWebpathMap } = require("./utils/makeLocalesWebpathMap");

const BASE_DIR = path.join("static", "locales");

function i18nLocalesLoader(content, map, meta) {
  const { resourcePath, rootContext } = this;
  const options = getOptions(this);

  const allLocalesJson = JSON.parse(content);

  const localesBaseDir = makeLocalesBaseDir(
    resourcePath,
    rootContext,
    BASE_DIR
  );
  const allLocalesMap = makeLocalesMap(allLocalesJson, localesBaseDir);

  emitLocaleFiles(allLocalesMap, this.emitFile);

  const localesWebpathMap = makeLocalesWebpathMap(allLocalesMap);
  const moduleOutput = makeModuleOutput(options, localesWebpathMap);
  return moduleOutput;
}

module.exports = i18nLocalesLoader;
