import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import "./App.scss";

//pages
import Loading from "pages/loading";
import Landing from "pages/landing";
import Login from "pages/login";
import Application from "pages/application";
import GenericNotFound from "pages/pagenotfound";

//auth
import { useAuth, userContext } from "utils/auth";

//function component
function App() {
  const { initializing, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [timerComplete, setTimer] = useState(false);

  useEffect(() => {
    if (!initializing && timerComplete) {
      setLoading(false);
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimer(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <TransitionGroup>
      {loading ? (
        <CSSTransition key="loading-screen" timeout={500} classNames="loading">
          <Loading />
        </CSSTransition>
      ) : (
        <userContext.Provider value={{ user }}>
          <Router>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/(login|register)/" component={Login} />
              <Route path="/(home|account)/" component={Application} />
              <Route path="/404" component={GenericNotFound} />
              <Redirect to="/404" />
            </Switch>
          </Router>
        </userContext.Provider>
      )}
    </TransitionGroup>
  );
}

export default App;
