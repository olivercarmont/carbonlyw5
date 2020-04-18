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
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";
import axios from 'axios';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";

import './loginTheme/vendor/bootstrap/css/bootstrap.min.css';
import './loginTheme/vendor/animate/animate.css';
import './loginTheme/vendor/css-hamburgers/hamburgers.min.css';
import './loginTheme/vendor/animsition/css/animsition.min.css';
import './loginTheme/vendor/select2/select2.min.css';
import './loginTheme/fonts/font-awesome-4.7.0/css/font-awesome.min.css';

// import './vendor/daterangepicker/daterangepicker.css';
import './loginTheme/css/util.css';
import './loginTheme/css/main.css';

import '../OwnCSS/login.css';

// import './Login_v3/index.html';

// import './vendor/jquery/jquery-3.2.1.min.js';
// import './vendor/animsition/js/animsition.min.js';
// import './vendor/bootstrap/js/popper.js';
// import './vendor/bootstrap/js/bootstrap.min.js';
// import './vendor/select2/select2.min.js';
// import './vendor/daterangepicker/moment.min.js';
// import './vendor/daterangepicker/daterangepicker.js';
// import './vendor/countdowntime/countdowntime.js';
// import './js/main.js';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Icon, InlineIcon } from '@iconify/react';
import homeIcon from '@iconify/icons-fa-solid/home';

// import { google } from "@fortawesome/fontawesome-free-brands";
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import history from "../utils/history";

class Login extends React.Component {
constructor(props) {
  super(props);
    this.state = {
      hidden: false,
      emailLogin: "",
      passwordLogin: "",
      errors: {}
    };
}
componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      window.location.href = "/log-in";
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      window.location.href = "/home";
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.emailLogin,
      password: this.state.passwordLogin,
    };

    this.props.loginUser(userData);
  };
render() {
  const { errors } = this.state;
    return (
      <>

        <div className="content disableScroll">
        <div className="limiter">
          <img className="login__backgroundImage" src={require("../assets/img/mainBackground.jpg") }/>
          <div className="container-login100">
            <div className={!this.state.hidden ? 'wrap-login100' : 'wrap-login100__hidden'}>
            <div id="login__redoOpacity">
              <form className="login100-form validate-form" noValidate onSubmit={this.onSubmit}>
              <div className="login__centerLogo">
                <img src={require("../assets/img/carbonlyWhiteLogo.png")} className="login__centralLogo"/>
              </div>

                <span className="login100-form-title p-b-34 p-t-27 login__signupAndLoginHeader">
                  Login <div className="login__signupHeader">/ <Link to="/sign-up" className="login__signupLinkHeader">Signup</Link></div>
                </span>

                <div className="login__socialLogin">

                <div className="login__googleButton"><FontAwesomeIcon className="login__googleIcon" icon={faGoogle} /> Google</div>

                <div className="login__facebookButton"><FontAwesomeIcon className="login__googleIcon" icon={faFacebookF} /> Facebook</div>

                </div>

                <div className="separator"> &nbsp; Or Login With Password  &nbsp;</div>

                <div className="wrap-input100 validate-input" data-validate="Enter Email">
                  <input className="input100" name="email" placeholder="Email" onChange={this.onChange}
                  value={this.state.emailLogin}
                  error={errors.email}
                  id="emailLogin"
                  type="email"
                   />

                  <span className="focus-input100" data-placeholder="&#xf191;"></span>
                </div>

                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>

                <div className="wrap-input100 validate-input" data-validate="Enter password">
                  <input className="input100" type="password" name="pass" placeholder="Password" onChange={this.onChange}
                  value={this.state.passwordLogin}
                  error={errors.password}
                  id="passwordLogin"
                  type="password"
                   />

                  <span className="focus-input100" data-placeholder="&#xf191;"></span>
                  <div className="login__forgotPassword">Forgot? &nbsp;🤯</div>
                </div>

                <span className="red-text">
                {errors.password}
                {errors.passwordincorrect}
              </span>



                <div className="login__eliminateSpacingBottomTop"></div>

                <div className="container-login100-form-btn">
                  <button className="login100-form-btn">
                      Login &nbsp;👉
                  </button>
                </div>

                <div className="login__eliminateSpacingBottom"></div>

                <div className="text-center p-t-90">
                  <a className="txt1 login__bottomStopHoverEffect">
                    Don't Have an Account? <Link to="/sign-up"><div className="login__signupLink">Signup!</div></Link>
                  </a>
                </div>
                <div className="login__bottomStopHoverEffect2">Click <div onClick={() => this.setState({ hidden: !this.state.hidden })} className="login__signupLink">Here</div> to {!this.state.hidden ? 'Hide' : 'Show'} This Card!</div>

              </form>
              </div>
            </div>
          </div>
        </div>


        <div id="dropDownSelect1"></div>
        </div>
      </>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
