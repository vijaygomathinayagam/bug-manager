import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "../_common/PrivateRoute";
import Login from "../Login/Login";
import Dashboard from "./Dashboard/Dashboard";
import "./App.css";

function App() {
  return (
    <div className="body-container">
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/app">
            <Dashboard />
          </PrivateRoute>
          <Route path="/">
            <Redirect to="/app" />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
