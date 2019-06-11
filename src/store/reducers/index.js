import * as types from "../constants/ActionTypes";

const initialState = {
  user: {
    access_token: "",
    isLoginAttempted: false
  },
  topSongs: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    //USERS
    case types.UPDATE_USER:
      return { ...state, user: action.payload };
    case types.UPDATE_USER_SPOTIFY_DATA:
      return { ...state, user: { spotify: action.payload } };
    //SONGS
    case types.UPDATE_TOP_SONGS:
      return { ...state, topSongs: action.payload };
  }
  return state;
}

export default reducer;
