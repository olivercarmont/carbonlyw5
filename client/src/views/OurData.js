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

import '../OwnCSS/landing.scss';
import '../OwnCSS/ourData.css';

import './landingTheme/css/responsive.css';
import './landingTheme/style.css';
import './landingTheme/appy/style.css';

import { Icon, InlineIcon } from '@iconify/react';
import caretDown from '@iconify/icons-fa-solid/caret-down';
import arrowBackOutline from '@iconify/icons-ion/arrow-back-outline'
import accountArrowRight from '@iconify/icons-mdi/account-arrow-right';
import homeIcon from '@iconify/icons-fa-solid/home';
import chromeIcon from '@iconify/icons-icomoon-free/chrome';

import phonePortrait from '@iconify/icons-ion/phone-portrait-outline';
import fruitCherries from '@iconify/icons-mdi/fruit-cherries';
import smogIcon from '@iconify/icons-mdi/smog';
import globeShowingEuropeAfrica from '@iconify/icons-emojione-monotone/globe-showing-europe-africa';
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
import baselineTranslate from '@iconify/icons-ic/baseline-translate';
import mediumSquareFilled from '@iconify/icons-ant-design/medium-square-filled';
import questionCircle from '@iconify/icons-fa-solid/question-circle';
import sharpPersonPinCircle from '@iconify/icons-ic/sharp-person-pin-circle';
import typewriterIcon from '@iconify/icons-mdi/typewriter';

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

import { CountUp } from 'countup.js';

let numberAnimationOccured = false;

class OurData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ourData: 'studies',
      email: '',
      message: '',
      infoText: '',
      infoImage: '',
      downloadText: '',
      downloadImage: '',
      footerImage: '',
      footerText: '',
  }
  this.trackScrolling = this.trackScrolling.bind(this);
  this.animateValue = this.animateValue.bind(this);
}
componentWillMount() {

  axios.post('https://carbonly.org/users/return-landing', { jwt: localStorage.jwtToken }, {
    'jwt': localStorage.jwtToken,
  })
  .then(response => {

    // console.log('DATA', response.data)

     this.setState({ landingData: response.data });

     document.addEventListener('scroll', this.trackScrolling);

    // this.setState({ leaderboard: response.data.info[2].slice(0, 3) });
     // console.log('user', response.data.info[0]);
     // console.log('leaderboard', response.data.info[2].slice(0, 3));
     //
     // console.log('all users', response.data.info[4]);

  })
  .catch((error) => {
  console.log(error);
  })

if (this.state.howItWorks) {
  this.fun1();
}

}
fun1 = () => {
  let i = 0;
  let intervalId = setInterval(() => {

    let sec;

    if (this.state.ourData === 'studies') {
      sec = 'org';
    } else if (this.state.ourData === 'org') {
      sec = 'company';
    } else if (this.state.ourData === 'company') {
      sec = 'studies';
    }

    this.setState({
      ourData: sec
    });

    if (i > 180) {
      clearInterval(intervalId);
    }
    i++;

  }, 8700);
};
addSubmission() {

  let totMessage = {
    email: this.state.email,
    message: this.state.message
  }

  let time = new Date();
  time = time.getDate()  + "/" + (time.getMonth()+1) + "/" + time.getFullYear() + " " +
  time.getHours() + ":" + time.getMinutes();

      axios.post('https://carbonly.org/form/add-submission', { "type": "data", "data": totMessage, time }, {
        "type": "data", "data": totMessage, time
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
componentWillUnmount() {
  document.removeEventListener('scroll', this.trackScrolling);
}
trackScrolling() {
  const numbersSection = document.getElementById('ourData__numbersSection');
  const dataInfoSection = document.getElementById('landing__howItWorks');
  const downloadSection = document.getElementById('downloadSection');
  const footerSection = document.getElementById('footer');

  if (numbersSection.getBoundingClientRect().bottom <= window.innerHeight) {
    // alert('ANIMATING')
    this.animateValue()
    // document.removeEventListener('scroll', this.trackScrolling);
  }
  if ((dataInfoSection.getBoundingClientRect().bottom-400) <= window.innerHeight) {
    this.setState({ infoText: 'slide-in-text' });
    this.setState({ infoImage: 'slide-in-imageOurData' });
  } else {
    this.setState({ infoText: '' });
    this.setState({ infoImage: '' });
  }
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
animateValue() {

  if (!numberAnimationOccured) {

    // console.log('NUM', numberAnimationOccured)

    const countUpFirst = new CountUp('ourData__numberOne', 1);
    countUpFirst.start();

    const countUpSecond = new CountUp('ourData__numberTwo', 1);
    countUpSecond.start();

    const countUpThird = new CountUp('ourData__numberThree', 11);
    countUpThird.start();

    const countUpFourth = new CountUp('ourData__numberFour', 110);
    countUpFourth.start();

    numberAnimationOccured = true;
  }
}
  render() {
    return (
      <>
      {this.state.landingData ? <div>
        <div className="landing__topDiv">

     <Helmet>
        <title>Carbonly | Our Data</title>
        <meta name="description" content="Learn How We at Carbonly Label Thousands of Products for Their Carbon Emissions!" />
      </Helmet>

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
                                        <li className="nav-item"><Link to="/blog" className="nav-link" id="landing__navLinkHover">Blog</Link></li>
                                        <li className="nav-item"><Link to="/data" className="nav-link" id="landing__navLinkHover">Our Data</Link></li>
                                        <li className="nav-item"><Link to="/contact" className="nav-link" id="landing__navLinkHover">Contact</Link></li>

                                    </ul>
                                    <div className="sing-up-button d-lg-none">
                                        <a href="#"></a>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                    {/* <!-- Signup btn --> */}
                    {/* <div className="col-12 col-lg-2">
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
                            <h2 id="landingPage__mainLogoText" className="slide-in">Our Data</h2>
                            <h3><img className="landingPage__backgroundLogo" src={logo}/></h3>
                            <p className="landingPage__description slide-in">Learn how we Label The Footprints 💨 of Everyday Products! 📦</p><br/>
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

            <a href="https://chrome.google.com/webstore/detail/carbonly/anipbbamcfddggbegnjdmphhajmgclpn" className="landing__callToActionButton">We're Planting One &nbsp;🌳 For Every Download!<Icon icon={arrowRightCircle} className="landing__productLaunchIcon" /></a>

        </div>
    </div>
  </div>
  <div className="welcome-thumb wow fadeInDown" data-wow-delay="0.5s">


<div className="video-section" id="landing__videoMargins">
<div className="container">
 <div className="row">
     <div className="col-12">

      <div className="landing__topImageHeader"><img src={require("../assets/img/landing/homePageAdobe-01.svg")} id="landing__imageSlide" className="slide-in" alt="hero"/></div>


      {/*   <div className="video-area" style={{ "background-image": `url(${require("../assets/img/landing/frontImage.png")})`}}>
             <div className="video-play-btn">
                 <a href="https://youtu.be/ltnRg8qXnBQ" className="video_btn"><i className="fa fa-play" aria-hidden="true"></i></a>
             </div>
         </div>*/}
     </div>
 </div>
</div>
</div>

      {/*<img src={require("../assets/img/landing/computerFrame.png")} id="landing__topMainVisual" alt=""/> */} {/* img/bg-img/welcome-img.png */}
  </div>
        </section>
        {/* <!-- ***** Wellcome Area End ***** --> */}

        <section id="landing__howItWorks">

        <div className="landing__howItWorks__leftSideLeft" className={`${this.state.infoText}`}>

        <div className="landing__howItWorksLeftSideContainer">

        <div className="landing__howItWorksSubtitle">Learn</div>

        <div className="landing__howItWorksMainTitle">How We Collect Data &nbsp;💾️</div>

        <div onClick={() => { this.setState({ ourData: 'studies' })}} className={this.state.ourData === 'studies' ? 'landing__howItWorksFirstContainerSelected' : 'landing__howItWorksFirstContainer'}>
        <div className="landing__howItWorksFirstPoint">1. Scientific Studies &nbsp;📑</div>

        <div className="ourData__howItWorksDescription">We Try Our Very Best to the Most up-to-Date Studies!</div>
        </div>

        <div onClick={() => { this.setState({ ourData: 'org' })}} className={this.state.ourData === 'org' ? 'landing__howItWorksFirstContainerSelected' : 'landing__howItWorksFirstContainer'}>
        <div className="landing__howItWorksFirstPoint">2. Partnering Organisations &nbsp;👨‍💼️</div>

        <div className="ourData__howItWorksDescription">Our Partners That Help Share Their Hard-Earned Data are a Massive Help!</div>
        </div>

        <div onClick={() => { this.setState({ ourData: 'company' })}} className={this.state.ourData === 'company' ? 'landing__howItWorksFirstContainerSelected' : 'landing__howItWorksFirstContainer'}>
        <div className="landing__howItWorksFirstPoint">3. Company Reports &nbsp;🏢</div>

        <div className="ourData__howItWorksDescription">Corporate Product-CO2 Reporting is a Highly Reliable Source of Data.</div>
        </div>

        </div>


        </div>

        <div className="landing__howItWorksVideoContainer">

        {this.state.ourData === 'studies' ? <img src={require("../assets/img/landing/studiesScroll.gif")} className={`ourData__howItWorksVideo ${this.state.infoImage}`} /> : undefined}

        {this.state.ourData === 'org' ? <img src={require("../assets/img/landing/ourData__partners.png")} className={`ourData__howItWorksVideo ${this.state.infoImage}`} /> : undefined}

        {this.state.ourData === 'company' ? <img src={require("../assets/img/landing/prodDatabases.gif")} className={`ourData__howItWorksVideo ${this.state.infoImage}`} /> : undefined}

        </div>

        </section>

        <section className="cool_facts_area clearfix landing__statsSection" id="ourData__numbersSection">

        <div className="landing__ourStatsBottom">
        <div className="ourData__ourStasContainingDiv">
        <div className="landing__ourStatsSubtitleAc">Reach</div>

        <div className="landing__ourStatsMainTitleAc">Our Data &nbsp; 📊</div>
        </div>
        </div>
            <div className="container">
                <div className="row">
                    {/* <!-- Single Cool Fact--> */}
                    <div className="col-12 col-md-3 col-lg-3">
                        <div className="single-cool-fact d-flex justify-content-center wow fadeInUp" data-wow-delay="0.2s">
                            <div className="counter-area">
                                <h3><span className="counter"><span id="ourData__numberOne">0</span>k</span></h3>
                            </div>
                            <div className="cool-facts-content">
                                <Icon icon={fruitCherries} className="landing__treeIcon" />
                                <p>Total <br/> Goods</p>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Single Cool Fact--> */}
                    <div className="col-12 col-md-3 col-lg-3">
                        <div className="single-cool-fact d-flex justify-content-center wow fadeInUp" data-wow-delay="0.4s">
                            <div className="counter-area">
                                <h3><span className="counter"><span id="ourData__numberTwo">0</span>k</span></h3>
                            </div>
                            <div className="cool-facts-content">
                            <span class="iconify" data-icon="cib:gumtree" data-inline="false"></span>
                            <Icon icon={phonePortrait} className="landing__treeIcon" />
                                <p>Total<br/> Products</p>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Single Cool Fact--> */}
                    <div className="col-12 col-md-3 col-lg-3">
                        <div className="single-cool-fact d-flex justify-content-center wow fadeInUp" data-wow-delay="0.6s">
                            <div className="counter-area ourData__ourStatsNumber2">
                                <h3><span className="counter"><span id="ourData__numberThree">0</span></span></h3>
                            </div>
                            <div className="cool-facts-content">
                            <Icon icon={globeShowingEuropeAfrica} className="landing__treeIcon" />
                            <p>Origins<br/> (Countries)</p>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Single Cool Fact--> */}
                    <div className="col-12 col-md-3 col-lg-3">
                        <div className="single-cool-fact d-flex justify-content-center wow fadeInUp" data-wow-delay="0.8s">
                            <div className="counter-area">
                                <h3><span className="counter"><span id="ourData__numberFour">0</span></span></h3>
                            </div>
                            <div className="cool-facts-content">
                            <Icon icon={baselineTranslate} className="landing__treeIcon" />
                            <p>Languages <br/> (Translated)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="" id="ourData__section">

        <div className="ourData__ourTeamHeader">

        <div className="ourData__subtitleAndTitle">
        <div className="landing__howItWorksSubtitle">Donate</div>
        <div className="landing__howItWorksMainTitle">Have Data to Share? &nbsp; 🤲</div>
        </div>

        <div className="ourData__descriptionBelowDonate">Our data is nowhere near perfect. We're endlessly trying our best to make it the most accurate we can. However, if you have accurate data at your disposal that you wouldn't mind sharing with us, this would be invaluable ❤️</div>
        </div>

        <div className="ourData__donateCentering">

        <div className="ourData__donateFormCentering">

        <div className="ourData__indFormContainer">
        <div className="ourData__donateSubtitle">Email</div>
        <input className="ourData__donateInput" value={this.state.email} maxlength="400" onChange={(e) => this.updateEmail(e)} placeholder="Psst. We'll only use this to contact you! But It's Optional! 🕵" />
        {/* <div className="ourData__donateDisclaimer"></div> */}
        </div>

        <div className="ourData__indFormContainer">
        <div className="ourData__donateSubtitle">Message</div>
        <textarea className="ourData__donateTextarea" value={this.state.message} maxlength="1500" onChange={(e) => this.updateMessage(e)} placeholder="Don't worry about fitting all the data here, we'll follow up! 👋" />
        {/* <div className="ourData__donateDisclaimer"></div> */}
        </div>

        <div className="ourData__submitButtonPositioning">

        <div onClick={() => this.addSubmission()} className="ourData__goToButton">Send &nbsp; 🚀</div>

        </div>

        <div className="landing__formBottomMessages">

        {this.state.hasSent ? <div id="landingForm__sentConfirm">It Sent! &nbsp;🎉</div> : undefined}

        {this.state.hasntSent ? <div id="landingForm__notSent">It doesn't appear to have sent. Try reloading! &nbsp;👨‍💻️</div> : undefined}

        </div>

        </div>




                    </div>

        </section>

        <section className="cool_facts_area clearfix landing__downloadSectionTopContainer">

        <div className="landing__downloadSection">

        <div className="landing__downloadImageLeft">
                  <img src={require("../assets/img/landing/insightfulAnalytics2.gif")} className={`landing__tryItNowImage ${this.state.downloadImage}`} />

        </div>

        <div id="downloadSection" className={`landing__downloadTextRight ${this.state.downloadText}`}>

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

          <a href="https://chrome.google.com/webstore/detail/carbonly/anipbbamcfddggbegnjdmphhajmgclpn" className="landing__callToActionButton2">We're Planting One &nbsp;🌳 For Every Download!<Icon icon={arrowRightCircle} className="landing__productLaunchIcon" /></a>

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
         <div className="landing__individualPageLinks"><Link to="/home" className="landing__individualPageLinksText"><Icon icon={homeIcon} /> &nbsp; Home</Link></div>
         <div className="landing__individualPageLinks"><Link to="/blog" className="landing__individualPageLinksText"><Icon icon={typewriterIcon} /> &nbsp; Blog</Link></div>

         <div className="landing__individualPageLinks"><Link to="/data" className="landing__individualPageLinksText"><Icon icon={bxsData} /> &nbsp; Our Data</Link></div>

         {/* <div className="landing__individualPageLinks"><Link to="/sign-up" className="landing__individualPageLinksText"><Icon icon={accountArrowRight} /> &nbsp; Join</Link></div> */}
         </div>

         <div className="footer__linkSection">
         <div className="footer__linkSectionTitle">About</div>
         <div className="landing__individualPageLinks"><Link to="/features" className="landing__individualPageLinksText"><Icon icon={gamepadIcon} /> &nbsp; Feature Req.</Link></div>
         <div className="landing__individualPageLinks"><Link to="/faq" className="landing__individualPageLinksText"><Icon icon={questionCircle} /> &nbsp; FAQ</Link></div>
         <div className="landing__individualPageLinks"><Link to="/contact" className="landing__individualPageLinksText"><Icon icon={paperPlane} /> &nbsp; Contact</Link></div>
         </div>

         <div className="footer__linkSection">
         <div className="footer__linkSectionTitle">Company</div>
                   <div className="landing__individualPageLinks"><a href="https://angel.co/company/carbonly/jobs" className="landing__individualPageLinksText"><Icon icon={sharpPersonPinCircle} style={{"font-size": "1.4em"}} /> &nbsp; Jobs</a></div>
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
        </div> : undefined}
      </>
    );
  }
}

export default OurData;
