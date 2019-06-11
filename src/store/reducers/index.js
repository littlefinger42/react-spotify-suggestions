import * as types from "../constants/ActionTypes";

const initialState = {
  user: {
    accessToken: "",
    isLoginAttempted: false,
    spotify: {
      display_name: "",
      images: [
        {
          url: ""
        }
      ]
    }
  },
  topSongs: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    //USERS
    case types.SET_USER_ACCESS_TOKEN:
      return { ...state, user: { ...state.user, accessToken: action.payload } };
    case types.SET_USER_SPOTIFY_DATA:
      return { ...state, user: { ...state.user, spotify: action.payload } };
    //SONGS
    case types.UPDATE_TOP_SONGS:
      return { ...state, topSongs: action.payload };
  }
  return state;
}

export default reducer;
