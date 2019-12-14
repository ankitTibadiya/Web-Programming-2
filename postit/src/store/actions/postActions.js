import { firestore } from "../../index";

export const createPost = post => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // async call to database
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection("posts")
      .add({
        ...post,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date()
      })
      .then(() => {
        dispatch({
          type: "CREATE_POST",
          post
        });
      })
      .catch(err => {
        dispatch({
          type: "CREATE_POST_ERROR",
          err
        });
      });
  };
};

export const addVote = (post, vote) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // async call to database
    console.log("postV", post);
    firestore
      .collection("posts")
      .doc(post)
      .update({
        votes: vote
      })
      .then(() => {
        dispatch({
          type: "ADD_VOTE"
        });
      })
      .catch(err => {
        dispatch({
          type: "ADD_VOTE_ERROR",
          err
        });
      });
  };
};
