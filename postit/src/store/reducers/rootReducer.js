import authReducer from "./authReducer";
import postReducer from "./postReducer";
import commentReducer from './commentReducer';
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  comment: commentReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

export default rootReducer;
