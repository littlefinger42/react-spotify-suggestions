import { spotify } from "../config";

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
      .then(response => response, error => error);
  },
  getSpotifyTopTracks(accessToken, abortController) {
    let options = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };
    if (abortController && abortController.signal) {
      options = { ...options, ...(options.signal = abortController.signal) };
    }

    return fetch("https://api.spotify.com/v1/me/top/tracks", options)
      .then(res => res.json())
      .then(response => response.items, error => error);
  },
  getSpotifyRecommendations(accessToken, seeds, abortController) {
    let options = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };
    if (abortController && abortController.signal) {
      options = { ...options, ...(options.signal = abortController.signal) };
    }

    return fetch("https://api.spotify.com/v1/recommendations?seed_tracks=" + seeds.join(","), options)
      .then(res => res.json())
      .then(response => response.tracks, error => error);
  },
  redirectToSpotifyLoginPage() {
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${
      spotify.clientId
    }&response_type=token&redirect_uri=${spotify.redirectUrl}&scope=user-top-read`;
  }
};

export default spotifyUtils;
