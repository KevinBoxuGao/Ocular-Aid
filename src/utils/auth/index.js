import React, { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "utils/Firebase";

export const userContext = React.createContext({
  user: null
});

export const useSession = () => {
  const { user } = useContext(userContext);
  return user;
};

export const useAuth = () => {
  const firebase = useContext(FirebaseContext);

  const [state, setState] = useState(() => {
    const user = firebase.auth.currentUser;
    return { initializing: !user, user };
  });
  function onChange(user) {
    setState({ initializing: false, user });
  }

  useEffect(() => {
    // listen for auth state changes
    const unsubscribe = firebase.auth.onAuthStateChanged(onChange);
    // unsubscribe to the listener when unmounting
    return () => unsubscribe();
  }, []);

  return state;
};

/*
const AuthInitialState = {
  is_authenticated: false,
  profile: null
};

const AuthReducer = (state = AuthInitialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        is_authenticated: true,
        profile: action.payload
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        is_authenticated: false
      };
    case "LOGOUT_SUCCESS":
      return {
        is_authenticated: false,
        profile: null
      };
    case "LOGOUT_FAILURE":
      return {
        ...state
      };
    case "REGISTER_SUCCESS":
      return {
        is_authenticated: true,
        profile: action.payload
      };
    case "REGISTER_FAILURE":
      return {
        ...state
      };
    default:
      return state;
  }
};

export const AuthContextProvider = props => {
  const auth = useContext(FirebaseContext);
  const [state, dispatch] = useReducer(AuthReducer, AuthInitialState);

  const handleLogin = (email, password) => {
    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            profile: auth.getProfile()
          }
        })
      )
      .catch(function(error) {
        dispatch({ type: "LOGIN_FAILURE" });
        throw new Error(error);
      });
  };
  const handleRegister = (email, password, userName) => {
    auth
      .doCreateUserWithEmailAndPassword(email, password, userName)
      .then(
        dispatch({
          type: "REGISTER_SUCCESS",
          payload: {
            profile: auth.getProfile()
          }
        })
      )
      .catch(function(error) {
        dispatch({ type: "REGISTER_FAILURE" });
        console.log("auth error");
        throw new Error("Something failed");
      });
  };
  const handleLogout = () => {
    auth
      .doSignOut()
      .then(function() {
        dispatch({ type: "LOGOUT_SUCCESS" });
      })
      .catch(function(error) {
        dispatch({ type: "LOGOUT_FAILURE" });
        throw new Error(error);
      });
  };

  useEffect(() => {
    const unsubscribe = auth.auth.onAuthStateChanged(authUser => {
      authUser
        ? dispatch({
            type: "LOGIN_SUCCESS",
            payload: {
              profile: authUser
            }
          })
        : dispatch({ type: "LOGOUT_SUCCESS" });
    });
    return () => unsubscribe();
  });

  return (
    <div>
      <AuthContext.Provider
        value={{
          authState: state.is_authenticated,
          profileState: state.profile,
          handleUserLogin: (email, password) => handleLogin(email, password),
          handleUserRegister: (email, password, userName) =>
            handleRegister(email, password, userName),
          handleUserLogout: () => handleLogout()
        }}
      >
        {props.children}
      </AuthContext.Provider>
    </div>
  );
};
*/
