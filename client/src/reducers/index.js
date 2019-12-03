import { combineReducers } from "redux";
import todos from "./todos";
import visibilityFilter from "./visibilityFilter";
import ethConnection from "./ethConnection";

export default combineReducers({
  todos,
  visibilityFilter,
  ethConnection
});
