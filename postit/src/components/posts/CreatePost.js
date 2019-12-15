import React, { Component } from "react";
import { connect } from "react-redux";
import { createPost } from "../../store/actions/postActions";

class CreatePost extends Component {
  state = {
    title: "",
    content: "",
    votes: 0,
    imageurl: "",
    videourl: "",
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
      <div className="container padding">
        <form onSubmit={this.handleSubmit} className="newPost">
          <h5 className="white-text text-darken-3">Create a post</h5>
          <div className="row">
            <div className="input-field col s6">
              <label htmlFor="title"></label>
              <input
                type="text"
                data-length="300"
                id="title"
                className="title white-text"
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
                className="materialize-textarea white-text"
                onChange={this.handleChange}
                placeholder="Text(optional)"
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
              />
            </div>
          </div>
          <div className="row">
            <div className="input-field">
              <button className="btn blue lighten-1 blue z-depth-0">
                Post
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
