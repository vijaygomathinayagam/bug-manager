import React from 'react';
import { render } from '@testing-library/react';
import App from '../App/App';

test('renders learn react link', () => {
  const { getByTestId } = render(<App />);
  const bugManagerH1Element = getByTestId('bugmanager-h1');
  const loginH2Element = getByTestId('login-h2');
  const googleSignInButtonElement = getByTestId('google-singin-button');
  
  expect(bugManagerH1Element).toBeInTheDocument();
  expect(bugManagerH1Element).toHaveTextContent('Bug Manager');
  expect(loginH2Element).toBeInTheDocument();
  expect(loginH2Element).toHaveTextContent('Login');
  expect(googleSignInButtonElement).toBeInTheDocument();
});
