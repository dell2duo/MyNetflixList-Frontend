import React, { createContext } from "react";

import useAuth from "./hooks/useAuth";

const Context = createContext();

function AuthProvider({ children }) {
  const {
    loading,
    authenticated,
    user,
    API_KEY,
    LANG,
    perfil,
    handleLogin,
    handleLogOut,
    putMovie,
    handleProfile,
  } = useAuth();

  return (
    <Context.Provider
      value={{
        loading,
        authenticated,
        user,
        API_KEY,
        LANG,
        perfil,
        handleLogin,
        handleLogOut,
        putMovie,
        handleProfile,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
