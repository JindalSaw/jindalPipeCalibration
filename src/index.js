import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./App.css";
import * as serviceWorker from "./serviceWorker";
import { createBrowserHistory } from "history";
import { Route, Router } from "react-router";
import { Switch, Redirect, HashRouter } from "react-router-dom";
import gaugeHistory from "./Components/gaugeHistory";
import gaugeEntry from "./Components/guageEntry";
import JHeader from "./header";
import JFooter from "./footer";
import ProductionTable from "./Components/productionTable";
import Signup from "./Components/signup";
import inactiveTable from "./Components/inactiveGauge";

const history = createBrowserHistory();
const routing = (
  <HashRouter history={history}>
    <div className="App">
      <JHeader />
      <Switch>
        <Route exact path="/" component={Signup} exact={true} />
        <Route path="/login" component={Signup} exact={true} />
        <Route path="/gaugeHistory" component={gaugeHistory} exact={true} />
        <Route path="/inactiveTable" component={inactiveTable} exact={true} />
        <Route
          path="/productionTable"
          component={ProductionTable}
          exact={true}
        ></Route>
      </Switch>
      <JFooter />
    </div>
  </HashRouter>
);
ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
