const emitLocaleFiles = (allLocalesMap, emitFile) => {
  const localeValues = Object.values(allLocalesMap);

  localeValues.forEach((localeValue) => {
    const { webpackPath, content } = localeValue;
    const localeStringified = JSON.stringify(content);
    emitFile(webpackPath, localeStringified);
  });
};

exports.emitLocaleFiles = emitLocaleFiles;
