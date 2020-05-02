import React from "react";
import { Link } from "react-router-dom";
import "./Application.scss";

function Nav() {
  return (
    <div>
      <Link to="/home">Home</Link>
      <Link to="/account/manage">Account</Link>
    </div>
  );
}

export default Nav;
