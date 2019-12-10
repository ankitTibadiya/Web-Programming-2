// import PostSummary from "../../components/posts/PostSummary";
import { firestore } from '../../index'

const createPost = post => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // async call to database
    firestore
      .collection("posts")
      .add({
        ...post,
        authorFirstName: "Luke",
        authorLastName: "Skywalker",
        authorId: 12345,
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

export default createPost;
