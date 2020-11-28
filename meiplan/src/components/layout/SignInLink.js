import React from "react";
import { NavLink } from "react-router-dom";
import "./signlink.scss";

const SignInLink = () => {
  return (
    <ul className="sign-link">
      <li>
        <NavLink to="/createproject">New Project</NavLink>
      </li>
      <li>
        <NavLink to="/">Log Out</NavLink>
      </li>
      <li>
        <NavLink to="/" className="btn member">
          NN
        </NavLink>
      </li>
    </ul>
  );
};

export default SignInLink;
