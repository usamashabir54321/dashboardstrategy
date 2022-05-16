import { DARK_THEME, LIGHT_THEME, NO_THEME } from "../types";

const initialState = {
  themeMode: 'd_dark',
  loading: true,
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case DARK_THEME:
      return {
        ...state,
        themeMode: action.payload,
        loading: false,
      };
    case LIGHT_THEME:
      return {
        ...state,
        themeMode: action.payload,
        loading: false,
      };

    case NO_THEME:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default themeReducer;
