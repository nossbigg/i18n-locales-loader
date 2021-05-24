const path = require("path");

const makeLocalesBaseDir = (resourcePath, rootContext, optionsBaseDir) => {
  const allLocalesJsonDir = path.dirname(resourcePath);
  const localesBaseDir = path.join(
    optionsBaseDir,
    allLocalesJsonDir.replace(rootContext, "")
  );
  return localesBaseDir;
};

exports.makeLocalesBaseDir = makeLocalesBaseDir;
