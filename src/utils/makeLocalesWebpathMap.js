const makeLocalesWebpathMap = (allLocalesMap) => {
  const localeKeys = Object.keys(allLocalesMap);
  const result = localeKeys.reduce((acc, localeKey) => {
    return { ...acc, [localeKey]: allLocalesMap[localeKey].webPath };
  }, {});
  return result;
};

exports.makeLocalesWebpathMap = makeLocalesWebpathMap;
