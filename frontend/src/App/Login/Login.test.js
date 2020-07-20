import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Login from "./Login";
import LoginStatusUtility from "../../_common/LoginStatusUtility";

let isLoggedInBackup = LoginStatusUtility.isLoggedIn;

beforeEach(() => {
  LoginStatusUtility.isLoggedIn = jest.fn(() => false);
});

afterEach(() => {
  LoginStatusUtility.isLoggedIn = isLoggedInBackup;
});

test("renders login component", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  const bugManagerH1Element = getByTestId("bugmanager-h1");
  const loginH2Element = getByTestId("login-h2");
  const googleSignInLoadingElement = getByTestId("google-signin-loading");

  expect(bugManagerH1Element).toBeInTheDocument();
  expect(bugManagerH1Element).toHaveTextContent("Bug Manager");
  expect(loginH2Element).toBeInTheDocument();
  expect(loginH2Element).toHaveTextContent("Login");
  expect(googleSignInLoadingElement).toBeInTheDocument();
});
