import { spotify } from "../config";

const spotifyUtils = {
  /**
   * @param {string} accessToken is retrieved from the query parameter after authenticating on spotify's domain
   * @param {Object} abortController is used to cancel the fetch if the component is unloaded
   * @returns {Promise<Object>}
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
      .then(response => response.json())
      .then(
        response => response || {},
        error => error || {}
      );
  },
  /**
   * @param {string} accessToken retirevied from spotify authentication
   * @param {Object} abortController is used to cancel the fetch if the component is unloaded
   * @returns {Promise<Array><Object>}
   */
  searchSpotifyTracks(accessToken, abortController, searchQuery) {
    let options = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };
    if (abortController && abortController.signal) {
      options = { ...options, ...(options.signal = abortController.signal) };
    }

    return fetch(
      `https://api.spotify.com/v1/search?q=${searchQuery}&type=track`,
      options
    )
      .then(response => response.json())
      .then(
        response => response.tracks.items || [],
        error => error || {}
      );
  },
  /**
   * @param {string} accessToken retirevied from spotify authentication
   * @param {Object} abortController is used to cancel the fetch if the component is unloaded
   * @returns {Promise<Array><Object>}
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
      .then(response => response.json())
      .then(
        response => response.items || [],
        error => error || {}
      );
  },
  /**
   * @param {string} accessToken retirevied from spotify authentication
   * @param {Object} abortController is used to cancel the fetch if the component is unloaded
   * @returns {Promise<Array><Object>}
   */
  getSpotifyRecentTracks(accessToken, abortController) {
    let options = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };
    if (abortController && abortController.signal) {
      options = { ...options, ...(options.signal = abortController.signal) };
    }

    return fetch(
      "https://api.spotify.com/v1/me/player/recently-played?type=track",
      options
    )
      .then(response => response.json())
      .then(
        response => response.items.map(item => item.track) || [],
        error => error || {}
      );
  },
  /**
   * Fetch's spotify user's top tracks data based on array of seeds
   * @param {string} accessToken retirevied from spotify authentication
   * @param {Array} seeds an array of string song IDs
   * @param {Object} abortController is used to cancel the fetch if the component is unloaded
   * @returns {Promise<Object>}
   */
  getSpotifyRecommendations(
    accessToken,
    seeds,
    recommendationParams,
    abortController
  ) {
    let options = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };
    if (abortController && abortController.signal) {
      options = { ...options, ...(options.signal = abortController.signal) };
    }

    if (seeds.length > 5) {
      let newSeeds = [];
      for (let i = 0; i < 5; i++) {
        newSeeds.push(seeds[Math.floor(Math.random() * seeds.length)]);
      }
      seeds = newSeeds;
    }

    let queryParams = [`seed_tracks=${seeds.join(",")}`];

    recommendationParams.forEach(param => {
      queryParams.push(`target_${param.id}=${param.value}`);
    });

    return fetch(
      `https://api.spotify.com/v1/recommendations?${queryParams.join("&")}`,
      options
    )
      .then(response => response.json())
      .then(
        response => response.tracks || [],
        error => error || {}
      );
  },
  /**
   * @param {string} accessToken retirevied from spotify authentication
   * @param {string} userId retirevied from spotify authentication
   * @param {Array} seeds an array of string song IDs
   * @param {Object} abortController is used to cancel the fetch if the component is unloaded
   * @returns {Promise<Object>}
   */
  createAndFillSpotifyPlaylist(
    accessToken,
    userId,
    { seeds, name },
    abortController
  ) {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      referrer: "no-referrer",
      body: JSON.stringify({
        name
      })
    };
    if (abortController && abortController.signal) {
      options = { ...options, ...(options.signal = abortController.signal) };
    }

    return fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      options
    )
      .then(response => response.json())
      .then(response => {
        if (response.id)
          return this.addTracksToSpotifyPlaylist(
            accessToken,
            response.id,
            seeds,
            abortController
          );
      });
  },
  /**
   * @param {string} accessToken
   * @param {string} playlistId
   * @param {Array} seeds
   * @param {Object} abortController
   * @returns {Promise<Object>}
   */
  addTracksToSpotifyPlaylist(accessToken, playlistId, seeds, abortController) {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      referrer: "no-referrer",
      body: JSON.stringify({
        uris: seeds.map(seed => `spotify:track:${seed.id}`)
      })
    };
    if (abortController && abortController.signal) {
      options = { ...options, ...(options.signal = abortController.signal) };
    }

    return fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      options
    )
      .then(response => response.json())
      .then(response => {
        response.playlistId = playlistId;
        return response || { playlistId: null };
      });
  },

  redirectToSpotifyLoginPage() {
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${spotify.clientId}&response_type=token&redirect_uri=${spotify.redirectUrl}&scope=user-top-read,playlist-modify-public,user-read-recently-played`;
  }
};

export default spotifyUtils;
