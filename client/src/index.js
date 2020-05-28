/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import PrivateRoute from "./private-route/PrivateRoute";

// import { Auth0Provider } from "./react-auth0-spa";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Landing from "./views/Landing.js";
import ForgotPassword from "./views/ForgotPassword";
import Login from "./views/Login.js";
import Signup from "./views/Signup.js";
import ExtensionIframe from "./views/ExtensionIframe.js";

// import Signup from "./auth/Signup";
// import Login from "./auth/Login";

import OurData from "./views/OurData.js";
import Features from "./views/Features.js";
import NotFound from "./views/NotFound.js";
import Contact from "./views/Contact.js";
import Privacy from "./views/Privacy.js";
import Terms from "./views/Terms.js";

import "./assets/scss/black-dashboard-react.scss";
import "./assets/demo/demo.css";
import "./assets/css/nucleo-icons.css";
//
// import 'views/landingTheme/css/responsive.css';
// import 'views/landingTheme/style.css';

// import 'views/landingTheme/js/jquery-2.2.4.min.js';
// import 'views/landingTheme/js/popper.min.js';
// import 'views/landingTheme/js/bootstrap.min.js';
// import 'views/landingTheme/js/plugins.js';
// import 'views/landingTheme/js/slick.min.js';
// import 'views/landingTheme/js/footer-reveal.min.js';
// import 'views/landingTheme/js/active.js';

import config from "./auth_config.json";
import history from "./utils/history";
const hist = createBrowserHistory();

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "/log-in";
  }
}

ReactDOM.render(
  <Provider store={store}>
  <Router history={hist}>
    <Switch>
      <Route exact path="/landing" render={props => <Landing />} />
      <Route exact path="/forgot-password" render={props => <ForgotPassword />} />
      <Route exact path="/extension-iframe" render={props => <ExtensionIframe />} />
      {/* <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} /> */}
       <Route exact path="/log-in" render={props => <Login />} />
      <Route exact path="/sign-up" render={props => <Signup />} />

      <Route exact path="/data" render={props => <OurData />} />
      <Route exact path="/features" render={props => <Features />} />
      <Route exact path="/not-found" render={props => <NotFound />} />
      <Route exact path="/contact" render={props => <Contact />} />
      <Route exact path="/privacy" render={props => <Privacy />} />
      <Route exact path="/terms" render={props => <Terms />} />

      <Redirect exact from="/" to="/landing" />

      <PrivateRoute path="/" />

      <Redirect from="*" to="/not-found"/>

    </Switch>
  </Router></Provider>,
  document.getElementById("root")
);
