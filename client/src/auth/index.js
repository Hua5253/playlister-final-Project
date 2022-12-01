import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "./auth-request-api";

const AuthContext = createContext();
// console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
  GET_LOGGED_IN: "GET_LOGGED_IN",
  LOGIN_USER: "LOGIN_USER",
  LOGOUT_USER: "LOGOUT_USER",
  REGISTER_USER: "REGISTER_USER",
  ERROR_OCCUR: "ERROR_OCCUR",
  HIDE_MODE: "HIDE_MODE",
};

function AuthContextProvider(props) {
  const [auth, setAuth] = useState({
    user: null,
    loggedIn: false,
    error: { is_error: false, errorMessage: "" },
  });
  const history = useHistory();

  useEffect(() => {
    auth.getLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authReducer = action => {
    const { type, payload } = action;
    switch (type) {
      case AuthActionType.GET_LOGGED_IN: {
        return setAuth({
          user: payload.user,
          loggedIn: payload.loggedIn,
        });
      }
      case AuthActionType.LOGIN_USER: {
        return setAuth({
          user: payload.user,
          loggedIn: true,
        });
      }
      case AuthActionType.LOGOUT_USER: {
        return setAuth({
          user: null,
          loggedIn: false,
        });
      }
      case AuthActionType.REGISTER_USER: {
        return setAuth({
          user: payload.user,
          loggedIn: true,
        });
      }
      case AuthActionType.ERROR_OCCUR: {
        return setAuth({
          user: null,
          loggedIn: false,
          error: {
            is_error: payload.is_error,
            errorMessage: payload.errorMessage,
          },
        });
      }
      case AuthActionType.HIDE_MODE: {
        return setAuth({
          user: null,
          loggedIn: false,
          error: {
            is_error: false,
            errorMessage: "",
          },
        });
      }
      default:
        return auth;
    }
  };

  auth.getLoggedIn = async function () {
    const response = await api.getLoggedIn();
    if (response.status === 200) {
      authReducer({
        type: AuthActionType.SET_LOGGED_IN,
        payload: {
          loggedIn: response.data.loggedIn,
          user: response.data.user,
        },
      });
    }
  };

  auth.registerUser = async function (
    userName,
    firstName,
    lastName,
    email,
    password,
    passwordVerify
  ) {
    try {
      const response = await api.registerUser(
        userName,
        firstName,
        lastName,
        email,
        password,
        passwordVerify
      );
      if (response.status === 200) {
        authReducer({
          type: AuthActionType.REGISTER_USER,
          payload: {
            user: response.data.user,
          },
        });
        history.push("/login");
      }
    } catch (error) {
      let errorMessage = error.response.data.errorMessage;
      authReducer({
        type: AuthActionType.ERROR_OCCUR,
        payload: {
          is_error: true,
          errorMessage: errorMessage,
        },
      });
    }
  };

  auth.loginUser = async function (email, password) {
    try {
      const response = await api.loginUser(email, password);
      if (response.status === 200) {
        authReducer({
          type: AuthActionType.LOGIN_USER,
          payload: {
            user: response.data.user,
          },
        });
        history.push("/");
      }
    } catch (error) {
      let errorMessage = error.response.data.errorMessage;
      authReducer({
        type: AuthActionType.ERROR_OCCUR,
        payload: {
          is_error: true,
          errorMessage: errorMessage,
        },
      });
    }
  };

  auth.logoutUser = async function () {
    const response = await api.logoutUser();
    if (response.status === 200) {
      authReducer({
        type: AuthActionType.LOGOUT_USER,
        payload: null,
      });
      history.push("/");
    }
  };

  auth.getUserInitials = function () {
    let initials = "";
    if (auth.user) {
      initials += auth.user.firstName.charAt(0);
      initials += auth.user.lastName.charAt(0);
    }
    // console.log("user initials: " + initials);
    return initials;
  };

  auth.getUserName = function() {
    if (auth.user) return auth.user.userName;
    return null;
  }

  auth.hideMode = function () {
    authReducer({
      type: AuthActionType.HIDE_MODE,
      payload: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
