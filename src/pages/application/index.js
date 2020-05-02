import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { useSession } from "utils/auth";

import Nav from "components/nav/application";
import Home from "./home";
import Account from "./account";

function Application() {
  const user = useSession();

  return (
    <div>
      {user ? (
        <div>
          <Nav />
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route path="/account" component={Account} />
          </Switch>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
}

export default Application;
