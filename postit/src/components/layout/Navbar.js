import React, { Component } from "react";
import { Link } from "react-router-dom";
import Loggedin from "./Loggedin";
import Loggedout from "./Loggedout";
import { connect } from "react-redux";
import postIticon from "./postIt.png";

class Navbar extends Component {
  render() {
    const { auth, profile } = this.props;
    const links = auth.uid ? <Loggedin profile={profile} /> : <Loggedout />;
    return (
      <nav className="nav-wrapper transparent">
        <div className="container">
          <Link to="/" className="brand-logo">
            <img
              src={postIticon}
              alt="icon"
              className="circle responsive-img"
              height="35px"
              width="35px"
            />{" "}
            postIT
          </Link>
          {auth.isLoaded && links}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};
export default connect(mapStateToProps, null)(Navbar);
