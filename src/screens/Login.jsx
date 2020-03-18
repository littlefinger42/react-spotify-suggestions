import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  getSpotifyDisplayName,
  getUserAccessToken,
  getRecommendationParams
} from "../store/selectors/index";
import { setUserAccessToken, setUserSpotifyData } from "../store/actions/index";

import urlUtils from "../utils/urlUtils";
import spotifyUtils from "../utils/spotifyUtils";

import Main from "../components/Main.jsx";
import Card from "../components/Card.jsx";
import Spinner from "../components/Spinner.jsx";
import Button from "../components/Button.jsx";
import Alert from "../components/Alert.jsx";

const mapStateToProps = state => {
  return {
    user: {
      accessToken: getUserAccessToken(state),
      spotify: {
        display_name: getSpotifyDisplayName(state)
      }
    },
    recommendationParams: getRecommendationParams(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserAccessToken: prop => dispatch(setUserAccessToken(prop)),
    setUserSpotifyData: prop => dispatch(setUserSpotifyData(prop))
  };
};

function LoginScreen(props) {
  const [isLoading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const abortController = new AbortController();

  /**
   * Returns the accessToken from the URL, otherwise false
   * @returns {string|boolean}
   */
  const getAccessToken = () => {
    if (props.user.accessToken) {
      return props.user.accessToken;
    }

    const accessTokenParam = urlUtils.getUrlParam("#", "access_token");
    if (!accessTokenParam) {
      if (urlUtils.getUrlParam("\\?", "error") === "access_denied") {
        setAlert({
          type: "danger",
          message: "Spotify Access Denied"
        });
      }
      return false;
    }

    return accessTokenParam.split("&")[0];
  };

  const accessToken = getAccessToken();

  useEffect(() => {
    async function doFetchUserData(accessToken) {
      await setLoading(true);
      const userData = await spotifyUtils
        .getSpotifyUserData(accessToken, abortController)
        .then(response => response);
      await setLoading(false);
      if (!userData.display_name) {
        await setAlert({
          type: "danger",
          message: "Failed to fetch spotify user data"
        });
      } else {
        await props.setUserSpotifyData(userData);
        props.history.push("/home");
      }
    }

    props.setUserAccessToken(accessToken);
    if (accessToken && !props.user.spotify.displayName) {
      doFetchUserData(accessToken);
    }
    return () => {
      abortController.abort();
    };
  }, [accessToken]);

  return (
    <Main>
      {alert && alert.message && <Alert {...alert} />}
      <Card>
        <p>
          Spotify Suggestions Generator doesn't store any of your information.
        </p>
        <br></br>
        <p>
          The purpose of Spotify Suggestions Generator is to utilise the spotify
          API to give the user more control over their recommendations than they
          can in the desktop or mobile client.
        </p>
        <br></br>
        <Button handleClick={spotifyUtils.redirectToSpotifyLoginPage}>
          Authorize Spotify
        </Button>
        {isLoading && <Spinner />}
      </Card>
    </Main>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
