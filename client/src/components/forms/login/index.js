import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "utils/Firebase";
import ForgotPassword from "components/popup/forgotpassword";

const validEmailRegex = email => /^[^@ ]+@[^@ ]+\.[^@ \.]+$/.test(email);

function LoginForm() {
  const firebase = useContext(FirebaseContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [passwordPopup, setPasswordPopup] = useState(false);

  const validateEmail = () => {
    let valid = true;
    if (!validEmailRegex(email)) {
      setEmailError("Not a well formed email address.");
      valid = false;
    }
    if (email.length == 0) {
      setEmailError("This field is required");
      valid = false;
    }
    return valid;
  };

  const validatePassword = () => {
    let valid = true;
    if (password.length == 0) {
      setPasswordError("This field is required");
      valid = false;
    }
    return valid;
  };

  const validateForm = () => {
    var result1 = validateEmail();
    var result2 = validatePassword();
    if (!result1 || !result2) {
      return false;
    }
    return true;
  };

  const inputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    if (name == "email") {
      setEmail(value);
    } else if (name == "password") {
      setPassword(value);
    }
  };

  const submitForm = event => {
    event.preventDefault();
    if (validateForm() == false) {
      console.log("Invalid Form");
    } else {
      setEmailError("");
      setPasswordError("");
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
  const resetPassword = event => {
    event.preventDefault();
    setEmailError("");
    setPasswordError("");
    if (validateEmail()) {
      firebase
        .doPasswordReset(email)
        .then(function() {
          setPasswordPopup(true);
        })
        .catch(function(error) {
          if (error.code == "auth/user-not-found") {
            setEmailError("User not found");
          } else {
            console.log(error);
          }
        });
      console.info("Valid Form");
    } else {
      console.error("Invalid Form");
    }
  };

  return (
    <div>
      <form>
        <div>
          <h1>Login</h1>
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
        <button type="submit" onClick={e => resetPassword(e)}>
          Forgot your password?
        </button>
        <button type="submit" onClick={e => submitForm(e)}>
          Login
        </button>
        <div>
          <Link to="/register">Don't have an account?</Link>
        </div>
      </form>
      {passwordPopup ? <ForgotPassword setPopup={setPasswordPopup} /> : null}
    </div>
  );
}

export default LoginForm;
