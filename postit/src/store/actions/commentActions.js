// import PostSummary from "../../components/posts/PostSummary";
import { firestore } from "../../index";

const createComment = (comment, id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // async call to database
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection("posts")
      .doc(id)
      .collection("comments")
      .add({
        ...comment,
        postId: id,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        postedAt: new Date()
      })
      .then(() => {
        dispatch({
          type: "CREATE_COMMENT",
          comment
        });
      })
      .catch(err => {
        dispatch({
          type: "CREATE_COMMENT_ERROR",
          err
        });
      });
  };
};

export default createComment;
