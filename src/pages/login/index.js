import React from "react";
import { Redirect, Switch, Route, withRouter } from "react-router-dom";
import { useSession } from "utils/auth";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import "./Login.scss";
import LoginForm from "components/forms/login";
import RegisterForm from "components/forms/register";

function Login({ location }) {
  const user = useSession();

  return (
    <div>
      {user ? (
        <Redirect to="/home" />
      ) : (
        <div>
          <div>nav</div>
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="fade" timeout={300}>
              <div className="login-container">
                <Switch location={location}>
                  <Route exact path="/login" component={LoginForm} />
                  <Route exact path="/register" component={RegisterForm} />
                </Switch>
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>
      )}
    </div>
  );
}

export default withRouter(Login);
