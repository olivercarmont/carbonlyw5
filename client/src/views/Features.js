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

import '../OwnCSS/landing.scss';
import '../OwnCSS/contact.css';
import '../OwnCSS/ourData.css';

import './landingTheme/css/responsive.css';
import './landingTheme/style.css';
import './landingTheme/appy/style.css';

import { Icon, InlineIcon } from '@iconify/react';
import homeIcon from '@iconify/icons-fa-solid/home';
import accountArrowRight from '@iconify/icons-mdi/account-arrow-right';
import chromeIcon from '@iconify/icons-icomoon-free/chrome';
import bxsData from '@iconify/icons-bx/bxs-data';
import paperPlane from '@iconify/icons-fa-solid/paper-plane';
import gitRepositoryPrivateFill from '@iconify/icons-ri/git-repository-private-fill';
import fileDocumentEdit from '@iconify/icons-mdi/file-document-edit';
import gamepadIcon from '@iconify/icons-fa-solid/gamepad';
import twitterIcon from '@iconify/icons-el/twitter';
import facebookIcon from '@iconify/icons-fa-brands/facebook';
import bxlProductHunt from '@iconify/icons-bx/bxl-product-hunt';
import youtubeFilled from '@iconify/icons-ant-design/youtube-filled';
import userEdit from '@iconify/icons-fa-solid/user-edit';
import arrowRightCircle from '@iconify/icons-feather/arrow-right-circle';
import mediumSquareFilled from '@iconify/icons-ant-design/medium-square-filled';

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
import logo3 from "../assets/img/greenFooterLogo.png";
import logo4 from "../assets/img/carbonlyWhiteLogo4.png";

// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import GoogleLogin from 'react-google-login';
// or
import { GoogleLogin } from 'react-google-login';

class Features extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      howItWorks: 'account',
      email: '',
      message: '',
      downloadText: '',
      downloadImage: '',
      footerImage: '',
      footerText: '',
    }
    this.trackScrolling = this.trackScrolling.bind(this);
}
addSubmission() {

  let totMessage = {
    email: this.state.email,
    message: this.state.message
  }

  let time = new Date();
  time = time.getDate()  + "/" + (time.getMonth()+1) + "/" + time.getFullYear() + " " +
  time.getHours() + ":" + time.getMinutes();

      axios.post('https://carbonly.org/form/add-submission', { "type": "feature", "data": totMessage, time }, {
        "type": "feature", "data": totMessage, time
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
componentDidMount() {
  document.addEventListener('scroll', this.trackScrolling);
}
componentWillUnmount() {
  document.removeEventListener('scroll', this.trackScrolling);
}
trackScrolling() {
  const downloadSection = document.getElementById('downloadSection');
  const footerSection = document.getElementById('footer');

  if ((downloadSection.getBoundingClientRect().bottom-400) <= window.innerHeight) {
    this.setState({ downloadText: 'slide-in' });
    this.setState({ downloadImage: 'slide-in' });
  } else {
    this.setState({ downloadText: '' });
    this.setState({ downloadImage: '' });
  }
  if ((footerSection.getBoundingClientRect().bottom-400) <= window.innerHeight) {
    this.setState({ footerText: 'slide-in' });
    this.setState({ footerImage: 'slide-in' });
  } else {
    this.setState({ footerText: '' });
    this.setState({ footerImage: '' });
  }
};
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

                {/*    <div className="col-12 col-lg-2">
                        <div className="sing-up-button d-none d-lg-block">

                        </div>
                    </div> */}

                    <Link to="/log-in" id="landing__topLoginButton">Log in<Icon icon={accountArrowRight} className="landing__homeIconTop2" /></Link><Link to="/sign-up" id="landing__topSignupButton">Join<Icon icon={userEdit} className="landing__homeIconTop2Join" /></Link>

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
                            <h2 id="landingPage__mainLogoText" className="slide-in">Features</h2>
                            <h3><img className="landingPage__backgroundLogo" src={logo}/></h3>
                            <p className="landingPage__description slide-in">Want to Request a Crazy 😝 New Feature?! 🎮</p><br/>
                        </div>
                        <div className="app-download-area">
                            <div className="app-download-btn wow fadeInUp" id="landing__positioningBottomInstallBtnUp" data-wow-delay="0.2s">
                                {/* <!-- Google Store Btn --> */}
                                <a href="https://chrome.google.com/webstore/detail/carbonly/anipbbamcfddggbegnjdmphhajmgclpn" target="_blank" className="landing__installBackground">
                                    <Icon icon={chromeIcon} className="landing__downloadChromeIcon" style={{"color": "#f2f2f2"}} />
                                    <p id="landingPage__chromeStoreButtonTextUp" style={{"color": "#f2f2f2"}} className="mb-0"><span className="landing__bottomButtonAvailable">Available on</span> Chrome Store</p>
                                </a>
                            </div>
            </div>

          <a href="https://www.producthunt.com/posts/carbonly?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-carbonly" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=207154&theme=dark" alt="Carbonly 🌿️ - Track  📈 Your Online Carbon Footprint 💨 | Product Hunt Embed" style={{ "width": "225px;", "height": "54px;", "width": "225px", "height": "54px", "margin-top": "21px"}} /></a>
        </div>
    </div>
  </div>
  <div className="welcome-thumb wow fadeInDown" data-wow-delay="0.5s">


<div className="video-section" id="landing__videoMargins">
<div className="container">
 <div className="row">
     <div className="col-12">

      <div className="landing__topImageHeader"><img src={require("../assets/img/landing/homePageAdobe-01.svg")} id="landing__imageSlide" className="slide-in" alt="hero"/></div>
     </div>
 </div>
</div>
</div>
  </div>
        </section>
        {/* <!-- ***** Wellcome Area End ***** --> */}

        <section className="" id="contact__mainSection">

        <div className="ourData__ourTeamHeader">

        <div className="ourData__subtitleAndTitle">
        <div className="landing__howItWorksSubtitle">Features</div>
        <div className="landing__howItWorksMainTitle">Want to Request a Feature? &nbsp; 👨‍🚀️</div>
        </div>

        <div className="features__descriptionBelow">Have any cool features you thought Carbonly could implement? 🚀 Then you've come to the perfect place! Fill in the quick form below and we'll be on it! &nbsp;🛠️</div>
        </div>

        <div className="ourData__donateCentering">

        <div className="ourData__donateFormCentering">

        <div className="ourData__indFormContainer">
        <div className="ourData__donateSubtitle">Email</div>
        <input className="ourData__donateInput" value={this.state.email} onChange={(e) => this.updateEmail(e)} maxlength="400" placeholder="Psst. We'll only use this to contact you! But It's Optional! 🕵" />
        {/* <div className="ourData__donateDisclaimer"></div> */}
        </div>

        <div className="ourData__indFormContainer">
        <div className="ourData__donateSubtitle">Feature Information</div>
        <textarea className="ourData__donateTextarea" value={this.state.message} onChange={(e) => this.updateMessage(e)} maxlength="1500" placeholder="So I had this &nbsp;🔥 idea the other day..." />
        {/* <div className="ourData__donateDisclaimer"></div> */}
        </div>

        <div className="ourData__submitButtonPositioning">

        <div className="ourData__goToButton" onClick={() => this.addSubmission()}>Send &nbsp; 🚀</div>

        </div>

        <div className="landing__formBottomMessages">

        {this.state.hasSent ? <div id="landingForm__sentConfirm">It Sent! &nbsp;🎉</div> : undefined}

        {this.state.hasntSent ? <div id="landingForm__notSent">It doesn't appear to have sent. Try reloading! &nbsp;👨‍💻️</div> : undefined}

        </div>

        </div>




                    </div>

        </section>

        <section id="downloadSection" className="cool_facts_area clearfix landing__downloadSectionTopContainer">

        <div className="landing__downloadSection">

        <div className="landing__downloadImageLeft">
                  <img src={require("../assets/img/landing/insightfulAnalytics2.gif")} className={`landing__tryItNowImage ${this.state.downloadImage}`} />

        </div>

        <div className={`landing__downloadTextRight ${this.state.downloadText}`}>

                            <h2 id="landing__getAppTitle">We're Planting a 🌳 for Every Install In The Next 48 Hours!</h2>
                            <p className="landing__downloadDescription">Download For Free on The Chrome Store!</p>
                            <div className="app-download-area">
                                <div className="app-download-btn wow fadeInUp" id="landing__positioningBottomInstallBtn" data-wow-delay="0.2s">
                                    {/* <!-- Google Store Btn --> */}
                                    <a href="https://chrome.google.com/webstore/detail/carbonly/anipbbamcfddggbegnjdmphhajmgclpn" target="_blank">
                                        <Icon icon={chromeIcon} className="landing__downloadChromeIcon" />
                                        <p id="landingPage__chromeStoreButtonText" className="mb-0"><span className="landing__bottomButtonAvailable">Available on</span> Chrome Store</p>
                                    </a>

                                </div>

                            </div>

        <a href="https://www.producthunt.com/posts/carbonly?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-carbonly" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=207154&theme=dark" alt="Carbonly 🌿️ - Track  📈 Your Online Carbon Footprint 💨 | Product Hunt Embed" style={{ "width": "225px;", "height": "54px;", "width": "225px", "height": "54px", "margin-top": "21px"}} /></a>

        </div>
        </div>

        </section>

       {/*  <!-- ***** Footer Area Start ***** --> */}
       <footer className="" id="footer">
         {/*  <!-- footer logo --> */}


         {/*  <!-- social icon--> */}

         <div className="footer__linksContainer">

         <div className={`footer__left ${this.state.footerText}`}>
         {/* <img src={require("../assets/img/landing/whiteBrush.png")} style={{ "width": "450px", "position":"absolute", "z-index": "-1" }}/> */}
         <img src={logo3} className="landing__footerLogo"/><div className="footer_mainLogo"> Carbonly</div>
         <div className="footer_tagline">A Browser Extension For Tracking 📈 Your Online Carbon Footprint&nbsp; 💨️</div>

         <div className="footer__social"><a href="https://www.producthunt.com/upcoming/carbonly"><Icon icon={bxlProductHunt} className="footer__socialIcon" /></a><a href="https://twitter.com/carbonly_org"><Icon icon={twitterIcon} className="footer__socialIcon" /></a><a href="https://www.facebook.com/Carbonly-111577497250555/?ref=page_internal"><Icon icon={facebookIcon} className="footer__socialIcon" /></a><a href="https://www.youtube.com/channel/UCTYFGwIzSOs_Hf5Wcy9Ta_A?"><Icon icon={youtubeFilled} style={{ "font-size": "1.51em", "position": "relative", "top": "0px"}} className="footer__socialIcon" /></a><a href="https://medium.com/@carbonly.org"><Icon icon={mediumSquareFilled} style={{ "font-size": "1.49em", "position": "relative", "top": "0px"}} className="footer__socialIcon" /></a></div>

           <p id="landing__footerWhiteText">Copyright ©2020 Carbonly Ltd. Designed by <a href="https://colorlib.com" target="_blank">Colorlib</a></p>

         </div>

         <div className="footer__linkSection">
         <div className="footer__linkSectionTitle">Learn</div>
         <div className="landing__individualPageLinks"><Link to="/landing" className="landing__individualPageLinksText"><Icon icon={homeIcon} /> &nbsp; Home</Link></div>
         <div className="landing__individualPageLinks"><Link to="/data" className="landing__individualPageLinksText"><Icon icon={bxsData} /> &nbsp; Our Data</Link></div>

         <div className="landing__individualPageLinks"><Link to="/sign-up" className="landing__individualPageLinksText"><Icon icon={accountArrowRight} /> &nbsp; Join</Link></div>
         </div>

         <div className="footer__linkSection">
         <div className="footer__linkSectionTitle">About</div>
         <div className="landing__individualPageLinks"><Link to="/features" className="landing__individualPageLinksText"><Icon icon={gamepadIcon} /> &nbsp; Features</Link></div>
         <div className="landing__individualPageLinks"><Link to="/contact" className="landing__individualPageLinksText"><Icon icon={paperPlane} /> &nbsp; Contact</Link></div>
         </div>

         <div className="footer__linkSection">
         <div className="footer__linkSectionTitle">Company</div>
         <div className="landing__individualPageLinks"><Link to="/privacy" className="landing__individualPageLinksText"><Icon icon={gitRepositoryPrivateFill} /> &nbsp; Privacy</Link></div>
         <div className="landing__individualPageLinks"><Link to="/terms" className="landing__individualPageLinksText"><Icon icon={fileDocumentEdit} /> &nbsp; Terms</Link></div>
         </div>

         <div className="footer__sideImage">
         <img src={require("../assets/img/landing/Online shopping-pana.png")} className={`footer__sideImageImage ${this.state.footerImage}`} />
         </div>

         </div>

         <div style={{ "clear": "both"}}></div>

           {/* <!-- Foooter Text--> */}
       {/*    <div id="landing__footerCopyrightContainer">

     </div>*/}
       </footer>
        {/* <!-- ***** Footer Area Start ***** --> */}
        </div>
      </>
    );
  }
}

export default Features;
