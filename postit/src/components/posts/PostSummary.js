import React,{ Component } from "react";
import moment from "moment";

class PostSummary extends Component {
  render() {
    const { post }  = this.props;
    return (
      <div className="card z-depth-0 post-summary">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title">{post.title}</span>
          <p>
            Posted by {post.authorFirstName} {post.authorLastName}
          </p>
          <p className="grey-text">
            {moment(post.createdAt.toDate()).calendar()}
          </p>
        </div>
        <div className="card-action">
          <i className="material-icons" onClick={this.handleSubmit}>
            arrow_upward
          </i>
          <p className="grey-text">{post.votes}</p>
          <i className="material-icons">arrow_downward</i>
        </div>
      </div>
    );
  }
}

export default PostSummary;
