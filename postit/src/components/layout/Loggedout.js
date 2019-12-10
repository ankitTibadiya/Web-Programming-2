import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Loggedout extends Component {
  render() {
    return (
      <ul className="right">
        <li>
          <NavLink to="/register">Register</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    );
  }
}

export default Loggedout;
