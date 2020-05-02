import React, { useState, useContext } from "react";
import { FirebaseContext } from "utils/Firebase";
import { Link } from "react-router-dom";

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

function RegisterForm() {
  const firebase = useContext(FirebaseContext);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateForm = () => {
    let valid = true;

    //username
    let validUserName = validUserNameRegex(userName);
    if (validUserName !== "valid") {
      setUserNameError(validUserName);
      valid = false;
    }
    //email
    if (!validEmailRegex(email)) {
      setEmailError("Not a well formed email address.");
      valid = false;
    }
    //password
    if (password != confirmPassword) {
      valid = false;
      setPasswordError("Passwords must match");
    } else if (password.length < 8) {
      valid = false;
      setPasswordError("Passwords must be at least 8 characters");
    }

    //empty field
    if (userName.length == 0) {
      setUserNameError("This field is required");
      valid = false;
    }
    if (email.length == 0) {
      setEmailError("This field is required");
      valid = false;
    }
    if (password.length == 0) {
      setPasswordError("This field is required");
      valid = false;
    }

    return valid;
  };

  const inputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    if (name == "username") {
      setUserName(value);
    } else if (name == "email") {
      setEmail(value);
    } else if (name == "password") {
      setPassword(value);
    } else if (name == "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const submitForm = event => {
    setUserNameError("");
    setEmailError("");
    setPasswordError("");

    event.preventDefault();
    if (validateForm() == false) {
      console.log("Invalid Form");
    } else {
      firebase
        .doSignInWithEmailAndPassword(email, password)
        .catch(function(error) {
          if (error.code == "auth/user-not-found") {
            setEmailError("User not found");
          } else if (error.code == "auth/wrong-password") {
            setPasswordError("Invalid Password");
          } else {
            console.log(error);
          }
        });

      console.log("Valid Form");
    }
  };

  return (
    <div>
      <form>
        <div>
          <h1>Create Account</h1>
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
            type="email"
            name="email"
            value={email}
            onChange={inputChange}
            required
          />
          {emailError.length > 0 && <span className="error">{emailError}</span>}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
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
          Continue
        </button>
        <div>
          <Link to="/login">Already have an account?</Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
