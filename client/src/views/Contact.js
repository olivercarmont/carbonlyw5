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
import axios from 'axios';
import React from "react";

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

import '../OwnCSS/landing.css';
import '../OwnCSS/contact.css';
import '../OwnCSS/ourData.css';

import './landingTheme/css/responsive.css';
import './landingTheme/style.css';
import './landingTheme/appy/style.css';

import { Icon, InlineIcon } from '@iconify/react';
import accountArrowRight from '@iconify/icons-mdi/account-arrow-right';
import homeIcon from '@iconify/icons-fa-solid/home';
import chromeIcon from '@iconify/icons-icomoon-free/chrome';

import { Link } from "react-router-dom";

// import './landingTheme/js/jquery-2.2.4.min.js';
// import './landingTheme/js/popper.min.js';
// import './landingTheme/js/bootstrap.min.js';
// import './landingTheme/js/plugins.js';
// import './landingTheme/js/slick.min.js';
// import './landingTheme/js/footer-reveal.min.js';
// import './landingTheme/js/active.js';

import logo from "../assets/img/carbonlyWhiteLogo.png";
import logo2 from "../assets/img/carbonly2WhiteLogo.png";

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      howItWorks: 'account',
      email: '',
      message: ''
  }
}
addSubmission() {

  let totMessage = {
    email: this.state.email,
    message: this.state.message
  }

      axios.post('http://carbonly.org/form/add-submission', { "type": "contact", "data": totMessage }, {
        "type": "contact", "data": totMessage
      })
    .then(response => {

    if (response.data === 'Submission added!') {
         this.setState({ hasSent: true });
    } else {
      this.setState({ hasntSent: true });
    }
});
}
updateEmail(e) {
  this.setState({ email: e.target.value });
  this.setState({ hasSent: false });
  this.setState({ hasntSent: false });
}
updateMessage(e) {
  this.setState({ message: e.target.value });
  this.setState({ hasSent: false });
  this.setState({ hasntSent: false });
}
  render() {
    return (
      <>
        <div className="landing__topDiv">
        {/* <!-- Preloader Start --> */}
      {/*  <div id="preloader">
            <div className="colorlib-load"></div>
        </div> */}

        {/* <!-- ***** Header Area Start ***** --> */}
        <header className="header_area animated" id="home">
            <div className="container-fluid">
                <div className="row align-items-center">
                    {/* <!-- Menu Area Start --> */}
                    <div className="col-12 col-lg-10">
                        <div className="menu_area">
                            <nav id="landing__navBackground" className="navbar navbar-expand-lg navbar-light">
                                {/* <!-- Logo --> */}
                                <Link to="/landing"><img src={logo} className="landing__navbarTopLogo" /></Link>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ca-navbar" aria-controls="ca-navbar" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                                {/* <!-- Menu Area --> */}
                                <div className="collapse navbar-collapse" id="ca-navbar">
                                    <ul className="navbar-nav ml-auto" id="nav">
                                        <li className="nav-item"><Link to="/landing" className="nav-link" id="landing__navLinkHover">Home</Link></li>
                                        <li className="nav-item"><Link to="/data" className="nav-link" id="landing__navLinkHover">Our Data</Link></li>
                                        <li className="nav-item"><Link to="/contact" className="nav-link" id="landing__navLinkHover">Contact</Link></li>
                                        <li className="nav-item"><Link to="/features" className="nav-link" id="landing__navLinkHover">Features</Link></li>

                                    </ul>
                                    <div className="sing-up-button d-lg-none">
                                        <a href="#"></a>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                    {/* <!-- Signup btn --> */}
                    <div className="col-12 col-lg-2">
                        <div className="sing-up-button d-none d-lg-block">
                            {localStorage.jwtToken ? <Link to="/home">Home <Icon icon={homeIcon} className="landing__homeIconTop" /></Link> : <Link to="/sign-up">Sign up<Icon icon={accountArrowRight} className="landing__homeIconTop2" /></Link>}
                        </div>
                    </div>
                </div>
            </div>
        </header>
        {/*  <!-- ***** Header Area End ***** --> */}

        {/* <!-- ***** Wellcome Area Start ***** --> */}
        <section className="wellcome_area clearfix">
            <div className="container h-100">
                <div className="row h-100 align-items-center">
                    <div className="col-12 col-md">
                        <div className="wellcome-heading">
                            <h2 id="landingPage__mainLogoText">Contact</h2>
                            <h3><img className="landingPage__backgroundLogo" src={logo}/></h3>
                            <p className="landingPage__description">Carbonly</p>
                        </div>
                        <div className="get-start-area">
                            {/* <!-- Form Start --> */}
                            <div className="col-12 col-lg-2">
                                <div className="sing-up-button d-none d-lg-block" id="landing__positioningTopAddButton">
                                <a href="#">Add to Chrome <Icon icon={chromeIcon} className="landing__chromeIconTop" /></a>
                                </div>
                            </div>
                            {/* <!-- Form End --> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* }<!-- Welcome thumb --> */}
            <div className="welcome-thumb wow fadeInDown" data-wow-delay="0.5s">
                <img src="img/bg-img/welcome-img.png" alt=""/>
            </div>
        </section>
        {/* <!-- ***** Wellcome Area End ***** --> */}

        <section className="" id="contact__mainSection">

        <div className="ourData__ourTeamHeader">

        <div className="ourData__subtitleAndTitle">
        <div className="landing__howItWorksSubtitle">Contact</div>
        <div className="landing__howItWorksMainTitle">Want to Say Hi? &nbsp; 👋</div>
        </div>

        <div className="contact__descriptionBelowDonate">Please don't hesitate to contact us, even if it's just a small gesture 👋 We're always available! 🏂</div>
        </div>

        <div className="ourData__donateCentering">

        <div className="ourData__donateFormCentering">

        <div className="ourData__indFormContainer">
        <div className="ourData__donateSubtitle">Email</div>
        <input className="ourData__donateInput" value={this.state.email} onChange={(e) => this.updateEmail(e)} maxlength="300" placeholder="Psst. We'll only use this to contact you! But It's Optional! 🕵" />
        {/* <div className="ourData__donateDisclaimer"></div> */}
        </div>

        <div className="ourData__indFormContainer">
        <div className="ourData__donateSubtitle">Message</div>
        <textarea className="ourData__donateTextarea" value={this.state.message} onChange={(e) => this.updateMessage(e)} maxlength="1500" placeholder="So I was having some delicious &nbsp;🌮 the other day..." />
        {/* <div className="ourData__donateDisclaimer"></div> */}
        </div>

        <div className="ourData__submitButtonPositioning">

        <div onClick={() => this.addSubmission()} className="ourData__goToButton" >Send &nbsp; 🚀</div>

        </div>

        <div className="landing__formBottomMessages">

        {this.state.hasSent ? <div id="landingForm__sentConfirm">It Sent! &nbsp;🎉</div> : undefined}

        {this.state.hasntSent ? <div id="landingForm__notSent">It doesn't appear to have sent. Try reloading! &nbsp;👨‍💻️</div> : undefined}

        </div>


        </div>

                    </div>

        </section>

       {/*  <!-- ***** Footer Area Start ***** --> */}
        <footer className="" id="footer__ourData">
          {/*  <!-- footer logo --> */}

          <img src={logo2} className="ourData__footerLogo"/>
          {/*  <!-- social icon--> */}

          <div className="landing__footerPageLinks">
          <div className="landing__individualPageLinks"><Link to="/landing" className="landing__individualPageLinksText">Home</Link></div>
          <div className="landing__individualPageLinks"><Link to="/data" className="landing__individualPageLinksText">Our Data</Link></div>
          <div className="landing__individualPageLinks"><Link to="/contact" className="landing__individualPageLinksText">Contact</Link></div>
          <div className="landing__individualPageLinks"><Link to="/features" className="landing__individualPageLinksText">Features</Link></div>
          <div className="landing__individualPageLinks"><Link to="/privacy" className="landing__individualPageLinksText">Privacy</Link></div>
          </div>

            {/* <!-- Foooter Text--> */}
            <div id="landing__footerCopyrightContainer">
                {/* <!-- ***** Removing this text is now allowed! This template is licensed under CC BY 3.0 ***** --> */}
                <p  id="landing__footerWhiteText">Copyright ©2020 Carbonly Ltd. Designed by <a href="https://colorlib.com" target="_blank">Colorlib</a></p>
            </div>
        </footer>
        {/* <!-- ***** Footer Area Start ***** --> */}
        </div>
      </>
    );
  }
}

export default Contact;
