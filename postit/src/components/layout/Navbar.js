import React, { Component } from "react";
import { Link } from "react-router-dom";
import Loggedin from "./Loggedin";
import Loggedout from "./Loggedout";
import { connect } from 'react-redux';

class Navbar extends Component {
  render() {
    console.log("props:",this.props)
    const { auth, profile } = this.props
    const  links  = auth.uid ? <Loggedin profile={ profile } /> : <Loggedout />;
    return (
      <nav className="nav-wrapper grey darken-3">
        <div className="container">
          <Link to="/" className="brand-logo">
            postIT
          </Link>
          { auth.isLoaded && links }
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}
export default connect(mapStateToProps,null)(Navbar);
