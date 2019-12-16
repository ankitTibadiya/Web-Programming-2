import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import moment from "moment";
import { addVote, deletePost } from "../../store/actions/postActions";
import CreateComment from "../comments/CreateComment";
import CreateDetails from "../comments/CommentDetails";
import { Redirect, Link } from "react-router-dom";

class PostDetails extends Component {
  upVote = e => {
    console.log("POstSumma", this.props.id, this.props.post.votes);
    e.preventDefault();
    this.props.addVote(this.props.id, this.props.post.votes + 1);
    // this.refs.btn1.setAttribute("disabled","disabled")
  };
  downVote = e => {
    e.preventDefault();
    this.props.addVote(this.props.id, this.props.post.votes - 1);
    // this.refs.btn.setAttribute("disabled","disabled")
  };
  deletePost = e => {
    e.preventDefault();
    this.props.deletePost(this.props.id);
    return <Redirect to="/" />;
  }
  renderImage =()=>{
    if (this.props.post.imageurl==""){
      return null;
    }
    else {
      return (
        <div className='img-style'>
          <img src={this.props.post.imageurl} width="420" height="311"/>
        </div>
      );
    } 
  };
  renderVideo =()=>{
    if (this.props.post.videourl==""){
      return null;
    }
    else {
      return (
        <div >
          <iframe width="420" height="315" src={this.props.post.videourl}>Video</iframe>
        </div>
      );
    } 
  };
  editPost = e => {
    e.preventDefault();
    this.props.history.push(`/postEdit/${this.props.id}`)
  };
  render() {
    const { post, userId } = this.props;

    if (post) {
      let editButton = null;
      let deleteButton = null;
      if (userId === post.authorId) {
        deleteButton = (
          <button
            ref="btn"
            className="btn-floating btn-small waves-effect waves-light grey right"
            onClick={this.deletePost}
          >
            <i className="material-icons">delete</i>
          </button>
        );
        editButton = (
          <button
            ref="btn"
            className="btn-floating btn-small waves-effect waves-light grey right"
            style={{ marginRight: "10px" }}
            onClick={this.editPost}
          >
            <i className="material-icons">edit</i>
          </button>
        );
      }
      return (
        <div className="container section post-details">
          <div className="row">
            <div className="col m1 l1">
              <div className="action">
                <button
                  ref="btn1"
                  className="btn-floating btn-small waves-effect waves-light green"
                  onClick={this.upVote}
                >
                  <i className="material-icons">arrow_upward</i>
                </button>
                <p className="white-text" style={{ position:"relative", marginLeft:"10px" }}>
                  {"  "}
                  {post.votes}
                </p>

                <button
                  ref="btn"
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
                  <span className="card-title">
                    {post.title}
                    {deleteButton}
                    {editButton}
                  </span>
                  {this.renderImage()}
                  <br>
                  </br>
                  {this.renderVideo()}
                  <p className="card-content">{post.content}</p>
                  <div className="white-text lighten-2">
                    Posted by {post.authorFirstName} {post.authorLastName}
                  </div>
                  <div className="white-text lighten-2">
                    {" "}
                    {moment(post.createdAt.toDate()).calendar()}
                  </div>
                </div>
                {/* <div className="card-action white-text text-darken-3"> */}

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
  const userId = state.firebase.auth.uid;
  return {
    post: post,
    id: id,
    userId: userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addVote: (post, vote) => dispatch(addVote(post, vote)),
    deletePost: post => dispatch(deletePost(post))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(["posts"])
)(PostDetails);
