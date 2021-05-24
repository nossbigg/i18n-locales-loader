# i18n-locales-loader

A `webpack` loader that splits your `locales.json` file into locale-specific files (eg. `en.json`, `zh.json`) for better locale-specific translations lazy loading support.

## What it does

**tldr;**

_Before_

- Loads `locales.json` as `Object` containing translations
- Always loads translations for **all locales** via **JS code**
- Translations are bundled **with JS code**

_After_

- Loads `locales.json` as `Object` with **URL mappings to locale-specific translations** (eg. `en.json`, `zh.json`)
- Option to load translations for **specific locales** via **XHR**
- Translations are bundled separately from JS code as **static JSON assets**

**Scenario**

```
== Folder Structure ==

- MyComponent
  - MyComponent.js
  - locales.json
```

- `MyComponent.js` React component requries i18n translations
- `locales.json` contains Component-specific translations

**Before & After**

_Code:_

```javascript
import locales from "./locales.json";

/*
== Without loader: ==
note: default webpack v4 behavior (ie. load as object)
locales = {
  en: { common: { hello: "Hello" } },
  zh: { common: { hello: "你好" } },
};

== With loader: ==
locales = {
  en: "/static/locales/MyComponent/en.a433v.json",
  zh: "/static/locales/MyComponent/zh.kfd83.json",
};
*/
```

_Webpack Build Output:_

```
== Without loader: ==
- build
  - static
    - js
      - main.a543vfds.chunk.js

== With loader: ==
- build
  - static
    - js
      - main.a543vfds.chunk.js
    - locales
      - MyComponent
        - en.a433v.json (en locale-specific translations)
        - zh.kfd83.json (zh locale-specific translations)
```

## Installation

1. Add `i18n-locales-loader` dependency

   ```bash
   yarn add i18n-locales-loader

   or

   npm install i18n-locales-loader
   ```

1. Use `i18n-locales-loader` in `webpack.config.js`

   ```javascript
   // webpack.config.js

   module.exports = {
     module: {
       rules: [
         // other rules...
         {
           test: /locales\.json$/,
           type: "javascript/auto",
           loader: require.resolve("i18n-locales-loader"),
         },
         // other rules...
       ],
     },
   };

   // note: need to define 'type' to override webpack v4 default JSON-loading behavior
   ```

## Motivation

1. How to load `locales` information?

- ❌ Via component JS code (ie. larger component code > larger initial bundle size > more JS code to parse > slower page load)
- ✅ Via XHR instead (to take advantage of **lazy loading** and **HTTP caching**)

2. How to load `locale-specific` information? (eg. `en`, `zh`)

- ❌ Load all locales (bad, because a site will only use a single locale (or two at best, for fallback cases))
- ✅ Load only specific locales that are required (less overall data to transfer)
