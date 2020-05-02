import React, { useContext } from "react";
import { FirebaseContext } from "utils/Firebase";
import { useSession } from "utils/auth";
import { Link } from "react-router-dom";

function Manage() {
  const firebase = useContext(FirebaseContext);
  const user = useSession();
  const name = user.displayName;
  const email = user.email;
  //const photoUrl = user.photoURL;

  const logOut = () => {
    firebase.doSignOut();
  };

  return (
    <div>
      <div>
        <div>Username</div>
        <div>{name}</div>
        <div>Email</div>
        <div>{email}</div>
        <Link to="/account/edit">Edit</Link>
      </div>
      <button onClick={() => logOut()}>logout</button>
    </div>
  );
}

export default Manage;
