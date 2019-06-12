import * as types from "../constants/ActionTypes";

const initialState = {
  user: {
    accessToken: "",
    spotify: {
      display_name: "",
      images: [
        {
          url: ""
        }
      ]
    }
  },
  topTracks: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    //USERS
    case types.SET_USER_ACCESS_TOKEN:
      return { ...state, user: { ...state.user, accessToken: action.payload } };
    case types.SET_USER_SPOTIFY_DATA:
      return { ...state, user: { ...state.user, spotify: { ...state.user.spotify, ...action.payload, status: action.status } } };
    //TRACKS
    case types.UPDATE_TOP_TRACKS:
      return { ...state, topTracks: action.payload };
  }
  return state;
}

export default reducer;
