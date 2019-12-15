import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/actions/authActions";

class Loggedin extends Component {
  render() {
    const { logout } = this.props;
    return (
      <ul className="right">
        
        <li>
          <NavLink to="/createpost" >New Post</NavLink>
        </li>
        <li>
          <NavLink to="/" onClick={logout}>
            Logout
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className="btn btn-floating blue lighten-1">
            {this.props.profile.initials}
          </NavLink>
        </li>
      </ul>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(null, mapDispatchToProps)(Loggedin);
