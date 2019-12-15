import React from "react";
import moment from "moment";

const CommentDisplay = ({ comment }) => {
  if (comment) {
    return (
      <div className="card z-depth-0">
        <div className="card-content">
          <p>{comment.content}</p>
        </div>
        <div className="card-action ligthen-4 white-text">
          <div>
            commented by {comment.authorFirstName}
            {comment.authorLastName}
          </div>
          <div>{moment(comment.postedAt.toDate()).calendar()}</div>
        </div>
      </div>
    );
  } else if (!comment) {
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
};

export default CommentDisplay;
