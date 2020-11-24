import React from "react";
import { NavLink } from "react-router-dom";
import "./signlink.scss";

const SignOutLink = () => {
  return (
    <ul className="sign-link">
      <li>
        <NavLink to="/">Signup</NavLink>
      </li>
      <li>
        <NavLink to="/">Login</NavLink>
      </li>
    </ul>
  );
};

export default SignOutLink;
