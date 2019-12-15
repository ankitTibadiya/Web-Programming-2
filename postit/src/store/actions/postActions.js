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

export const deletePost = post => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // async call to database
    console.log(post);
    firestore
      .collection("posts")
      .doc(post)
      .delete()
      .then(() => {
        dispatch({
          type: "DELETE_POST"
        });
      })
      .catch(err => {
        dispatch({
          type: "DELETE_POST_ERROR",
          err
        });
      });
  };
};

export const updatePost = (post,id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // async call to database
    console.log(post);
    firestore
      .collection("posts")
      .doc(id)
      .update({
        ...post,
        updatedAt: new Date()
      })
      .then(() => {
        dispatch({
          type: "UPDATE_POST"
        });
      })
      .catch(err => {
        dispatch({
          type: "UPDATE_POST_ERROR",
          err
        });
      });
  };
};
