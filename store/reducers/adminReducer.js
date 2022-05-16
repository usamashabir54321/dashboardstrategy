import { SET_AUTH_USER, NOTHING_TO_SET } from "../types";

const initialState = {
  auth_u : {},
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_USER:
      return {
        ...state,
        auth_u: action.payload
      };

    case NOTHING_TO_SET:
      return {
        error: action.payload
      };

    default:
      return state;
  }
};

export default adminReducer;
