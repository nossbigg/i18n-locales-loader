import locales from "./locales.json";
import { useFetchLocale } from "../fetchUtils";
import { makePrettyJson } from "../utils";

export const MyComponent = () => {
  const zhLocales = useFetchLocale(locales.zh);

  return (
    <div>
      MyComponent!
      <br />
      locales import
      <br />
      {makePrettyJson(locales)}
      <br />
      zh locales
      <br />
      {zhLocales && makePrettyJson(zhLocales)}
    </div>
  );
};
