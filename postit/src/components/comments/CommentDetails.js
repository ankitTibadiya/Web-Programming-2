import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import CommentDisplay from "./CommentDisplay";

class CommentDetails extends Component {
  render() {
    const { comments } = this.props;
    if (comments) {
      let commentsList = [];
      for (let [key, value] of Object.entries(comments)) {
        commentsList.push([key, value]);
      }
      return (
        <div className="post-list section">
          {commentsList &&
            commentsList.map(comment => {
              return <CommentDisplay key={comment[0]} comment={comment[1]} />;
            })}
        </div>
      );
    } else if (!comments) {
      return (
        <div className="container center ">
          <p>No comments yet...!!</p>
        </div>
      );
    } else {
      return (
        <div className="container center ">
          <p>Loading comments...</p>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const comments = state.firestore.data.comments;
  return {
    comments: comments
  };
};

export default compose(
  firestoreConnect(props => [
    {
      collection: "posts",
      doc: props.postId,
      subcollections: [{ collection: "comments" }],
      orderBy: ["postedAt", "desc"],
      storeAs: "comments"
    }
  ]),
  connect(mapStateToProps, null)
)(CommentDetails);
