import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { FirebaseContext } from "utils/Firebase";
import { Link } from "react-router-dom";
import { useSession } from "utils/auth";

const validUserNameRegex = username => {
  if (6 > username.length || username.length > 16) {
    return "Username must be 6-16 characters";
  } else if (!/^[a-zA-Z0-9]{6,17}$/.test(username)) {
    return "Username must contain alphanumeric characters";
  } else {
    return "valid";
  }
};

const validEmailRegex = email => /^[^@ ]+@[^@ ]+\.[^@ \.]+$/.test(email);

function AccountForm() {
  const user = useSession();

  const firebase = useContext(FirebaseContext);
  const [redirect, setRedirect] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);

  //const [profilePicture, setProfilePicture] = useState(user.photoURL);
  const [userName, setUserName] = useState(user.displayName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [popupMessage, setPopupMessage] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateForm = () => {
    let valid = true;

    //username
    let validUserName = validUserNameRegex(userName);
    if (validUserName !== "valid") {
      if (userName !== user.displayName) {
        setUserNameError(validUserName);
        valid = false;
      }
    }
    //email
    //if (!validEmailRegex(email)) {
    //  if (email !== user.email) {
    //    setEmailError("Not a well formed email address.");
    //    valid = false;
    //  }
    //}
    //password
    if (password.length > 0) {
      if (password !== confirmPassword) {
        valid = false;
        setPasswordError("Passwords must match");
      } else if (password.length < 8) {
        valid = false;
        setPasswordError("Passwords must be at least 8 characters");
      }
    }
    return valid;
  };

  const submitForm = event => {
    setUserNameError("");
    //setEmailError("");
    setPasswordError("");

    event.preventDefault();
    if (validateForm() == false) {
      console.log("Invalid Form");
    } else {
      //let emailChange = email !== user.email;
      let passwordChange = password.length > 0;
      let errorState = false;

      //if (emailChange) {
      //  firebase.auth.currentUser.updateEmail(email).catch(function(error) {
      //    errorState = true;
      //    if (error.code === "auth/requires-recent-login") {
      //      setEmailError(
      //        "This operation requires recent authentication. Please log in again"
      //      );
      //    }
      //  });
      //}

      if (passwordChange) {
        firebase.auth.currentUser
          .updatePassword(password)
          .catch(function(error) {
            console.log(error);
            if (error.code === "auth/requires-recent-login") {
              setPasswordError(
                "This operation requires recent authentication. Please log in again"
              );
            } else {
              setPasswordError("Something went wrong");
            }
            errorState = true;
          });
      }

      firebase.auth.currentUser
        .updateProfile({
          displayName: userName
          //photoURL: profilePicture
        })
        .then(function() {
          if (!errorState) {
            setRedirect(true);
          }
        })
        .catch(function(error) {
          console.log(error);
          if (error.code === "auth/too-many-requests") {
            setPopupMessage(
              "Too many requests from this device. Try again later"
            );
          } else if (error.code === "auth/network-request-failed") {
            setPopupMessage("Oops, something went wrong with your request");
          } else {
            setPopupMessage("Something went wrong");
          }
          setErrorPopup(true);
        });
    }
  };

  const inputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    if (name == "username") {
      setUserName(value);
    } else if (name == "email") {
      setEmail(value);
    } else if (name == "changePassword") {
      setPassword(value);
    } else if (name == "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  if (redirect) {
    return <Redirect to="/account/manage" />;
  }

  return (
    <div>
      {errorPopup ? (
        <div>
          {popupMessage}
          <button onClick={() => setErrorPopup(false)}>okay</button>
        </div>
      ) : null}
      <form>
        <div>
          <label>Username</label>
          <input
            type="username"
            name="username"
            value={userName}
            onChange={inputChange}
            required
          />
          {userNameError.length > 0 && (
            <span className="error">{userNameError}</span>
          )}
        </div>
        <div>
          <label>Email</label>
          <input
            disabled
            type="email"
            name="email"
            value={email}
            onChange={inputChange}
            required
          />

          {emailError.length > 0 && <span className="error">{emailError}</span>}
        </div>
        <div>
          <label>Change Password</label>
          <input
            type="password"
            name="changePassword"
            value={password}
            onChange={inputChange}
            required
          />
          {passwordError.length > 0 && (
            <span className="error">{passwordError}</span>
          )}
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={inputChange}
            required
          />
        </div>
        <button type="submit" onClick={e => submitForm(e)}>
          Save
        </button>
        <div>
          <Link to="/account/manage">Cancel</Link>
        </div>
      </form>
    </div>
  );
}

export default AccountForm;
