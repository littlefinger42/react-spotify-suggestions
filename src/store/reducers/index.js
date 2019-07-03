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
    },
    recommendationParams: [
      {
        id: "acousticness", 
        value: 0,
        step: 0.1,
        range: [0, 1],
        touched: false
      },
      {
        id: "danceability", 
        value: 0,
        step: 0.1,
        range: [0, 1],
        touched: false
      },
      {
        id: "energy", 
        value: 0,
        step: 0.1,
        range: [0, 10],
        touched: false
      },
      {
        id: "instrumentalness", 
        value: 0,
        step: 0.1,
        range: [0, 10],
        touched: false
      },
      {
        id: "popularity", 
        value: 0,
        step: 1,
        range: [0, 100],
        touched: false
      },
      {
        id: "speechiness", 
        value: 0,
        step: 0.1,
        range: [0, 10],
        touched: false
      },
      {
        id: "valence", 
        value: 0,
        step: 0.1,
        range: [0, 10],
        touched: false
      }
    ]
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
    //RECOMMENDATION PARAMS
    case types.UPDATE_RECOMMENDATION_PARAM:
      return { ...state, user: { ...state.user, recommendationParams: state.user.recommendationParams.map(param => param.id === action.payload.id ? {...param, value: action.payload.value, touched: true} : param)}}
  }
  return state;
}

export default reducer;
