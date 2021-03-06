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
        label: "Acousticness",
        value: 0,
        step: 0.1,
        range: [0, 1],
        touched: false
      },
      {
        id: "danceability",
        label: "Danceability",
        value: 0,
        step: 0.1,
        range: [0, 1],
        touched: false
      },
      {
        id: "energy",
        label: "Energy",
        value: 0,
        step: 0.1,
        range: [0, 10],
        touched: false
      },
      {
        id: "instrumentalness",
        label: "Instrumentalness",
        value: 0,
        step: 0.1,
        range: [0, 10],
        touched: false
      },
      {
        id: "popularity",
        label: "Popularity",
        value: 0,
        step: 1,
        range: [0, 100],
        touched: false
      },
      {
        id: "speechiness",
        label: "Speechiness",
        value: 0,
        step: 0.1,
        range: [0, 10],
        touched: false
      },
      {
        id: "valence",
        label: "Valence",
        value: 0,
        step: 0.1,
        range: [0, 10],
        touched: false
      },
      {
        id: "key",
        label: "Key",
        value: 0,
        step: 1,
        range: [0, 11]
      },
      {
        id: "tempo",
        label: "BPM",
        value: 120,
        step: 1,
        range: [60, 200]
      }
    ]
  },
  topTracks: [],
  selectedTracks: [],
  recommendedTracks: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    //USERS
    case types.SET_USER_ACCESS_TOKEN:
      return { ...state, user: { ...state.user, accessToken: action.payload } };
    case types.SET_USER_SPOTIFY_DATA:
      return {
        ...state,
        user: {
          ...state.user,
          spotify: {
            ...state.user.spotify,
            ...action.payload
          }
        }
      };
    //TRACKS
    case types.UPDATE_TOP_TRACKS:
      return { ...state, topTracks: action.payload };
    case types.ADD_SELECTED_TRACK:
      return {
        ...state,
        selectedTracks: [...state.selectedTracks, action.payload]
      };
    case types.REMOVE_SELECTED_TRACK:
      return {
        ...state,
        selectedTracks: state.selectedTracks.filter(
          track => track.id != action.payload
        )
      };
    case types.ADD_RECOMMENDED_TRACKS:
      return {
        ...state,
        recommendedTracks: [...state.recommendedTracks, action.payload]
      };
    //RECOMMENDATION PARAMS
    case types.UPDATE_RECOMMENDATION_PARAM:
      return {
        ...state,
        user: {
          ...state.user,
          recommendationParams: state.user.recommendationParams.map(param => {
            return param.id === action.payload.id
              ? { ...param, ...action.payload, touched: true }
              : param;
          })
        }
      };
    case types.CLEAR_RECOMMENDATION_PARAM:
      return {
        ...state,
        user: {
          ...state.user,
          recommendationParams: initialState.user.recommendationParams
        }
      };
  }
  return state;
}

export default reducer;
