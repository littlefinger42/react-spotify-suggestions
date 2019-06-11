import * as types from "../constants/ActionTypes"

export const setUserAccessToken = payload => ({ type: types.SET_USER_ACCESS_TOKEN, payload });
export const setUserSpotifyData = payload => ({ type: types.SET_USER_SPOTIFY_DATA, payload });
export const updateTopSongs = payload => ({ type: types.UPDATE_TOP_SONGS, payload });