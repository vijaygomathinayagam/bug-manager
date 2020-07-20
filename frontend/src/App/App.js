import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "../_common/PrivateRoute";
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";
import "./App.css";

function App() {
  return (
    <div className="body-container">
      <Dashboard />
      {/* <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <Route path="/">
            <Redirect to="/dashboard" />
          </Route>
        </Switch>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
