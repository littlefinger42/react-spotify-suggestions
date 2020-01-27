import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { style } from "./config";
import { Reset } from "styled-reset";

import Home from "./screens/Home.jsx";
import Login from "./screens/Login.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Header from "./containers/Header.jsx";

import config from "../package.json";

const AppBody = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: ${style.textColor};
  background-color: ${style.blackBackground};
  font-family: "Open Sans", Arial;
  font-size: 12px;
  @media ${style.device.tablet} {
    font-size: 14px;
  }
  a {
    color: #fff;
    &:hover {
      text-decoration: none;
    }
  }
  .hidden {
    display: none;
  }
  strong {
    font-weight: bold;
  }
`;

class App extends React.Component {
  render() {
    return (
      <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
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
      </IconContext.Provider>
    );
  }
}

export default App;
