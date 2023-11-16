import { combineReducers } from "redux";
import counter from "./counter";
import todos from "./todos";
const rootReduer = combineReducers({
  counter,
  todos,
});

export default rootReduer;
