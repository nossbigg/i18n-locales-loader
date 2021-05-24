const emitLocaleFiles = (allLocalesMap, emitFile) => {
  const localeKeys = Object.keys(allLocalesMap);
  localeKeys.forEach((localeKey) => {
    const { webpackPath, content } = allLocalesMap[localeKey];
    const localeStringified = JSON.stringify(content);
    emitFile(webpackPath, localeStringified);
  });
};

exports.emitLocaleFiles = emitLocaleFiles;
