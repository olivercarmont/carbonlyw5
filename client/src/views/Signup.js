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

// import SocialSignin from "./SocialSignin.js"

import axios from 'axios';

import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import classnames from "classnames";
// import GoogleLogin from 'react-google-login';
import { GoogleLogin } from 'react-google-login';
import ReactDOM from 'react-dom';

import { Icon, InlineIcon } from '@iconify/react';
import externalLinkAlt from '@iconify/icons-fa-solid/external-link-alt';

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
import '../OwnCSS/checkbox.css';

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

// import { google } from "@fortawesome/fontawesome-free-brands";
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

let guid = () => {
let s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    }
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

let publicId;

const responseGoogle = (response) => {
  console.log(response);
}

class Signup extends Component {
constructor(props) {
  super(props);
    this.state = {
      hidden: false,
      name2: "",
      email2: "",
      password: "",
      password2: "",
      username: "",
      errors: {},
      checked: false,
      privacy: false,
      isChanging: false,
    };
}
componentWillMount() {



      axios.post('https://carbonly.org/users/return-register', { }, {

      })
    .then(response => {
      console.log('SEND RESPONSE')

         this.setState({ allUsers: Array(response.data)[0] });

         console.log('allU', Array(response.data)[0] );
}).catch((error) => {
  console.log(error);

})
}
componentDidMount() {
  // If logged in and user navigates to Register page, should redirect them to dashboard
  if (this.props.auth.isAuthenticated) {
    this.props.history.push("/home");
  }

//   setTimeout(function() {
//
//   ReactDOM.render(
//     <GoogleLogin
//       clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
//       buttonText="Login"
//       onSuccess={responseGoogle}
//       onFailure={responseGoogle}
//       cookiePolicy={'single_host_origin'}
//     />,
//     document.getElementById('googleButton')
//   );
//
// }, 5000)
}

componentWillReceiveProps(nextProps) {
  if (nextProps.errors) {
    this.setState({
      errors: nextProps.errors
    });
  }
}

onChange(e) {
  this.setState({ privacy: false });
  this.setState({ isChanging: false });
  this.setState({ [e.target.id]: e.target.value });
};

changeChecked() {
  this.setState({ privacy: false });
  this.setState({ isChanging: false });
  this.setState({ checked: !this.state.checked })
}
idExists(id) {
  let users = Array(this.state.allUsers);
  users.map((us) => {
    if (us.publicId === id) {
      return true;
    }
  })
}
generateNewId(id) {

  while (this.idExists(id)) {
    publicId = guid();
  }

}
submitForm() {
    // e.preventDefault();

  if (this.state.checked) {

    publicId = guid();

    console.log('id', publicId);

    if (this.idExists(publicId)) {
      this.generateNewId();
    }

  // if (this.state.name2.length === 0) {
  //     this.setState({ error: "Make Sure to Include Your Name!" });
  // } else if (this.state.username.length === 0) {
  //     this.setState({ error: "Make Sure to Pick a Username!" });
  // } else {

  let userNameExists = false, emailExists = false;

  this.setState({ error: "" });

  let allUsersArray = this.state.allUsers.usersArray;

  console.log('ALLU', typeof allUsersArray)

  console.log('WAS ERROR?', `${userNameExists}, ${emailExists} - ${allUsersArray.length}`)

  allUsersArray.map((us) => {
    console.log('SEE', us)
    console.log('ONE, ONE', `${us.username}, ${this.state.username}`)
    console.log('TWO, TWO', `${us.email}, ${this.state.email}`)
    if (( us.username === this.state.username) && this.state.username ) {
      this.setState({ error: "Username is Already Taken" });
      userNameExists = true;
    } else if ((us.email === this.state.email) && this.state.email) {
      this.setState({ error: "Username is Already Taken" });
      emailExists = true;
    }
  });



  console.log('WAS ERROR?', `${userNameExists}, ${emailExists}`)

  if (!userNameExists && !emailExists) {

  const newUser = {
    name: this.state.name2,
    email: this.state.email2,
    username: this.state.username,
    publicId,
    password: this.state.password,
    password2: this.state.password,
  };

  this.props.registerUser(newUser, this.props.history);
  this.setState({ isChanging: true });

  // }
  // console.log('SIGNED UP', newUser)
  }

  } else {
    this.setState({ privacy: true });
    this.setState({ error: "Please Accept Carbonly's Privacy Policy!" });
  }
};
render() {
  const { errors } = this.props.errors;

    return (
      <>
      {this.state.allUsers ?
        <div className="content disableScroll">
        <div className="limiter">
          <img className="login__backgroundImage" src={require("../assets/img/mainBackground.jpg") }/>
          <div className="container-login100">
            <div className={!this.state.hidden ? 'wrap-login100' : 'wrap-login100__hidden'}>
            <div id="login__redoOpacity">

              <div className="login100-form validate-form">
              <div className="login__centerLogo">
                <img src={require("../assets/img/carbonlyWhiteLogo.png")} className="login__centralLogo"/>
              </div>

                <span className="login100-form-title p-b-34 p-t-27 login__signupAndLoginHeader">
                  Signup <div className="login__signupHeader">/ <Link to="/log-in" className="login__signupLinkHeader">Login</Link></div>
                </span>

                <div className="login__socialLogin">

                <div className="login__googleButton"><FontAwesomeIcon className="login__googleIcon" icon={faGoogle} /> Google</div>

                <div className="login__facebookButton"><FontAwesomeIcon className="login__googleIcon" icon={faFacebookF} /> Facebook</div>

                {/* <div id="googleButton"></div> */}

                </div>

                <div className="separator"> &nbsp; Or Signup With Password  &nbsp;</div>

                {this.props.errors.errors ? <div>{console.log('Test', errors)}</div> : undefined}

                {this.state.isChanging ? this.props.errors ? this.props.errors.errors ? errors.name ? <div className="login__errorButton">{errors.name}</div> : errors.email ? <div className="login__errorButton">{errors.email}</div> : errors.password ? <div className="login__errorButton">{errors.password}</div> : errors.password2 ? <div className="login__errorButton">{errors.password2}</div> : undefined : undefined : undefined : undefined}

                {this.state.privacy ? <div className="login__errorButton">{this.state.error}</div> : undefined}

                {this.state.error && !this.state.privacy ? <div className="login__errorButton">{this.state.error}</div> : undefined}

                <div className="wrap-input100 validate-input" data-validate="Pick Name">
                  <input className="input100" name="name" placeholder="Name" id="name2" value={this.state.name} onChange={(e) => this.onChange(e)} />
                  <span className="focus-input100" data-placeholder="&#xf204;"></span>
                </div>

                <div className="wrap-input100 validate-input" data-validate="Pick Username">
                  <input className="input100" name="username" placeholder="Username" id="username" value={this.state.username} onChange={(e) => this.onChange(e)} />
                  <span className="focus-input100" data-placeholder="&#xf188;"></span> {/* 185 */}
                </div>

                <div className="wrap-input100 validate-input" data-validate="Enter Email">
                  <input className="input100" name="email" value={this.state.email2} placeholder="Email" id="email2" onChange={(e) => this.onChange(e)} />
                  <span className="focus-input100 fa fa-envelope" data-placeholder="&#xf3fa;"></span>
                </div>

                <div className="wrap-input100 validate-input" data-validate="Enter password">
                  <input className="input100" type="password" name="pass" placeholder="Password" id="password" value={this.state.password} onChange={(e) => this.onChange(e)} />
                  <span className="focus-input100" data-placeholder="&#xf191;"></span>
                </div>


                {/* Checkbox */}

                <div class="grid">

                <label class="checkbox bounce">
                <input type="checkbox" onChange={() => this.changeChecked()} checked={this.state.checked} />
                <svg viewBox="0 0 21 21">
                <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                </svg>
                  <div className={'signup__privacyPolicyText'}>I accept Carbonly's <Link to="/privacy" className="signup__privacyLink">Privacy Policy 🕵</Link></div>
                </label>
                </div>


                <div className="login__eliminateSpacingBottomTop"></div>

                <div className="container-login100-form-btn">
                  <button onClick={() => this.submitForm()} className="login100-form-btn">
                    Sign up &nbsp;🎉
                  </button>
                </div>

                <div className="login__eliminateSpacingBottom"></div>

                <div className="text-center p-t-90">
                  <a className="txt1 login__bottomStopHoverEffect">
                    Already Have an Account? <Link to="/login"><div className="login__signupLink">Login!</div></Link>
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
        : undefined}
      </>
    );
  }
}

Signup.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Signup));
