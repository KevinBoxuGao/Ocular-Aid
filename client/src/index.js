import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import Firebase, { FirebaseContext } from "utils/Firebase";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
