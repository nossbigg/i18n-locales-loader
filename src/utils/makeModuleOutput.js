const makeModuleOutput = (options, objectToExport) => {
  const value = JSON.stringify(objectToExport);
  const esModule =
    typeof options.esModule !== "undefined" ? options.esModule : true;

  if (esModule) {
    return `export default ${value}`;
  }
  return `module.exports = ${value}`;
};

exports.makeModuleOutput = makeModuleOutput;
