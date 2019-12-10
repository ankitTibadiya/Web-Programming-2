import authReducer from "./authReducer";
import postReducer from "./postReducer";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

export default rootReducer;
