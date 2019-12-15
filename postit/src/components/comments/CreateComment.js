import React, { Component } from "react";
import { connect } from "react-redux";
import createComment from "../../store/actions/commentActions";
// import { firestoreConnect } from "react-redux-firebase";

class CreateComment extends Component {
  state = {
    content: "",
    votes: 0
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.createComment(this.state, this.props.id);
    this.setState((state, props) => ({
      state: ""
    }));
    // this.props.history.push("/post/",this.props.id);
  };
  render() {
    return (
      <div className="container newComment">
        <form onSubmit={this.handleSubmit} className="newComment">
          <div className="row">
            <div className="input-field">
              <label htmlFor="content"></label>
              <textarea
                type="text"
                id="content"
                className="materialize-textarea white-text"
                onChange={this.handleChange}
                placeholder="Add a comment here..."
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="input-field">
              <button className="btn blue lighten-1 blue z-depth-0">
                Comment
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
    createComment: (comment, id) => dispatch(createComment(comment, id))
  };
};
export default connect(null, mapDispatchToProps)(CreateComment);
