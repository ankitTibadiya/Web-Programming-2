import React, { Component } from "react";
import { connect } from "react-redux";
import createPost from "../../store/actions/postActions";

class CreatePost extends Component {
  state = {
    title: "",
    content: "",
    votes: 0,
    image: null,
    video: null,
    url: null
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.createPost(this.state);
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Create a post</h5>
          <div className="row">
            <div className="input-field col s6">
              <label htmlFor="title"></label>
              <input
                type="text"
                data-length="300"
                id="title"
                className="title"
                onChange={this.handleChange}
                placeholder="Title"
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
                className="materialize-textarea"
                onChange={this.handleChange}
                placeholder="Text(optional)"
              />
            </div>
          </div>
          <div className="row">
            <div className="input-field">
              <button className="btn blue lighten-1 blue z-depth-0">
                Post
              </button>
            </div>
            <div className="input-field">
              <button className="btn blue lighten-1 blue z-depth-0">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createPost: post => dispatch(createPost(post))
  };
};
export default connect(null, mapDispatchToProps)(CreatePost);
