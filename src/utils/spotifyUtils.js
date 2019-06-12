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
      "https://accounts.spotify.com/authorize?client_id=6a055beb5e304ad19bf4dc36a07e3fcd&response_type=token&redirect_uri=http://localhost:8080/";
  }
};

export default spotifyUtils;
