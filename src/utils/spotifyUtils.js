import config from "../config"

console.log(config)

const spotifyUtils = {
  getSpotifyUserData(accessToken, abortController) {
    let options = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };
    if (abortController && abortController.signal) {
      options = { ...options, ...(options.signal = abortController.signal) };
    }

    return fetch("https://api.spotify.com/v1/me/", options)
      .then(res => res.json())
      .then(result => result, error => error);
  },

  redirectToSpotifyLoginPage() {
    window.location.href =
      `https://accounts.spotify.com/authorize?client_id=${config.spotify.clientId}&response_type=token&redirect_uri=${config.spotify.redirectUrl}`;
  }
};

export default spotifyUtils;
