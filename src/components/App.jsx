import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { style } from "../config";
import { Reset } from "styled-reset";

import Home from "../containers/Home.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Login from "../containers/Login.jsx";
import Header from "../components/Header.jsx";

import config from "../../package.json";

const AppBody = styled.div`
  min-height: 100vh;
  color: ${style.textColor};
  background-color: ${style.blackBackground};
`;

class App extends React.Component {
  render() {
    return (
      <AppBody>
        <Reset />
        <Header title={config.friendlyName} version={config.version} />
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute path="/home" component={Home} />
          </Switch>
        </Router>
      </AppBody>
    );
  }
}

export default App;
