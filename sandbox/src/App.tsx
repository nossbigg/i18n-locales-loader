import React from "react";
import logo from "./logo.svg";
import locales from "./locales.json";
import { MyComponent } from "./MyComponent";
import { useFetchLocale } from "./fetchUtils";
import { makePrettyJson } from "./utils";
import "./App.css";

function App() {
  const enLocales = useFetchLocale(locales.en);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
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
}

export default App;
