import * as types from "../constants/ActionTypes"

export const updateUser = payload => ({ type: types.UPDATE_USER, payload });
export const updateUserSpotifyData = payload => ({ type: types.UPDATE_USER_SPOTIFY_DATA, payload });
export const updateTopSongs = payload => ({ type: types.UPDATE_TOP_SONGS, payload });