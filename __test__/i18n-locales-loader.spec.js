const i18nLocalesLoader = require("../src/index");
const loaderUtils = require("loader-utils");

jest.mock("loader-utils", () => ({
  getOptions: jest.fn(),
  getHashDigest: jest.fn(),
}));

describe("i18n-locales-loader", () => {
  const doTest = () => {
    const loaderThisInstance = {
      resourcePath: "/myproject/src/locales.json",
      rootContext: "/myproject",
      emitFile: jest.fn(),
    };
    const i18nLocalesLoaderFn = i18nLocalesLoader.bind(loaderThisInstance);

    jest
      .spyOn(loaderUtils, "getOptions")
      .mockImplementation(() => ({ esModule: true }));
    jest.spyOn(loaderUtils, "getHashDigest").mockImplementation(() => "a123b");

    const mockLocales = {
      en: {
        common: {
          hello: "Hello",
        },
      },
      zh: {
        common: {
          hello: "你好",
        },
      },
    };
    const localeContent = JSON.stringify(mockLocales);
    const result = i18nLocalesLoaderFn(localeContent);

    return { result, loaderThisInstance };
  };

  it("emits module output correctly", () => {
    const { result } = doTest();

    const expectedExportedObject = {
      en: "/static/locales/src/en.a123b.json",
      zh: "/static/locales/src/zh.a123b.json",
    };
    const expectedOutput = `export default ${JSON.stringify(
      expectedExportedObject
    )}`;
    expect(result).toEqual(expectedOutput);
  });

  it("emits locale-specific files", () => {
    const { loaderThisInstance } = doTest();

    const expectedObjects = [
      {
        webpackPath: "static/locales/src/en.a123b.json",
        localeStringified: JSON.stringify({
          common: {
            hello: "Hello",
          },
        }),
      },
      {
        webpackPath: "static/locales/src/zh.a123b.json",
        localeStringified: JSON.stringify({
          common: {
            hello: "你好",
          },
        }),
      },
    ];

    expectedObjects.forEach((expectedObject) => {
      const { webpackPath, localeStringified } = expectedObject;
      expect(loaderThisInstance.emitFile).toHaveBeenCalledWith(
        webpackPath,
        localeStringified
      );
    });
  });
});
