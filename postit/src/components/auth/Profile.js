import React, { Component } from "react";
import PostList from "../posts/PostList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { noPhoto } from "../../images/noPhoto.png";

class Profile extends Component {
  getPhoto = photoURL => {
    if (!photoURL) {
      return noPhoto;
    }
    return photoURL;
  };
  render() {
    const { posts, auth } = this.props;
    if (!auth.uid) return <Redirect to="/login" />;
    let userPosts = [];
    if (posts) {
      for (let i = 0; i < posts.length; i++) {
        if (auth.uid === posts[i].authorId) {
          userPosts.push(posts[i]);
        }
      }
    }
    return (
      <div className="profile">
        <div className="row">
          <div className="col s12 m6">
            <PostList posts={userPosts} />
          </div>
          {/* <div className="col s4 m2 offset-m1">
            <div className="card right">
              <div className="card-image">
                <a
                  src={this.getPhoto(auth.photoURL)}
                  alt=""
                  href="/"
                  className="btn-floating halfway-fab waves-effect waves-light center"
                >
                  {profile.initials}
                </a>
              </div>
              <div className="card-content">
                <p>
                  {profile.firstName} {profile.lastName}
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("Profile State", state);
  return {
    posts: state.firestore.ordered.posts,
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "posts", orderBy: ["createdAt", "desc"] }])
)(Profile);
