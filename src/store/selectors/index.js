export const getSpotifyDisplayName = state => {
  return state.user.spotify.display_name;
};
export const getSpotifyDisplayImgUrl = state => {
  if (state.user.spotify.images.length > 1)
    return state.user.spotify.images[0].url;
  return "";
};
export const getUserAccessToken = state => {
  return state.user.accessToken;
};
export const getSpotifyUserId = state => {
  return state.user.spotify.id;
};
export const getRecommendationParams = state => {
  return state.user.recommendationParams;
};
export const getSelectedTracks = state => {
  return state.selectedTracks;
};
export const getTopTracks = state => {
  return state.topTracks;
};
export const getSelectedTrackIds = state => {
  return state.selectedTracks.map(selectedTrack => selectedTrack.id);
};
export const getRecommendedTracks = state => {
  return state.recommendedTracks;
};
export const getTouchedRecommendationParams = state => {
  return state.user.recommendationParams.filter(param => param.touched);
};
