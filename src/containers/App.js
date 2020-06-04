import React from "react";
import Nav from "../components/Nav/Nav";
import Home from "../components/Home/Home";
import Register from "../components/Register/Register";
import * as Env from "../environments";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Parse from "parse";

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/register" exact component={Register}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
