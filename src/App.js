import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import LayoutRoute from './components/Layout/LayoutRoute';

import LandingPage from './components/Layout/LandingPage';
const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={getBasename()}>
        <Switch>
          <LayoutRoute
            exact
            path="/"
            component={LandingPage}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
