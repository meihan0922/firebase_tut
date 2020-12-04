import auth from "./authReducer";
import product from "./projectReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth,
  product,
});

export default rootReducer;
