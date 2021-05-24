import React from "react";
import locales from "./locales.json";
import { MyComponent } from "../MyComponent";
import { useFetchLocale } from "../fetchUtils";
import { makePrettyJson } from "../utils";
import "./MyPage.css";

export const MyPage: React.FC = () => {
  const enLocales = useFetchLocale(locales.en);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/MyPage/MyPage.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          <br />
          locales import
          <br />
          {makePrettyJson(locales)}
          <br />
          en locales
          <br />
          {enLocales && makePrettyJson(enLocales)}
        </div>
        <br />
        <MyComponent />
      </header>
    </div>
  );
};
