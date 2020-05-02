import React from "react";
import { Link } from "react-router-dom";
import { useSession } from "utils/auth";

import "./Landing.scss";

function Landing() {
  const user = useSession();

  return (
    <div>
      <h1>landing</h1>
      {user ? <Link to="/home">Home</Link> : <Link to="/login">Login</Link>}
    </div>
  );
}

export default Landing;
