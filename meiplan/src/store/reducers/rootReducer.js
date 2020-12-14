import auth from "./authReducer";
import product from "./projectReducer";
import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

const rootReducer = combineReducers({
  auth,
  product,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default rootReducer;
