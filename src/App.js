import React from "react";
import { Router } from "react-router-dom";
import Routes from "./Routes";

import history from "./history";
import { AuthProvider } from "./context/auth.context";
function App() {
  return (
    <AuthProvider>
      <Router history={history}>
        <Routes />
      </Router>
    </AuthProvider>
  );
}

export default App;
