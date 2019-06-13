import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Reset } from 'styled-reset'

import Home from "../containers/Home.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Login from "../containers/Login.jsx";

import Header from "../components/Header.jsx"

class App extends React.Component {
  render() {
    return (
      <div>
        <Reset/>
        <Header>
          Spotify Suggestions Generator
        </Header>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute path="/home" component={Home} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
