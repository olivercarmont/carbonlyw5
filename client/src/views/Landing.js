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

import { Link } from "react-router-dom";

import homeIcon from '@iconify/icons-fa-solid/home';
import accountArrowRight from '@iconify/icons-mdi/account-arrow-right';


//
// import './landingTheme/js/jquery-2.2.4.min.js';
// import './landingTheme/js/popper.min.js';
// import './landingTheme/js/bootstrap.min.js';
// import './landingTheme/js/plugins.js';
// import './landingTheme/js/slick.min.js';
// import './landingTheme/js/footer-reveal.min.js';
// import './landingTheme/js/active.js';

import logo from "../assets/img/carbonlyWhiteLogo.png";
import logo2 from "../assets/img/carbonly2WhiteLogo.png";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      howItWorks: 'account'
  }
}
componentDidMount() {

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
                            <h2 id="landingPage__mainLogoText">Carbonly</h2>
                            <h3><img className="landingPage__backgroundLogo" src={logo}/></h3>
                            <p className="landingPage__description">Transparentise Your World</p>
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

        <section id="landing__howItWorks">

        <div className="landing__howItWorks__leftSide">

        <div className="landing__howItWorksLeftSideContainer">

        <div className="landing__howItWorksSubtitle">Learn</div>

        <div className="landing__howItWorksMainTitle">How It Works 🛠️</div>

        <div onClick={() => { this.setState({ howItWorks: 'account' })}} className={this.state.howItWorks === 'account' ? 'landing__howItWorksFirstContainerSelected' : 'landing__howItWorksFirstContainer'}>
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

        </div>


        </div>

        <div className="landing__howItWorksVideoContainer">

        {this.state.howItWorks === 'account' ? <img src={require("../assets/img/createAnAccountAn.gif")} className="landing__howItWorksVideo"/> : undefined}

        {this.state.howItWorks === 'buy' ? <img src={require("../assets/img/checkoutFinal.gif")} className="landing__howItWorksVideo"/> : undefined}

        {this.state.howItWorks === 'track' ? <img src={require("../assets/img/AnalyticSec.gif")} className="landing__howItWorksVideo"/> : undefined}

        </div>

        </section>

        {/* Compatible Marketplaces */}

        <section className="cool_facts_area clearfix landing__compatibleMarketplacesSection">

        <div className="landing__compatibleMarketplacesBottom">
        <div className="landing__ourStasContainingDiv">
        <div className="landing__ourStatsSubtitle3">Reach</div>

        <div className="landing__ourStatsMainTitle">Compatible Marketplaces &nbsp; 🛍️</div>
        </div>
        </div>



            <div className="landing__compatibleMarketplacesPositioningCircle"><img src={require("../assets/img/companyLogos/tesco.png")} id="landing__compatibleImage" /></div>

            <div className="landing__compatibleMarketplacesPositioningCircle"><img src={require("../assets/img/companyLogos/amazon.png")} id="landing__compatibleImage2" /></div>

            <div className="landing__compatibleMarketplacesPositioningCircle"><img src={require("../assets/img/companyLogos/skyscanner.png")} id="landing__compatibleImage3" /></div>

            <div className="landing__compatibleMarketplacesPositioningCircle"><img src={require("../assets/img/companyLogos/ubereats.png")} id="landing__compatibleImage4" /></div>

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

        <img src={require("../assets/img/dataScroll.gif")} className="landing__howItWorksVideo"/>
        </div>

        </section>

        <section id="landing__awesomeFeaturesSecondContainer">

        <div className="landing__howItWorksVideoContainer2">

        <img src={require("../assets/img/insightfulAnalytics2.gif")} className="landing__howItWorksVideo2"/>
        </div>

        <div className="landing__howItWorks__leftSide">

        <div className="landing__howItWorksLeftSideContainer2">

        <div className="landing__howItWorksSubtitle3">Analytics</div>

        <div className="landing__howItWorksMainTitle">Insightful Analytics &nbsp; 📈</div>

        <div className="landing__awesomeFeaturesText">Picrture insightful analytics into your carbon footprint both in realtime and over time!</div>

        </div>
        </div>

        </section>

        <section id="landing__howItWorks3">

        <div className="landing__howItWorks__leftSide">

        <div className="landing__howItWorksLeftSideContainer">

        <div className="landing__howItWorksSubtitle4">Social</div>

        <div className="landing__howItWorksMainTitle">A Social Experience &nbsp; 🥂</div>

        <div className="landing__awesomeFeaturesText">Reach the global leaderboard by offsetting your footprint and competing with friends!</div>

        </div>
        </div>

        <div className="landing__howItWorksVideoContainer">

        <img src={require("../assets/img/socialExp.gif")} className="landing__howItWorksVideo"/>

        </div>

        </section>

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
                                <h3><span className="counter">0</span></h3>
                            </div>
                            <div className="cool-facts-content">
                                <Icon icon={cloudDownloadOutline} className="landing__treeIcon" />
                                <p>Total <br/> Installs</p>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Single Cool Fact--> */}
                    <div className="col-12 col-md-3 col-lg-3">
                        <div className="single-cool-fact d-flex justify-content-center wow fadeInUp" data-wow-delay="0.4s">
                            <div className="counter-area landing__ourStatsNumber3">
                                <h3><span className="counter">12</span></h3>
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
                                <h3><span className="counter">0</span></h3>
                            </div>
                            <div className="cool-facts-content">
                            <Icon icon={statsChart} className="landing__treeIcon" />
                            <p>kg CO<span className="landing__statsSmall2">2</span> <br/> Tracked</p>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Single Cool Fact--> */}
                    <div className="col-12 col-md-3 col-lg-3">
                        <div className="single-cool-fact d-flex justify-content-center wow fadeInUp" data-wow-delay="0.8s">
                            <div className="counter-area landing__ourStatsNumber">
                                <h3><span className="counter">0</span></h3>
                            </div>
                            <div className="cool-facts-content">
                            <Icon icon={gumtreeIcon} className="landing__treeIcon" />
                            <p>kg CO<span className="landing__statsSmall2">2</span> <br/> Offset</p>
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

                <div className="landing__ourTeamSubtitle">Co-Founder</div>

                <div className="landing__ourTeamsMainTitle">Oliver Carmont &nbsp; 🥑</div>

                <div className="landing__awesomeFeaturesText">Co-Founder and Frontend Developer @Carbonly. Passionate environmentalist, activist and pioneer.</div>

                </div>
                </div>

                <div className="landing__ourTeamPersonContainer">

                <img src={require('../assets/img/ourTeam/olivercarmont.png')} className="landing__ourTeamPerson"/>
                </div>


                </div>

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




                    </div>

        </section>

        <section className="cool_facts_area clearfix landing__downloadSectionTopContainer">

        <div className="landing__downloadSection">

        <div className="landing__downloadImageLeft">
                  <img src={require("../assets/img/insightfulAnalytics2.gif")} className="landing__tryItNowImage"/>

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
                                </div>

                            </div>

        </div>
        </div>

        </section>

        <footer className="" id="footer">
          {/*  <!-- footer logo --> */}

          <img src={logo2} className="landing__footerLogo"/>
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
                <p  id="landing__footerWhiteText">Copyright ©2020 Carbonly. Designed by <a href="https://colorlib.com" target="_blank">Colorlib</a></p>
            </div>
        </footer>
        </div>
      </>
    );
  }
}

export default Landing;
