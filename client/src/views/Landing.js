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
// import homeIcon from '@iconify/icons-icomoon-free/home';


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


// let features = ['budget'];

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      howItWorks: 'account',
      allFeatures: "budget"
  }
}
componentDidMount() {

  axios.post('https://carbonly.org/users/return-landing', { jwt: localStorage.jwtToken }, {
    'jwt': localStorage.jwtToken,
  })
.then(response => {

    console.log('DATA', response.data)

     // this.setState({ allUsers: response.data.info[4] });

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
returnAllEmissionsTracked() {

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
                            <h2 id="landingPage__mainLogoText">Carbonly</h2>
                            <h3><img className="landingPage__backgroundLogo" src={logo}/></h3>
                            <p className="landingPage__description">A Chrome Extension For Tracking Your Online Carbon Footprint&nbsp;💨️</p>
                        </div>


                                    {/* <a href="#">Add to Chrome <Icon icon={chromeIcon} className="landing__chromeIconTop" /></a> */}
                                    {/* <div className="landing__chromeStoreDiv"><img src={require("../assets/img/landing/chromeStoreImage.png")} /></div> */}
                                    <div className="app-download-area">
                                        <div className="app-download-btn wow fadeInUp" id="landing__positioningBottomInstallBtnUp" data-wow-delay="0.2s">
                                            {/* <!-- Google Store Btn --> */}
                                            <a href="#" className="landing__installBackground">
                                                <Icon icon={chromeIcon} className="landing__downloadChromeIcon" style={{"color": "#f2f2f2"}} />
                                                <p id="landingPage__chromeStoreButtonTextUp" style={{"color": "#f2f2f2"}} className="mb-0"><span className="landing__bottomButtonAvailable">Available on</span> Chrome Store</p>
                                            </a>
                                            <br/><div style={{ "color": "#fff", "clear": "both"}}>(Link Disabled For Beta)</div>
                                        </div>
                                      </div>


                        {/* <!-- Form End --> */}
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

                <div className="landing__topImageHeader"><img src={require("../assets/img/landing/homePageAdobe-01.svg")} alt="hero"/></div>


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

        <div className="landing__centerMiddleTitle">
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

        <iframe width="105%" height="580" style={{ "border-radius": "5px"}} src="https://www.youtube.com/embed/Kq9KCcE_Ybc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

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

        <section className="cool_facts_area clearfix landing__compatibleMarketplacesSection">

        <div className="landing__compatibleMarketplacesBottom">
        <div className="landing__ourStasContainingDivReach">
        <div className="landing__ourStatsSubtitle3">Reach</div>

        <div className="landing__ourStatsMainTitle">Compatible Marketplaces &nbsp; 🛍️</div>
        </div>
        </div>

            <div className="landing__compatibleMarketplacesPositioningCircle"><img src={require("../assets/img/companyLogos/tesco.png")} id="landing__compatibleImage" /></div>

            <div className="landing__compatibleMarketplacesPositioningCircle"><img src={require("../assets/img/companyLogos/amazon.png")} id="landing__compatibleImage2" /></div>

            <div className="landing__compatibleMarketplacesPositioningCircle"><img src={require("../assets/img/companyLogos/skyscanner.png")} id="landing__compatibleImage3" /></div>

            <div className="landing__compatibleMarketplacesPositioningCircle"><img src={require("../assets/img/companyLogos/ubereats.png")} id="landing__compatibleImage4" /></div>

            <div className="landing__compatibleMarketplacesPositioningCircle"><img src={require("../assets/img/companyLogos/foodie.png")} id="landing__compatibleImage9" /></div>

            <div className="landing__compatibleMarketplacesPositioningCircle"><img src={require("../assets/img/companyLogos/kruoka.png")} id="landing__compatibleImage10" /></div>

        </section>

        <section id="landing__howItWorks2">

        <div className="landing__howItWorks__leftSide">

        <div className="landing__howItWorksLeftSideContainer">

        <div className="landing__howItWorksSubtitle2">Data</div>

        <div className="landing__howItWorksMainTitle">Realtime Data &nbsp; 💾️</div>

        <div className="landing__awesomeFeaturesText">See the carbon footprints of your everyday products directly on the page!</div>

        </div>
        </div>

        <div className="landing__howItWorksVideoContainer">

        <img src={require("../assets/img/landing/realTimeImage.png")} className="landing__howItWorksVideo" />
        </div>

        </section>

        <section id="landing__awesomeFeaturesSecondContainer">

        <div className="landing__howItWorksVideoContainer2">

        <img src={require("../assets/img/landing/trackAPurchaseHome.png")} className="landing__howItWorksVideo" />
        </div>

        <div className="landing__howItWorks__leftSide">

        <div className="landing__howItWorksLeftSideContainer2">

        <div className="landing__howItWorksSubtitle3">Tracking</div>

        <div className="landing__howItWorksMainTitle">Order Tracking &nbsp; 🎯</div>

        <div className="landing__awesomeFeaturesText">Track Any Purchse and Build a Complete Personalised Online Carbon Footprint!</div>

        </div>
        </div>

        </section>

        <section id="landing__howItWorks3">

        <div className="landing__howItWorks__leftSide">

        <div className="landing__howItWorksLeftSideContainer">

        <div className="landing__howItWorksSubtitle3">Analytics</div>

        <div className="landing__howItWorksMainTitle">Insightful Analytics &nbsp; 📈</div>

        <div className="landing__awesomeFeaturesText">Picture insightful analytics into your carbon footprint at every new purchase!</div>

        </div>
        </div>

        <div className="landing__howItWorksVideoContainer">

          <img src={require("../assets/img/landing/insightfulAnalytics.png")} className="landing__howItWorksVideo"/>

        </div>

      </section>

      <section id="landing__awesomeFeaturesSecondContainer">

      <div className="landing__howItWorksVideoContainer2">

      <img src={require("../assets/img/landing/socialExperienceImage.png")} className="landing__howItWorksVideo" />
      </div>

      <div className="landing__howItWorks__leftSide">

      <div className="landing__howItWorksLeftSideContainer2">

      <div className="landing__howItWorksSubtitle3">Social</div>

      <div className="landing__howItWorksMainTitle">A Social Experience &nbsp; 🥂</div>

      <div className="landing__awesomeFeaturesText">Reach the leaderboard by offsetting your footprint and competing with friends!</div>

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

        <section className="cool_facts_area clearfix landing__statsSection">

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
                                <h3><span className="counter">4</span></h3>
                            </div>
                            <div className="cool-facts-content">
                                <Icon icon={cloudDownloadOutline} className="landing__treeIcon" />
                                <p>Total <br/> Installs (Beta)</p>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Single Cool Fact--> */}
                    <div className="col-12 col-md-3 col-lg-3">
                        <div className="single-cool-fact d-flex justify-content-center wow fadeInUp" data-wow-delay="0.4s">
                            <div className="counter-area landing__ourStatsNumber3">
                                <h3><span className="counter">18</span></h3>
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
                            <div className="counter-area landing__ourStatsNumber2">
                                <h3><span className="counter">1k</span></h3>
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
                            <div className="counter-area landing__ourStatsNumber">
                                <h3><span className="counter"></span></h3>
                            </div>
                            <div className="cool-facts-content">
                            <Icon icon={gumtreeIcon} className="landing__treeIcon" />
                            <p>kg CO<span className="landing__statsSmall2">2</span> <br/> Tracked</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="" id="team">

        <div className="landing__ourTeamHeader">

        <div className="ourData__subtitleAndTitle">
        <div className="landing__howItWorksSubtitle">Team</div>
        <div className="landing__howItWorksMainTitle">Our Stunning Team &nbsp; 👥</div>
        </div>
        </div>

        <div id="ourTeam">

                <div className="landing__howItWorks__leftSide">

                <div className="landing__howItWorksLeftSideContainer">

                <div className="landing__ourTeamSubtitle">Founder</div>

                <div className="landing__ourTeamsMainTitle">Oliver Carmont &nbsp;🌿</div>

                <div className="landing__teamDesText">Founder and Frontend Developer @Carbonly. Passionate environmentalist, activist and pioneer.</div>

                </div>
                </div>

                <div className="landing__ourTeamPersonContainer">

                <img src={require('../assets/img/ourTeam/olivercarmont.png')} className="landing__ourTeamPerson"/>
                </div>


                </div>
    {/*
                <div className="landing__ourTeamSpacing"></div>



                <div id="ourTeam2">

                <div className="landing__ourTeamPersonContainer">

                <img src={require('../assets/img/ourTeam/nickcarmont.png')} className="landing__ourTeamPerson"/>
                </div>

                <div className="landing__howItWorks__leftSide">

                <div className="landing__howItWorksLeftSideContainer">

                      <div className="landing__howItWorksSubtitle">Co-Founder</div>

                      <div className="landing__ourTeamsMainTitle">Nicolas Carmont &nbsp; 🤖</div>

                        <div className="landing__awesomeFeaturesText">Co-Founder and Backend Developer @Carbonly. Clinton Fellow and Founder @Netzero</div>

                        </div>

                        </div>




                    </div> */}

        </section>

        <section className="" id="awards">

        <div className="landing__ourTeamHeader">

        <div className="ourData__subtitleAndTitle">
        <div className="landing__howItWorksSubtitle">Awards</div>
        <div className="landing__howItWorksMainTitle">Sponsors & Awards &nbsp; 🏆</div>
        </div>
        </div>

        <div className="landing__centerAwards">

        <div className="landing__indAward">

        <div className="landing__awardsImageHeight">
        <a href="https://www.fortum.com/" target="_blank"><img src={require('../assets/img/landing/awardImages/fortumLogo.png')} className="landing__awardProvider"/></a>
        </div>
        <div className="landing__awardProviderDescription">Largest Renewable Energy Supplier Finland</div>

        <div className="landing__awardDescription">Fortum Forward Accelerator <br/> €10,000 Grant</div>

        </div>

        <div className="landing__indAward">

        <div className="landing__awardsImageHeight">
        <a href="https://www.hackjunction.com/" target="_blank"><img  src={require('../assets/img/landing/awardImages/junctionLogo.png')} className="landing__awardProvider"/></a>
        </div>

        <div className="landing__awardProviderDescription">Largest Hackathon Organiser Finland</div>

        <div className="landing__awardDescription">£1,000 Award</div>

        </div>

        </div>

        </section>


        <section className="cool_facts_area clearfix landing__downloadSectionTopContainer">

        <div className="landing__downloadSection">

        <div className="landing__downloadImageLeft">
                  <img src={require("../assets/img/landing/insightfulAnalytics2.gif")} className="landing__tryItNowImage"/>

        </div>

        <div className="landing__downloadTextRight">

                            <h2 id="landing__getAppTitle">What'ya Waiting For?</h2>
                            <p className="landing__downloadDescription">Download For Free on The Chrome Store!</p>
                            <div className="app-download-area">
                                <div className="app-download-btn wow fadeInUp" id="landing__positioningBottomInstallBtn" data-wow-delay="0.2s">
                                    {/* <!-- Google Store Btn --> */}
                                    <a href="#">
                                        <Icon icon={chromeIcon} className="landing__downloadChromeIcon" />
                                        <p id="landingPage__chromeStoreButtonText" className="mb-0"><span className="landing__bottomButtonAvailable">Available on</span> Chrome Store</p>
                                    </a>
                                    <br/><div style={{ "color": "#fff", "clear": "both"}}>(Link Disabled For Beta)</div>
                                </div>

                            </div>

        </div>
        </div>

        </section>

        <footer className="" id="footer">
          {/*  <!-- footer logo --> */}


          {/*  <!-- social icon--> */}

          <div className="footer__linksContainer">

          <div className="footer__left">
          {/* <img src={require("../assets/img/landing/whiteBrush.png")} style={{ "width": "450px", "position":"absolute", "z-index": "-1" }}/> */}
          <img src={logo3} className="landing__footerLogo"/><div className="footer_mainLogo"> Carbonly</div>
          <div className="footer_tagline">A Chrome Extension For Tracking Your Online Carbon Footprint&nbsp; 💨️</div>

          <div className="footer__social"><Icon icon={bxlProductHunt} className="footer__socialIcon" /><Icon icon={twitterIcon} className="footer__socialIcon" /><Icon icon={facebookIcon} className="footer__socialIcon" /></div>

            <p id="landing__footerWhiteText">Copyright ©2020 Carbonly Ltd. Designed by <a href="https://colorlib.com" target="_blank">Colorlib</a></p>

          </div>

          <div className="footer__linkSection">
          <div className="footer__linkSectionTitle">Learn</div>
          <div className="landing__individualPageLinks"><Link to="/home" className="landing__individualPageLinksText"><Icon icon={homeIcon} /> &nbsp; Home</Link></div>
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
          <img src={require("../assets/img/landing/Online shopping-pana.png")} className="footer__sideImageImage"/>
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
      </>
    );
  }
}

export default Landing;
