import React from 'react';
import { BrowserRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import logo from './logo.svg';
import './App.css';
import LayoutRoute from './components/Layout/LayoutRoute';

import LandingPage from './components/Layout/LandingPage';
import Login from './components/Pages/Login';
import SignUp from './components/Pages/SignUp';
import BoardPageFunc from './components/Pages/BoardPageFunc';
const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/home/" >
            <LandingPage/>
          </Route>
          <Route exact path="/login/" >
            <Login/>
          </Route>
          <Route exact path="/signup/" >
            <SignUp/>
          </Route>
          <Route path="/boards/:id" children={<BoardPageFunc/>}/>
          <Route exact path="/" >
            <Login/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
