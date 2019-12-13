import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import moment from "moment";
import CreateComment from "../comments/CreateComment";
import CreateDetails from "../comments/CommentDetails";

class PostDetails extends Component {
  render() {
    const { post } = this.props;
    if (post) {
      return (
        <div className="container section post-details">
          <div className="card z-depth-0">
            <div className="card-content">
              <span className="card-title"> {post.title}</span>
              <p>{post.content}</p>
            </div>
            <div className="card-action ligthen-4 grey-text">
              <div>
                Posted by {post.authorFirstName} {post.authorLastName}
              </div>
              <div>{moment(post.createdAt.toDate()).calendar()}</div>
            </div>
            <CreateComment id={this.props.id} />
            {/* Comments */}
          </div>
          <CreateDetails postId={this.props.id} />
        </div>
      );
    } else {
      return (
        <div className="container center ">
          <p>Loading posts...</p>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const posts = state.firestore.data.posts;
  const post = posts ? posts[id] : null;
  return {
    post: post,
    id: id
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(["posts"])
)(PostDetails);
