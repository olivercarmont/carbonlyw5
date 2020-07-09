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
import { socialLoginUser } from "../actions/authActions";
import classnames from "classnames";
import axios from 'axios';
import { Helmet } from "react-helmet";

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

// import './loginTheme/vendor/bootstrap/css/bootstrap.min.css';
// import './loginTheme/vendor/animate/animate.css';
// import './loginTheme/vendor/css-hamburgers/hamburgers.min.css';
// import './loginTheme/vendor/animsition/css/animsition.min.css';
// import './loginTheme/vendor/select2/select2.min.css';
// import './loginTheme/fonts/font-awesome-4.7.0/css/font-awesome.min.css';

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
import SocialButton from './SocialButton';

class Login extends React.Component {
constructor(props) {
  super(props);
    this.state = {
      hidden: false,
      emailLogin: "",
      passwordLogin: "",
      errors: {},
      isChanging: false,
    };
}
componentWillMount() {

      axios.post('https://carbonly.org/users/return-register', { }, {

      })
    .then(response => {
      // console.log('SEND RESPONSE')

         this.setState({ allUsers: Array(response.data)[0] });

         // console.log('allU', Array(response.data)[0] );
}).catch((error) => {
  console.log(error);

})
}
componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      window.location.href = "/home";
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
    this.setState({ isChanging: false });
    this.setState({ error: '' });
    this.setState({ [e.target.id]: e.target.value });
  };

submit() {
    // e.preventDefault();

    this.setState({ error: "" });

    let foundUser = false;

    const userData = {
      email: this.state.emailLogin,
      password: this.state.passwordLogin,
    };

    let allUsersArray = this.state.allUsers.usersArray;

    allUsersArray.map((us) => {

      // console.log('users', `${us.email}, ${this.state.emailLogin}`)

      if ((us.email == this.state.emailLogin) && this.state.emailLogin) {
          // console.log('WAS SOCIAL LOGIN', us)

          foundUser = true;

        if (us.socialLogin) {
          this.setState({ error: "This Account Requires Google Login" });

        } else {

          this.props.loginUser(userData);
          this.setState({ isChanging: true });

          axios.post('http://localhost:3000/users/can-login', { }, {

          })
        .then(response => {
          // console.log('SEND RESPONSE')

          console.log('RE', response)

          if (!response.data.user && !this.state.password) {
            this.setState({ error: "Couldn't Find Password/Email Combination" });
          }

             // console.log('allU', Array(response.data)[0] );
        }).catch((error) => {
          console.log(error);
        })


        }

      } else {
      }

    });

    if (!foundUser) {
      this.setState({ isChanging: true });
      this.setState({ error: "Couldn't Find Password/Email Combination" });
    }

  };
handleGoogleLoginFailure(err) {
    // console.error(err)
  this.setState({ error: "Google Login Failed : (" });
  console.log('Error', err)
  window.location.href = 'https://www.carbonly.org/log-in';
}
handleGoogleLogin(user) {
  // console.log(user)

  if (user._profile) {

  let userData = {
    email: user._profile.email
  }

  this.props.socialLoginUser(userData, this.props.history);
  this.setState({ isChanging: true });
  }
}
render() {
  const { errors } = this.state;
    return (
      <>
      {this.state.allUsers ?
        <div className="content disableScroll">
      {/*   <Helmet>
        <title>Carbonly | Login</title>
        <meta name="description" content="Use This Page to Log in to Your Carbonly Account And Start Tracking!" />
        </Helmet> */}

        <div className="limiter">
          <img className="login__backgroundImage" src={require("../assets/img/mainBackground.jpg") }/>
          <div className="container-login100">
            <div className={!this.state.hidden ? 'wrap-login100' : 'wrap-login100__hidden'}>
            <div id="login__redoOpacity">

              <div className="login__centerLogo">
                <img src={require("../assets/img/carbonlyWhiteLogo.png")} className="login__centralLogo"/>
              </div>

                <span className="login100-form-title p-b-34 p-t-27 login__signupAndLoginHeader">
                  Login <div className="login__signupHeader">/ <Link to="/sign-up" className="login__signupLinkHeader">Signup</Link></div>
                </span>

                <div className="login__socialLogin">

            {/*    <SocialButton
                provider='facebook'
                appId='313951486279385'
                onLoginSuccess={(user) => this.handleSocialLogin(user)}
                onLoginFailure={(err) => this.handleSocialLoginFailure(err)}
                className="login__socialButton"
                >
                <div className="login__facebookButton"><FontAwesomeIcon className="login__googleIcon" icon={faFacebookF} /> Facebook</div>
                </SocialButton> */}

                <SocialButton
                 provider='google'
                 appId='971407209595-rvibl8nfhj8coefijt900aou352ic5cq.apps.googleusercontent.com'
                 callback={(user, err) => this.handleGoogleLogin(user, err)}
                 onLoginSuccess={(user) => this.handleGoogleLogin(user)}
                 onLoginFailure={(err) => this.handleGoogleLoginFailure(err)}
                 className="login__socialButton"
                 >
                 <div className="login__googleButton"><FontAwesomeIcon className="login__googleIcon" icon={faGoogle} /> Google</div>
                </SocialButton>

              <div id="socialSignin" dangerouslySetInnerHTML={{__html: `<script src="https://apis.google.com/js/platform.js" async defer></script>
            <meta name="google-signin-scope" content="profile email">
              <meta name="google-signin-client_id" content="971407209595-rvibl8nfhj8coefijt900aou352ic5cq.apps.googleusercontent.com"><div class="g-signin2" style="display:none" data-onsuccess="onSignIn"></div>` }}></div>


                </div>

                <div className="separator"> &nbsp; Or Login With Password  &nbsp;</div>

                {this.state.isChanging ? errors.email ? <div className="login__errorButton">{errors.email}</div> : errors.emailnotfound ? <div className="login__errorButton">{errors.emailnotfound}</div> : undefined : undefined}

                {/* : errors.password ? <div className="login__errorButton">{errors.password}</div> : errors.passwordincorrect ? <div className="login__errorButton">{errors.passwordincorrect}</div> */}

                {this.state.isChanging ? this.state.error ? <div className="login__errorButton">{this.state.error}</div> : undefined : undefined}

                <div className="login100-form validate-form">

                <div className="wrap-input100 validate-input" data-validate="Enter Email">
                  <input className="input100" name="email" placeholder="Email" onChange={this.onChange}
                  value={this.state.emailLogin}
                  error={errors.email}
                  id="emailLogin"
                  type="email"
                   />

                  <span className="focus-input100" data-placeholder="&#xf3fa;"></span>
                </div>

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

                <div className="login__eliminateSpacingBottomTop"></div>

                <div className="container-login100-form-btn">
                  <button className="login100-form-btn" onClick={() => this.submit()}>
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

              </div>
              </div>
            </div>
          </div>
        </div>


        <div id="dropDownSelect1"></div>
        </div>
        : undefined }
      </>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  socialLoginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser, socialLoginUser }
)(Login);
