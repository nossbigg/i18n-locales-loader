const { getOptions } = require("loader-utils");
const { makeLocalesMap } = require("./utils/makeLocalesMap");
const { makeModuleOutput } = require("./utils/makeModuleOutput");
const { makeLocalesBaseDir } = require("./utils/makeLocalesBaseDir");
const { emitLocaleFiles } = require("./utils/emitLocaleFiles");
const { makeLocalesWebpathMap } = require("./utils/makeLocalesWebpathMap");
const {
  doOptionsValidation,
} = require("./optionsValidator/doOptionsValidation");
const { makeBaseDir } = require("./utils/makeBaseDir");

function i18nLocalesLoader(content, map, meta) {
  const { resourcePath, rootContext } = this;

  const options = getOptions(this);
  doOptionsValidation(options);

  const allLocalesJson = JSON.parse(content);

  const baseDir = makeBaseDir(options.buildLocalesPath);
  const localesBaseDir = makeLocalesBaseDir(resourcePath, rootContext, baseDir);
  const allLocalesMap = makeLocalesMap(allLocalesJson, localesBaseDir);

  emitLocaleFiles(allLocalesMap, this.emitFile);

  const localesWebpathMap = makeLocalesWebpathMap(allLocalesMap);
  const moduleOutput = makeModuleOutput(options, localesWebpathMap);
  return moduleOutput;
}

module.exports = i18nLocalesLoader;
