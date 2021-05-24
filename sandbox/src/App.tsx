import { BrowserRouter, Route, Switch } from "react-router-dom";
import { MyPage } from "./MyPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={MyPage} />
        <Route path="/path1" component={MyPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
