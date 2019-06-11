import React from "react";

import store from "../store/store";
import { updateUserSpotifyData } from "../store/actions/index";
import { throws } from "assert";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.abortController = new AbortController();
    this.state = {
      topSongs: []
    };

  }

  componentDidMount() {
    //TODO: Make it come from local state, not Redux
    fetch("https://api.spotify.com/v1/me/", {
      signal: this.abortController.signal,
      headers: {
        Authorization: `Bearer ${store.getState().user.access_token}`
      }
    })
      .then(res => res.json())
      .then(
        result => {
          store.dispatch(updateUserSpotifyData(result));
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  render() {
    return <span>Logged in </span>;
  }
}

export default Home;
