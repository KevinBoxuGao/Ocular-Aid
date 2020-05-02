import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Manage from "./manage";
import AccountForm from "components/forms/account";

function Account() {
  return (
    <Switch>
      <Route exact path="/account">
        <Redirect to="/account/manage" />
      </Route>
      <Route path="/account/manage" component={Manage} />
      <Route path="/account/edit" component={AccountForm} />
    </Switch>
  );
}

export default Account;
