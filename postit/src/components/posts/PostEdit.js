import React, { Component } from "react";
import { connect } from "react-redux";
import { updatePost } from "../../store/actions/postActions";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class PostEdit extends Component {
  state = {
    title: "",
    content: "",
    imageurl: "",
    videourl: ""
  };
  handleChange = e => {
    this.setState({
      ...this.props.post,
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.updatePost(this.state, this.props.id);
    this.props.history.push(`/post/${this.props.id}`);
  };
  cancelUpdate = e => {
    this.props.history.push(`/post/${this.props.id}`);
  };

  render() {
    const { post } = this.props;
    console.log("update", post);
    if (post) {
      return (
        <div className="container padding">
          <form onSubmit={this.handleSubmit} className="updatePost">
            <h5 className="white-text text-darken-3">Update post</h5>
            <div className="row">
              <div className="input-field col s6">
                <label htmlFor="title"></label>
                <input
                  type="text"
                  data-length="300"
                  id="title"
                  className="title white-text"
                  onChange={this.handleChange}
                  // placeholder="Title"
                  defaultValue={post.title}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field">
                <label htmlFor="content"></label>
                <textarea
                  type="text"
                  id="content"
                  className="materialize-textarea white-text"
                  onChange={this.handleChange}
                  placeholder="Text(optional)"
                  defaultValue={post.content}
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field">
                <label htmlFor="content"></label>
                <textarea
                  type="text"
                  id="imageurl"
                  className="materialize-textarea white-text"
                  onChange={this.handleChange}
                  placeholder="Image url (optional)"
                  defaultValue={post.imageurl}
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field">
                <label htmlFor="content"></label>
                <textarea
                  type="text"
                  id="videourl"
                  className="materialize-textarea white-text"
                  onChange={this.handleChange}
                  placeholder="Video url(optional)"
                  defaultValue={post.videourl}
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field">
                <button className="btn blue lighten-1 blue z-depth-0">
                  Update
                </button>
                <button
                  className="btn blue lighten-1 blue z-depth-0"
                  onClick={this.cancelUpdate}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div className="container center ">
          <p>Loading post...</p>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("upState", state);
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
    updatePost: (post, id) => dispatch(updatePost(post, id))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(["posts"])
)(PostEdit);
