import { spotify } from "../config";

const spotifyUtils = {
  /**
   * Fetch's spotify user data based on access token
   * @param {string} accessToken is retrieved from the query parameter after authenticating on spotify's domain
   * @param {Object} abortController is used to cancel the fetch if the component is unloaded
   * @returns {Object}
   */
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
  /**
   * Fetch's spotify user's top tracks data based on access token
   * @param {string} accessToken is retrieved from the query parameter after authenticating on spotify's domain
   * @param {Object} abortController is used to cancel the fetch if the component is unloaded
   * @returns {Array<Object>}
   */
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
  /**
   * Fetch's spotify user's top tracks data based on access token
   * @param {string} accessToken is retrieved from the query parameter after authenticating on spotify's domain
   * @param {Array} seeds an array of string song IDs
   * @param {Object} abortController is used to cancel the fetch if the component is unloaded
   * @returns {Array<Object>}
   */
  getSpotifyRecommendations(accessToken, seeds, abortController) {
    let options = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };
    if (abortController && abortController.signal) {
      options = { ...options, ...(options.signal = abortController.signal) };
    }

    return fetch(
      "https://api.spotify.com/v1/recommendations?seed_tracks=" +
        seeds.join(","),
      options
    )
      .then(res => res.json())
      .then(response => response.tracks, error => error);
  },
  /**
   * Redirects to spotify's login page
   */
  redirectToSpotifyLoginPage() {
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${
      spotify.clientId
    }&response_type=token&redirect_uri=${
      spotify.redirectUrl
    }&scope=user-top-read`;
  }
};

export default spotifyUtils;
