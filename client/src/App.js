import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Details from "./pages/Details";
import NotFound from "./pages/NotFound";
import "./scss/globals.scss";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Welcome}></Route>
          <Route exact path="/home" component={Home}></Route>
          <Route exact path="/pokemon" component={Create}></Route>
          <Route exact path="/home/:id" component={Details}></Route>
          <Route exact path="/notFound" component={NotFound}></Route>
          <Route exact path="*" component={NotFound}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
