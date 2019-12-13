import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import moment from "moment";
import { addVote } from "../../store/actions/postActions";
import CreateComment from "../comments/CreateComment";
import CreateDetails from "../comments/CommentDetails";

class PostDetails extends Component {
  upVote = e => {
    console.log("POstSumma", this.props.id, this.props.post.votes);
    e.preventDefault();
    this.props.addVote(this.props.id, this.props.post.votes + 1);
  };
  downVote = e => {
    e.preventDefault();
    this.props.addVote(this.props.id, this.props.post.votes - 1);
  };
  render() {
    const { post } = this.props;
    if (post) {
      return (
        <div className="container section post-details">
          <div className="row">
            <div className="col m1 l1">
              <div className="action">
                <button
                  className="btn-floating btn-small waves-effect waves-light green"
                  onClick={this.upVote}
                >
                  <i className="material-icons">arrow_upward</i>
                </button>
                <p className="grey-text">{post.votes}</p>
                <button
                  className="btn-floating btn-small waves-effect waves-light red"
                  onClick={this.downVote}
                >
                  <i className="material-icons">arrow_downward</i>
                </button>
              </div>
            </div>
            <div className="col m11 l10">
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
          </div>
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

const mapDispatchToProps = dispatch => {
  return {
    addVote: (post, vote) => dispatch(addVote(post, vote))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(["posts"])
)(PostDetails);
