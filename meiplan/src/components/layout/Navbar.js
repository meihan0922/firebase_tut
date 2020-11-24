import React from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import SignInLink from "./SignInLink";
import SignOutLink from "./SignOutLink";

const Navbar = () => {
  return (
    <nav className="nav-wrapper">
      <div className="container">
        <Link to="/" className="brand-logo">
          MeiPlan
        </Link>
        <SignOutLink />
        <SignInLink />
      </div>
    </nav>
  );
};

export default Navbar;
