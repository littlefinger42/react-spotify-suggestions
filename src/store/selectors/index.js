export const getSpotifyDisplayName = state => {
  return state.user.spotify.display_name;
};
export const getSpotifyDisplayImgUrl = state => {
  return state.user.spotify.images[0].url;
};
export const getUserAccessToken = state => {
  return state.user.accessToken;
};
