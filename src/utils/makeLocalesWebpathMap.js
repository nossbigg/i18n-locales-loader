const { mergeObjects } = require("./reducerUtils");

const makeLocalesWebpathMap = (allLocalesMap) => {
  const result = Object.values(allLocalesMap)
    .map(makeLocaleWebpathEntry)
    .reduce(mergeObjects, {});

  return result;
};

const makeLocaleWebpathEntry = (localeValue) => {
  const { localeKey, webPath } = localeValue;
  return { [localeKey]: webPath };
};

exports.makeLocalesWebpathMap = makeLocalesWebpathMap;
