# i18n-locales-loader

A `webpack` loader that splits your `locales.json` file into locale-specific files (eg. `en.json`, `zh.json`) for better locale-specific translations lazy loading support.

## What it Does

1. **Splits** a `locales.json` up into **separate files** for each locale.

   - `locales.json`

   ```javascript
   == Before ==
   // locales.json
   {
     "en": { "common": { "hello": "Hello" } },
     "zh": { "common": { "hello": "你好" } }
   }

   == After ==
   // locales/en.json
   { "en": { "common": { "hello": "Hello" } } }

   // locales/zh.json
   { "zh": { "common": { "hello": "你好" } } }
   ```

   - Webpack Build Output

   ```
   == Before ==
    - build
      - static
        - js
          - main.a543vfds.chunk.js

   == After ==
    - build
      - static
        - js
          - main.a543vfds.chunk.js
        - locales
          - src
            - MyComponent
              - en.a433v.json (en locale-specific translations)
              - zh.kfd83.json (zh locale-specific translations)
   ```

2. **Modifies** `locales.json` imported object to return **URL paths** for each locale.

   - `MyComponent.js`

   ```javascript
    // MyComponent.js
    import locales from './locales.json'

    == Before ==
    // locales object
    {
      en: { common: { hello: "Hello" } },
      zh: { common: { hello: "你好" } },
    }

    // locale usage
    console.log(locales.en.common.hello) // prints "Hello"

    == After ==
    // locales object
    {
      en: "/static/locales/src/MyComponent/en.a433v.json",
      zh: "/static/locales/src/MyComponent/zh.kfd83.json",
    }

    // locale usage
    fetch(locales.en)
      .then(resp => resp.json())
      .then(content => console.log(content.en.common.hello)) // prints "Hello"
   ```

<details markdown="1">
<summary>More details</summary>

_Folder Structure:_

```
- <project root>
  - src
    - MyComponent
      - MyComponent.js
      - locales.json

```

- `MyComponent.js` React component requries i18n translations
- `locales.json` contains Component-specific translations

</details>

### In Summary

_Before:_

- Loads `locales.json` as `Object` containing translations
- Always loads translations for **all locales** via **JS code**
- Translations are bundled **with JS code**

_After:_

- Loads `locales.json` as `Object` with **URL mappings to locale-specific translations** (eg. `en.json`, `zh.json`)
- Option to load translations for **specific locales** via **XHR**
- Translations are bundled separately from JS code as **static JSON assets**

## Installation

1. Add `i18n-locales-loader` dependency

   ```bash
   yarn add --dev i18n-locales-loader
   or
   npm install --save-dev i18n-locales-loader
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
           options: {
             // for more details: see options documentation
             esModule: true,
             buildLocalesPath: ["static", "locales"],
           },
         },
         // other rules...
       ],
     },
   };

   // note: need to define 'type' to override webpack v4 default JSON-loading behavior
   ```

## Loader `options`

- `options.esModule`
  - Optional, `boolean`, default: `true`
  - Defines module output format
  - When true, Emit output as ES Module (ie. `export default`)
  - When false, Emit output as CommonJS Module (ie. `module.exports`)
- `options.buildLocalesPath`
  - Optional, `string[]`, default: `["static", "locales"]`
  - Defines build directory path to emit locales files to
  - Uses [`path.join()`](https://nodejs.org/api/path.html#path_path_join_paths) to generate directory path
  - eg. In default setup, `["static", "locales"]` -> `/static/locales`

## Motivation

1. How to load `locales` information?

- ❌ Via component JS code (ie. larger component code > larger initial bundle size > more JS code to parse > slower page load)
- ✅ Via XHR instead (to take advantage of **lazy loading** and **HTTP caching**)

2. How to load `locale-specific` information? (eg. `en`, `zh`)

- ❌ Load all locales (bad, because a site will only use a single locale (or two at best, for fallback cases))
- ✅ Load only specific locales that are required (less overall data to transfer)
