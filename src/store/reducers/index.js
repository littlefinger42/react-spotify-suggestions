import * as types from "../constants/ActionTypes";

const initialState = {
  user: {
    access_token: "",
    isLoginAttempted: false
  }
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_USER:
      return { ...state, user: action.payload};
  }
  return state;
}

export default reducer;
