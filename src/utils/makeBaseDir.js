const path = require("path");

const DEFAULT_BASE_DIR_PARTS = ["static", "locales"];

const makeBaseDir = (buildLocalesPath) => {
  const baseDirParts =
    typeof buildLocalesPath === "undefined"
      ? DEFAULT_BASE_DIR_PARTS
      : buildLocalesPath;

  return path.join(...baseDirParts);
};

exports.makeBaseDir = makeBaseDir;
