import React from "react";
import PropTypes from "prop-types";
import "./ForgotPassword.scss";

function ForgotPassword(props) {
  return (
    <div>
      <button onClick={() => props.setPopup(false)}>Okay</button>
    </div>
  );
}

ForgotPassword.propTypes = {
  setPopup: PropTypes.func.isRequired
};

export default ForgotPassword;
