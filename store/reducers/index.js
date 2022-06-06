import { combineReducers } from "redux";
import themeReducer from "./themeReducer";
import adminReducer from "./adminReducer";

export default combineReducers({
  themeChanger: themeReducer,
  adminStore: adminReducer,
});
