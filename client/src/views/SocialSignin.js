import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import GoogleLogin from 'react-google-login';
// or
import { GoogleLogin } from 'react-google-login';

function SocialSignin (props) {

return <div>
  <GoogleLogin
    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
    render={<div></div>}
    buttonText="Login"
    onSuccess={() => {}}
    onFailure={() => {}}
    cookiePolicy={'single_host_origin'}
  />ererere</div>
}

export default SocialSignin;
