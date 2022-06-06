import { SET_AUTH_USER, SET_SIDEBAR, SET_PROJECT, NOTHING_TO_SET } from "../types";

const initialState = {
  auth_u : {},
  thisProject : {},
  openSideBar : false,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_USER:
      return {
        ...state,
        auth_u: action.payload
      };
      
    case SET_PROJECT:
      return {
        ...state,
        thisProject: action.payload
      };
      
    case SET_SIDEBAR:
      return {
        ...state,
        openSideBar: action.payload
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
