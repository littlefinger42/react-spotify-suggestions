import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "../containers/Home.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Login from "../containers/Login.jsx";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute path="/home" component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
