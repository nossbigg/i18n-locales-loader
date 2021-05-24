const { validate } = require("schema-utils");

const schema = require("./schema.json");
const configuration = { name: "i18n-locales-loader", baseDataPath: "options" };

const doOptionsValidation = (options) => {
  validate(schema, options, configuration);
};

exports.doOptionsValidation = doOptionsValidation;
