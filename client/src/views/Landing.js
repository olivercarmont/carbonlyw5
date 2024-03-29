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

import '../OwnCSS/landing.scss';
import '../OwnCSS/ourData.css';

import './landingTheme/css/responsive.css';
import './landingTheme/style.css';
import './landingTheme/appy/style.css';

import { Icon, InlineIcon } from '@iconify/react';
import gumtreeIcon from '@iconify/icons-cib/gumtree';
import pricetagsOutline from '@iconify/icons-ion/pricetags-outline';
import statsChart from '@iconify/icons-ion/stats-chart';
import cloudDownloadOutline from '@iconify/icons-ion/cloud-download-outline';
import chromeIcon from '@iconify/icons-icomoon-free/chrome';
import arrowCircleLeft from '@iconify/icons-jam/arrow-circle-left';
import arrowCircleRight from '@iconify/icons-jam/arrow-circle-right';
import bxsData from '@iconify/icons-bx/bxs-data';
import paperPlane from '@iconify/icons-fa-solid/paper-plane';
import gitRepositoryPrivateFill from '@iconify/icons-ri/git-repository-private-fill';
import fileDocumentEdit from '@iconify/icons-mdi/file-document-edit';
import accountArrowRight from '@iconify/icons-mdi/account-arrow-right';
import gamepadIcon from '@iconify/icons-fa-solid/gamepad';
import twitterIcon from '@iconify/icons-el/twitter';
import facebookIcon from '@iconify/icons-fa-brands/facebook';
import bxlProductHunt from '@iconify/icons-bx/bxl-product-hunt';
import youtubeFilled from '@iconify/icons-ant-design/youtube-filled';
import userEdit from '@iconify/icons-fa-solid/user-edit';
import arrowRightCircle from '@iconify/icons-feather/arrow-right-circle';
import linkedinIcon from '@iconify/icons-cib/linkedin';
import mediumSquareFilled from '@iconify/icons-ant-design/medium-square-filled';
import questionCircle from '@iconify/icons-fa-solid/question-circle';
import sharpPersonPinCircle from '@iconify/icons-ic/sharp-person-pin-circle';
import typewriterIcon from '@iconify/icons-mdi/typewriter';

import { Link } from "react-router-dom";
import homeIcon from '@iconify/icons-fa-solid/home';

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

import { fadeInRight } from 'react-animations';

import { CountUp } from 'countup.js';


import { Fade } from 'react-awesome-reveal';

// let features = ['budget'];

let numberAnimationOccured = false;

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      howItWorks: 'account',
      allFeatures: "budget",
      num1: 0,
      videoClass: '',
      computer1: '',
      header1: '',
      computer2: '',
      header2: '',
      computer3: '',
      header3: '',
      computer4: '',
      header4: '',
      teamHeader: '',
      teamText: '',
      teamImage: '',
      award1: '',
      award2: '',
      downloadText: '',
      downloadImage: '',
      footerImage: '',
      footerText: '',
  }
  this.trackScrolling = this.trackScrolling.bind(this);
  this.animateNumbers = this.animateNumbers.bind(this);
}




componentWillMount() {

  axios.post('https://carbonly.org/users/return-landing', { jwt: localStorage.jwtToken }, {
    'jwt': localStorage.jwtToken,
  })
.then(response => {

    // console.log('DATA', response.data)

    console.log('DATA', response.data)

     this.setState({ landingData: response.data });

    // this.setState({ leaderboard: response.data.info[2].slice(0, 3) });
     // console.log('user', response.data.info[0]);
     // console.log('leaderboard', response.data.info[2].slice(0, 3));
     //
     // console.log('all users', response.data.info[4]);

     // setTimeout(function(e) {
     document.addEventListener('scroll', this.trackScrolling);
     // }, 1000)

})
.catch((error) => {
  console.log(error);
})

if (this.state.howItWorks) {
  this.fun1();
}

// setTimeout(function() {
// this.animateValue("landing__numberOne", 100, 25, 5000);
// }, 500)

}
fun1 = () => {
  let i = 0;
  let intervalId = setInterval(() => {

    let sec;

    if (this.state.howItWorks === 'account') {
      sec = 'buy';
    } else if (this.state.howItWorks === 'buy') {
      sec = 'track';
    } else if (this.state.howItWorks === 'track') {
      sec = 'account';
    }

    this.setState({
      howItWorks: sec
    });

    if (i > 180) {
      clearInterval(intervalId);
    }
    i++;

  }, 8700);
};
returnCO2Format() {
let emissions = parseFloat(this.state.landingData.emTracked);
let newEmissions = 0;

  if (emissions > 1000000) {

    newEmissions = emissions / 1000000;
    newEmissions = Math.round(newEmissions);
    newEmissions = newEmissions

  } else if (emissions > 10000) {

    newEmissions = emissions / 1000;
    newEmissions = Math.round(newEmissions);
    newEmissions = newEmissions

  } else if (emissions > 1000) {

    newEmissions = emissions / 1000;
    newEmissions = newEmissions.toFixed(1);
    newEmissions = newEmissions

  }

  return newEmissions;
}
componentWillUnmount() {
  document.removeEventListener('scroll', this.trackScrolling);
}
trackScrolling() {
  const statsSection = document.getElementById('statsSection');
  const mainVideo = document.getElementById('landing__mainVideo');
  const compatibleSection = document.getElementById('compatibleSection');
  const firstComputerSection = document.getElementById('landing__howItWorks2');
  const secondComputerSection = document.getElementById('landing__awesomeFeaturesSecondContainer');
  const thirdComputerSection = document.getElementById('landing__howItWorks3');
  const fourthComputerSection = document.getElementById('landing__awesomeFeaturesSecondContainer2');
  const teamSection = document.getElementById('team');
  const awardsSection = document.getElementById('awards');
  const downloadSection = document.getElementById('downloadSection');
  const footerSection = document.getElementById('footer');

  if (statsSection.getBoundingClientRect().bottom <= window.innerHeight) {
    // alert('ANIMATING')
    this.animateNumbers()
    // document.removeEventListener('scroll', this.trackScrolling);
  }
  if ((mainVideo.getBoundingClientRect().bottom-650) <= window.innerHeight) {

    this.setState({ videoClass: 'slide-in-video' });
    this.setState({ videoHeader: 'slide-in-video' });
    // document.removeEventListener('scroll', this.trackScrolling);
  } else {
    this.setState({ videoClass: '' });
    this.setState({ videoHeader: '' });
  }
  if ((compatibleSection.getBoundingClientRect().bottom-590) <= window.innerHeight) {
    this.setState({ compatible1: 'fadeIn' });
    this.setState({ compatible2: 'fadeIn' });
    this.setState({ compatible3: 'fadeIn' });
    this.setState({ compatible4: 'fadeIn' });
    this.setState({ compatible5: 'fadeIn' });
    this.setState({ compatible6: 'fadeIn' });
  } else {
    this.setState({ compatible1: '' });
    this.setState({ compatible2: '' });
    this.setState({ compatible3: '' });
    this.setState({ compatible4: '' });
    this.setState({ compatible5: '' });
    this.setState({ compatible6: '' });
  }
  if ((firstComputerSection.getBoundingClientRect().bottom-400) <= window.innerHeight) {

    this.setState({ computer1: 'slide-in' });
    this.setState({ header1: 'slide-in' });

  } else {
    this.setState({ computer1: '' });
    this.setState({ header1: '' });
  }
  if ((secondComputerSection.getBoundingClientRect().bottom-400) <= window.innerHeight) {

    this.setState({ computer2: 'slide-in' });
    this.setState({ header2: 'slide-in' });

  } else {
    this.setState({ computer2: '' });
    this.setState({ header2: '' });
  }
  if ((thirdComputerSection.getBoundingClientRect().bottom-400) <= window.innerHeight) {

    this.setState({ computer3: 'slide-in' });
    this.setState({ header3: 'slide-in-text' });

  } else {
    this.setState({ computer3: '' });
    this.setState({ header3: '' });
  }
  if ((fourthComputerSection.getBoundingClientRect().bottom-400) <= window.innerHeight) {

    this.setState({ computer4: 'slide-in' });
    this.setState({ header4: 'slide-in' });

  } else {
    this.setState({ computer4: '' });
    this.setState({ header4: '' });
  }
  if ((teamSection.getBoundingClientRect().bottom-400) <= window.innerHeight) {

    this.setState({ teamHeader: 'slide-in' });
    this.setState({ teamText: 'slide-in' });
    this.setState({ teamImage: 'slide-in' });

  } else {
    this.setState({ teamHeader: '' });
    this.setState({ teamText: '' });
    this.setState({ teamImage: '' });
  }
  if ((awardsSection.getBoundingClientRect().bottom-400) <= window.innerHeight) {
    this.setState({ awardsHeader: 'slide-in' });
    this.setState({ award: 'slide-in' });
  } else {
    this.setState({ awardsHeader: '' });
    this.setState({ award: '' });
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
animateNumbers() {

  if (!numberAnimationOccured) {

    // console.log('NUM', numberAnimationOccured)

    const countUpFirst = new CountUp('landing__numberOne', this.state.landingData.totUsers);
    countUpFirst.start();

    const countUpSecond = new CountUp('landing__numberTwo', 18);
    countUpSecond.start();

    const countUpThird = new CountUp('landing__numberThree', 1.2);
    countUpThird.start();

    const countUpFourth = new CountUp('landing__numberFour', this.returnCO2Format()); // this.returnCO2Format()
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
          <title>Carbonly | An Online Carbon Footprint Tracker</title>
          <meta name="description" content="Carbonly, a Browser Extension for Tracking And Mitigating Your Online Carbon Footprint, Everywhere You Go!" />
        </Helmet>

        {/* <!-- ***** Header Area Start ***** --> */}
        <header className="header_area animated posStatic" id="home">
            <div className="container-fluid">
                <div className="row align-items-center posStatic">
                    {/* <!-- Menu Area Start --> */}
                    <div className="col-12 col-lg-10 posStatic">
                        <div className="menu_area posStatic">
                            <nav id="landing__navBackground" className="navbar navbar-expand-lg navbar-light posStatic">
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
                    {/*  <div className="col-12 col-lg-2">
                        <div className="sing-up-button d-none d-lg-block"> */}

                             <Link to="/log-in" id="landing__topLoginButton">Log in<Icon icon={accountArrowRight} className="landing__homeIconTop2" /></Link><Link to="/sign-up" id="landing__topSignupButton">Join<Icon icon={userEdit} className="landing__homeIconTop2Join" /></Link>
                      {/*  </div>
                    </div> */}
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
                            <h2 id="landingPage__mainLogoText" className="slide-in">Carbonly</h2>
                            <h3><img className="landingPage__backgroundLogo" src={logo4}/></h3>
                            <p className="landingPage__description slide-in">A Browser Extension For Tracking 📈 Your Online Carbon Footprint&nbsp;💨🌿️</p>
                        </div>


                                    {/* <a href="#">Add to Chrome <Icon icon={chromeIcon} className="landing__chromeIconTop" /></a> */}
                                    {/* <div className="landing__chromeStoreDiv"><img src={require("../assets/img/landing/chromeStoreImage.png")} /></div> */}
                                    <div className="app-download-area">
                                        <div className="app-download-btn wow fadeInUp" id="landing__positioningBottomInstallBtnUp" data-wow-delay="0.2s">
                                            {/* <!-- Google Store Btn --> */}
                                            <a href="https://chrome.google.com/webstore/detail/carbonly/anipbbamcfddggbegnjdmphhajmgclpn" target="_blank" className="landing__installBackground">
                                                <Icon icon={chromeIcon} className="landing__downloadChromeIcon" style={{"color": "#f2f2f2"}} />
                                                <p id="landingPage__chromeStoreButtonTextUp" style={{"color": "#f2f2f2"}} className="mb-0"><span className="landing__bottomButtonAvailable">Available on</span> Chrome Store</p>
                                            </a>
                                          {/*  <br/><div style={{ "color": "#eee", "clear": "both", "position": "absolute"}}>(Link Disabled For Beta) <a id="home__updatedLink" href="https://www.producthunt.com/upcoming/carbonly">Wanna Keep Updated?</a></div>*/}

                                        </div>
                                      </div>

                                    <a href="https://chrome.google.com/webstore/detail/carbonly/anipbbamcfddggbegnjdmphhajmgclpn" className="landing__callToActionButton">We're Planting One &nbsp;🌳 For Every Download!<Icon icon={arrowRightCircle} className="landing__productLaunchIcon" /></a>

                                  {/*     <a className="landing__callToActionButton" href="https://www.producthunt.com/upcoming/carbonly">Subscribe to Our Product Launch<Icon icon={arrowRightCircle} className="landing__productLaunchIcon" /></a> */}
                    </div>
                </div>

            </div>
          {/*  <img src={require("../assets/img/landing/backgroundRanImage.png")} className="landing__backgroundImage" /> */}
          {/*  <img src={require("../assets/img/landing/backgroundRanImage2.png")} className="landing__backgroundImage2" /> */}
            {/* }<!-- Welcome thumb --> */}
            <div className="welcome-thumb wow fadeInDown" data-wow-delay="0.5s">


   <div className="video-section" id="landing__videoMargins">
       <div className="container">
           <div className="row">
               <div className="col-12">

                <div className="landing__topImageHeader"><img src={require("../assets/img/landing/homePageAdobe-01.svg")} alt="hero" id="landing__imageSlide" className="slide-in" /></div>


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

        <div className="landing__howItWorks__leftSide">

        <div className="landing__howItWorksLeftSideContainer">

        <div className={`landing__centerMiddleTitle ${this.state.videoHeader}`}>
        <div className="landing__howItWorksSubtitle">Learn</div>
        <div className="landing__howItWorksMainTitle">How It Works 🛠️</div>
        </div>

      {/*  <div onClick={() => { this.setState({ howItWorks: 'account' })}} className={this.state.howItWorks === 'account' ? 'landing__howItWorksFirstContainerSelected' : 'landing__howItWorksFirstContainer'}>
        <div className="landing__howItWorksFirstPoint">1. Create an Account &nbsp;🏂</div>

        <div className="landing__howItWorksDescription">Sign up <span className="howItWorks__link">here!</span></div>
        </div>

        <div onClick={() => { this.setState({ howItWorks: 'buy' })}} className={this.state.howItWorks === 'buy' ? 'landing__howItWorksFirstContainerSelected' : 'landing__howItWorksFirstContainer'}>
        <div className="landing__howItWorksFirstPoint">2. Buy Some Waffles &nbsp;🥞</div>

        <div className="landing__howItWorksDescription">Mmmmm...</div>
        </div>

        <div onClick={() => { this.setState({ howItWorks: 'track' })}} className={this.state.howItWorks === 'track' ? 'landing__howItWorksFirstContainerSelected' : 'landing__howItWorksFirstContainer'}>
        <div className="landing__howItWorksFirstPoint">3. Track & Offset &nbsp;🌳</div>

        <div className="landing__howItWorksDescription">Realtime analytics and feedback!</div>
        </div>

        */}

        <div className="landing__topVideoMargins">

        <iframe alt="Carbonly Online Carbon Tracking Intro Video" style={{ "border-radius": "5px", "width":"73vw", "height": "41.06vw"}} id="landing__mainVideo" className={`landing__mainVideo ${this.state.videoClass}`} src="https://www.youtube.com/embed/d7BWAbuK9rk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

      {/*  <div className="video-area" style={{ "background-image": `url(${require("../assets/img/landing/frontImage.png")})`}}>
              <div className="video-play-btn">
                  <a href="https://youtu.be/ltnRg8qXnBQ" className="video_btn"><i className="fa fa-play" aria-hidden="true"></i></a>
              </div>
          </div> */}

          </div>

        </div>


        </div>

      {/*  <div className="landing__howItWorksVideoContainer">

        {this.state.howItWorks === 'account' ? <img src={require("../assets/img/landing/createAnAccountAn.gif")} className="landing__howItWorksVideo"/> : undefined}

        {this.state.howItWorks === 'buy' ? <img src={require("../assets/img/landing/checkoutFinal.gif")} className="landing__howItWorksVideo"/> : undefined}

        {this.state.howItWorks === 'track' ? <img src={require("../assets/img/landing/AnalyticSec.gif")} className="landing__howItWorksVideo"/> : undefined}

        </div> */}

        </section>

        {/* Compatible Marketplaces */}

        <section id="compatibleSection" className="cool_facts_area clearfix landing__compatibleMarketplacesSection">

        <div className="landing__compatibleMarketplacesBottom">
        <div className="landing__ourStasContainingDivReach">
        <div className="landing__ourStatsSubtitle3">Reach</div>

        <div className="landing__ourStatsMainTitle">Compatible Marketplaces &nbsp; 🛍️</div>
        </div>
        </div>

            <div className="landing__compatibleMarketplacesPositioningCircle"><img src={require("../assets/img/companyLogos/tesco.png")} id="landing__compatibleImage" className={`compatibleFades ${this.state.compatible1}`} /></div>

            <div className="landing__compatibleMarketplacesPositioningCircle"><img src={require("../assets/img/companyLogos/amazon.png")} id="landing__compatibleImage2" className={`compatibleFades ${this.state.compatible2}`} /></div>

            <div className="landing__compatibleMarketplacesPositioningCircle"><img src={require("../assets/img/companyLogos/skyscanner.png")} id="landing__compatibleImage3" className={`compatibleFades ${this.state.compatible3}`} /></div>

            <div className="landing__compatibleMarketplacesPositioningCircle"><img src={require("../assets/img/companyLogos/ubereats.png")} id="landing__compatibleImage4" className={`compatibleFades ${this.state.compatible4}`} /></div>

            <div className="landing__compatibleMarketplacesPositioningCircle"><img src={require("../assets/img/companyLogos/foodie.png")} id="landing__compatibleImage9" className={`compatibleFades ${this.state.compatible5}`} /></div>

            <div className="landing__compatibleMarketplacesPositioningCircle"><img src={require("../assets/img/companyLogos/kruoka.png")} id="landing__compatibleImage10" className={`compatibleFades ${this.state.compatible6}`} /></div>

        </section>

        <section id="landing__howItWorks2">

        <div className="landing__howItWorks__leftSide">

        <div className={`landing__howItWorksLeftSideContainer ${this.state.header1}`}>

        <div className="landing__howItWorksSubtitle2">Data</div>

        <div className="landing__howItWorksMainTitle">Realtime Data &nbsp; 💾️</div>

        <div className="landing__awesomeFeaturesText">See the Carbon Footprints 💨 of Your Everyday Products 📦 Directly on The Page!</div>

        </div>
        </div>

        <div className="landing__howItWorksVideoContainer">

        <img src={require("../assets/img/landing/realTimeImage.png")} className={`landing__howItWorksVideo ${this.state.computer1}`} />
        </div>

        </section>

        <section id="landing__awesomeFeaturesSecondContainer">

        <div className="landing__howItWorksVideoContainer2">

        <img src={require("../assets/img/landing/trackAPurchaseHome.png")} className={`landing__howItWorksVideoRight ${this.state.computer2}`} />
        </div>

        <div className={`landing__howItWorks__leftSide ${this.state.header2}`}>

        <div className="landing__howItWorksLeftSideContainer2">

        <div className="landing__howItWorksSubtitle3">Tracking</div>

        <div className="landing__howItWorksMainTitle">Order Tracking &nbsp; 🎯</div>

        <div className="landing__awesomeFeaturesText2">Track Any Purchase 🎯 and Build a Complete Personalised Online Carbon Footprint 💨!</div>

        </div>
        </div>

        </section>

        <section id="landing__howItWorks3">

        <div className={`landing__howItWorks__leftSideLeftHeader ${this.state.header3}`}>

        <div className="landing__howItWorksLeftSideContainer">

        <div className="landing__howItWorksSubtitle3">Analytics</div>

        <div className="landing__howItWorksMainTitle">Insightful Analytics &nbsp; 📈</div>

        <div className="landing__awesomeFeaturesText">Picture Insightful Analytics 📈 Into Your Carbon Footprint at Every new Purchase 🎁!</div>

        </div>
        </div>

        <div className="landing__howItWorksVideoContainer">

          <img src={require("../assets/img/landing/insightfulAnalytics.png")} className={`landing__howItWorksVideo ${this.state.computer3}`}/>

        </div>

      </section>

      <section id="landing__awesomeFeaturesSecondContainer2">

      <div className="landing__howItWorksVideoContainer2">

      <img src={require("../assets/img/landing/socialExperienceImage.png")} className={`landing__howItWorksVideoRight ${this.state.computer4}`} />
      </div>

      <div className={`landing__howItWorks__leftSide ${this.state.header4}`}>

      <div className="landing__howItWorksLeftSideContainer2">

      <div className="landing__howItWorksSubtitle3">Social</div>

      <div className="landing__howItWorksMainTitle">A Social Experience &nbsp; 🥂</div>

      <div className="landing__awesomeFeaturesText2">Reach the Leaderboard 📊 by Offsetting Your Footprint and Competing With Friends 👭!</div>

      </div>
      </div>

      </section>

      {/* <section id="landing__allFeatures">

      <Icon icon={arrowCircleLeft} className="landing__allFeaturesLeft" />

      <Icon icon={arrowCircleRight} className="landing__allFeaturesRight" />

      <div className="landing__centerMiddleTitle">
      <div className="landing__howItWorksSubtitle4">Inspire</div>
      <div className="landing__howItWorksMainTitle">All Features &nbsp; 🎮️</div>
      </div>

      <div className="landing__centerAllFeatureSection">

      <div className="landing__howItWorks__leftSide">

      <div className="landing__howItWorksLeftSideContainer">

      <div className="landing__howItWorksSubtitle5">Feature</div>

      <div className="landing__howItWorksMainTitle">Carbon Budget &nbsp; ✂️</div>

      <div className="landing__awesomeFeaturesText">Reach the global leaderboard by offsetting your footprint and competing with friends!</div>

      </div>
      </div>

      <div className="landing__howItWorksVideoContainer">

      <img src={require("../assets/img/landing/socialExperienceImage.png")} className="landing__howItWorksVideo"/>

      </div>
      </div>

      </section>*/}

        <div className="landing__statsSpacing"></div>

        <section className="cool_facts_area clearfix landing__statsSection" id="statsSection">

        <div className="landing__ourStatsBottom">
        <div className="landing__ourStasContainingDiv">
        <div className="landing__ourStatsSubtitleAc">Numbers</div>

        <div className="landing__ourStatsMainTitleAc">Our Stats &nbsp; 📈</div>
        </div>
        </div>
            <div className="container">
                <div className="row">
                    {/* <!-- Single Cool Fact--> */}
                    <div className="col-12 col-md-3 col-lg-3">
                        <div className="single-cool-fact d-flex justify-content-center wow fadeInUp" data-wow-delay="0.2s">
                            <div className="counter-area landing__ourStatsNumber4">
                                <h3><span className="counter" id="landing__numberOne">{0}</span></h3>
                            </div>
                            <div className="cool-facts-content">
                                <Icon icon={cloudDownloadOutline} className="landing__treeIcon" />
                                <p>Total <br/> Users (Beta)</p>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Single Cool Fact--> */}
                    <div className="col-12 col-md-3 col-lg-3">
                        <div className="single-cool-fact d-flex justify-content-center wow fadeInUp" data-wow-delay="0.4s">
                            <div className="counter-area landing__ourStatsNumber3">
                                <h3><span className="counter" id="landing__numberTwo">0</span></h3>
                            </div>
                            <div className="cool-facts-content">
                            <span class="iconify" data-icon="cib:gumtree" data-inline="false"></span>
                            <Icon icon={pricetagsOutline} className="landing__treeIcon" />
                                <p>Compatible<br/> Marketplaces</p>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Single Cool Fact--> */}
                    <div className="col-12 col-md-3 col-lg-3">
                        <div className="single-cool-fact d-flex justify-content-center wow fadeInUp" data-wow-delay="0.6s">
                            <div className="counter-area landing__ourStatsNumber3">
                                <h3><span className="counter"><span id="landing__numberThree">0</span>k</span></h3>
                            </div>
                            <div className="cool-facts-content">
                            <Icon icon={statsChart} className="landing__treeIcon" />
                            <p>Carbon <br/> Labels</p>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Single Cool Fact--> */}
                    <div className="col-12 col-md-3 col-lg-3">
                        <div className="single-cool-fact d-flex justify-content-center wow fadeInUp" data-wow-delay="0.8s">
                            <div className="counter-area landing__ourStatsNumber3">
                                <h3><span className="counter"><span id="landing__numberFour">{0}</span>{this.state.landingData.emTracked > 1000000 ? 'kt' : this.state.landingData.emTracked ? 't' : ''}</span></h3>
                            </div>
                            <div className="cool-facts-content">
                            <Icon icon={gumtreeIcon} className="landing__treeIcon" />
                            <p>{this.state.landingData.emTracked > 1000 ? '' : 'kg'} CO<span className="landing__statsSmall2">2</span> <br/> Tracked</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="" id="team">

        <div className="landing__ourTeamHeader">

        <div id="landing__ourTeamHeaderText" className={`ourData__subtitleAndTitle ${this.state.teamHeader}`}>
        <div className="landing__howItWorksSubtitle">Team</div>
        <div className="landing__howItWorksMainTitle">Our Stunning Team &nbsp; 👥</div>
        </div>
        </div>

        <div id="ourTeam">

                <div className={`landing__howItWorks__leftSideLeft ${this.state.teamText}`}>

                <div className="landing__howItWorksLeftSideContainer">

                <div className="landing__ourTeamSubtitle">Co-Founder</div>

                <div className="landing__ourTeamsMainTitle">Oliver Carmont &nbsp;🌿</div>

                <div className="landing__teamDesText">Founder and Frontend Developer @Carbonly. Passionate environmentalist 🌳, Activist 🥁 and Pioneer 🏃</div>

                </div>
                </div>

                <div className="landing__ourTeamPersonContainer">

                <img src={require('../assets/img/ourTeam/olivercarmont.png')} className={`landing__ourTeamPerson ${this.state.teamImage}`} />
                </div>


                </div>

            {/*     <div className="landing__ourTeamSpacing"></div>

               <div id="ourTeam2">

                <div className="landing__ourTeamPersonContainer">

                <img src={require('../assets/img/ourTeam/nickcarmont.png')} className="landing__ourTeamPerson"/>
                </div>

                <div className="landing__howItWorks__leftSide">

                <div className="landing__howItWorksLeftSideContainer">

                      <div className="landing__howItWorksSubtitle">Co-Founder</div>

                      <div className="landing__ourTeamsMainTitle">Nicolas Carmont &nbsp; 🤖</div>

                        <div className="landing__awesomeFeaturesText3">Co-Founder and Backend Developer @Carbonly. Clinton Fellow and Founder @Netzero</div>

                        </div>

                        </div>




                    </div>*/}

        </section>

        <section className="" id="awards">

        <div className="landing__ourTeamHeader">

        <div id="landing__ourAwardsText" className={`ourData__subtitleAndTitle ${this.state.awardsHeader}`}>
        <div className="landing__howItWorksSubtitle">Awards</div>
        <div className="landing__howItWorksMainTitle">Sponsors & Awards &nbsp; 🏆</div>
        </div>
        </div>

        <div className={`landing__centerAwards ${this.state.award}`}>

        <div className="landing__indAward">

        <div className="landing__awardsImageHeight">
        <a href="https://www.fortum.com/" target="_blank"><img src={require('../assets/img/landing/awardImages/pioneerImage.png')} className="landing__awardProvider1" /></a>
        </div>
        <div className="landing__awardProviderDescription">Online Startup Accelerator 🚤</div>

        <div className="landing__awardDescription">Pioneer Tournament Winner <br/> $200,000 Cloud Credits</div>

        </div>

        <div className="landing__indAward">

        <div className="landing__awardsImageHeight">
        <a href="https://www.fortum.com/" target="_blank"><img src={require('../assets/img/landing/awardImages/fortumLogo.png')} className="landing__awardProvider" /></a>
        </div>
        <div className="landing__awardProviderDescription">Largest Renewable Energy Supplier Finland ☀️</div>

        <div className="landing__awardDescription">Fortum Forward Accelerator <br/> €10,000 Grant</div>

        </div>

        <div className="landing__indAward">

        <div className="landing__awardsImageHeight">
        <a href="https://www.hackjunction.com/" target="_blank"><img  src={require('../assets/img/landing/awardImages/junctionLogo.png')} className="landing__awardProvider2" /></a>
        </div>

        <div className="landing__awardProviderDescription">Largest Hackathon Organiser Finland ✖️</div>

        <div className="landing__awardDescription">£1,000 Award</div>

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
                                    {/* <br/><div style={{ "color": "#eee", "clear": "both", "position": "absolute"}}>(Link Disabled For Beta) <a id="home__updatedLink" href="https://www.producthunt.com/upcoming/carbonly">Wanna Keep Updated?</a></div> */}

                                </div>

                            </div>
                            {/* <a className="landing__callToActionButton2" href="https://www.producthunt.com/upcoming/carbonly">Subscribe to Our Product Launch<Icon icon={arrowRightCircle} className="landing__productLaunchIcon" /></a> */}

                        <a href="https://chrome.google.com/webstore/detail/carbonly/anipbbamcfddggbegnjdmphhajmgclpn" className="landing__callToActionButton2">We're Planting One &nbsp;🌳 For Every Download!<Icon icon={arrowRightCircle} className="landing__productLaunchIcon" /></a>

        </div>
        </div>

        </section>

        <footer className="" id="footer">

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
        <div className="footer__veryBottomRemoveSpacing"></div>
        </div>
        <div style={{ "margin-bottom": "-200px"}}></div>
      </div>  : undefined}
      </>
    );
  }
}

export default Landing;
