import * as types from "../constants/ActionTypes";

export const setUserAccessToken = payload => ({
  type: types.SET_USER_ACCESS_TOKEN,
  payload
});

export const setUserSpotifyDataStarted = () => ({
  type: types.SET_USER_SPOTIFY_DATA,
  status: "started"
});
export const setUserSpotifyDataError = payload => ({
  type: types.SET_USER_SPOTIFY_DATA,
  status: "error",
  payload
});
export const setUserSpotifyDataFinished = payload => ({
  type: types.SET_USER_SPOTIFY_DATA,
  status: "success",
  payload
});

export const updateTopTracks = payload => ({
  type: types.UPDATE_TOP_TRACKS,
  payload
});
export const updateSearchParams = payload => ({
  type: types.UPDATE_RECOMMENDATION_PARAM,
  payload
});
export const clearSearchParams = payload => ({
  type: types.CLEAR_RECOMMENDATION_PARAM,
  payload
});
