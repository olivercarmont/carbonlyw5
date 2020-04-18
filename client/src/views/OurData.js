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

import './landingTheme/css/responsive.css';
import './landingTheme/style.css';
import './landingTheme/appy/style.css';

import { Icon, InlineIcon } from '@iconify/react';
import caretDown from '@iconify/icons-fa-solid/caret-down';
import arrowBackOutline from '@iconify/icons-ion/arrow-back-outline';
import homeIcon from '@iconify/icons-fa-solid/home';
import chromeIcon from '@iconify/icons-icomoon-free/chrome';


import phonePortrait from '@iconify/icons-ion/phone-portrait-outline';
import fruitCherries from '@iconify/icons-mdi/fruit-cherries';
import smogIcon from '@iconify/icons-mdi/smog';
import globeShowingEuropeAfrica from '@iconify/icons-emojione-monotone/globe-showing-europe-africa';

import { Link } from "react-router-dom";

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

class OurData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      howItWorks: 'account',
  }
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
                                        <li className="nav-item"><Link to="/landing" className="nav-link" id="landing__navLinkHover">About</Link></li>
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
                            <a href="#">Home <Icon icon={homeIcon} className="landing__chromeIconTop" /> (OR SIGNIN)</a>
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
                            <h2 id="landingPage__mainLogoText">Our Data</h2>
                            <h3><img className="landingPage__backgroundLogo" src={logo}/></h3>
                            <p className="landingPage__description">Carbonly</p>
                        </div>
                        <div className="get-start-area">
                            {/* <!-- Form Start --> */}
                            <div className="col-12 col-lg-2">
                                <div className="sing-up-button d-none d-lg-block" id="landing__positioningTopAddButton">
                                  <a href="#">Add to Chrome <Icon icon={chromeIcon} className="landing__chromeIconTop" /></a> {/*  <a href="#">Scroll Down <Icon icon={caretDown} className="landing__chromeIconTop" /></a> */}
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

        <div className="landing__howItWorksMainTitle">How We Collect Data &nbsp;💾️</div>

        <div onClick={() => { this.setState({ howItWorks: 'account' })}} className={this.state.howItWorks === 'account' ? 'landing__howItWorksFirstContainerSelected' : 'landing__howItWorksFirstContainer'}>
        <div className="landing__howItWorksFirstPoint">1. Scientific Studies &nbsp;📑</div>

        <div className="landing__howItWorksDescription">We try our very best to the most up-to-date studies!</div>
        </div>

        <div onClick={() => { this.setState({ howItWorks: 'buy' })}} className={this.state.howItWorks === 'buy' ? 'landing__howItWorksFirstContainerSelected' : 'landing__howItWorksFirstContainer'}>
        <div className="landing__howItWorksFirstPoint">2. Partnering Organisations &nbsp;👨‍💼️</div>

        <div className="landing__howItWorksDescription">Our partners that help share their hard-earned data are a massive help!</div>
        </div>

        <div onClick={() => { this.setState({ howItWorks: 'track' })}} className={this.state.howItWorks === 'track' ? 'landing__howItWorksFirstContainerSelected' : 'landing__howItWorksFirstContainer'}>
        <div className="landing__howItWorksFirstPoint">3. Company Reports &nbsp;🏢</div>

        <div className="landing__howItWorksDescription">Companies themselves do in fact report highly accurate data!</div>
        </div>

        </div>


        </div>

        <div className="landing__howItWorksVideoContainer">

        <img src="https://res.cloudinary.com/netzero/image/upload/v1586440976/scrolling123_k27u53.gif" className="landing__howItWorksVideo"/>
        </div>

        </section>

        <section className="cool_facts_area clearfix landing__statsSection">

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
                            <div className="counter-area ourData__ourStatsNumber4">
                                <h3><span className="counter">2k</span></h3>
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
                            <div className="counter-area ourData__ourStatsNumber3">
                                <h3><span className="counter">1.5k</span></h3>
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
                                <h3><span className="counter">10k</span></h3>
                            </div>
                            <div className="cool-facts-content">
                            <Icon icon={smogIcon} className="landing__treeIcon" />
                            <p>kg CO<span className="landing__statsSmall2">2</span> <br/> Measured</p>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Single Cool Fact--> */}
                    <div className="col-12 col-md-3 col-lg-3">
                        <div className="single-cool-fact d-flex justify-content-center wow fadeInUp" data-wow-delay="0.8s">
                            <div className="counter-area ourData__ourStatsNumber">
                                <h3><span className="counter">15</span></h3>
                            </div>
                            <div className="cool-facts-content">
                            <Icon icon={globeShowingEuropeAfrica} className="landing__treeIcon" />
                            <p>Countries <br/> (Origin)</p>
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

        <div className="ourData__descriptionBelowDonate">Our data is nowhere near perfect. We're constant trying our best to make it the most accurate we can. However, if you have accurate data at your disposal that you wouldn't mind sharing with us, this would be invaluable ❤️</div>
        </div>

        <div className="ourData__donateCentering">

        <div className="ourData__donateFormCentering">

        <div className="ourData__indFormContainer">
        <div className="ourData__donateSubtitle">Email</div>
        <input className="ourData__donateInput" placeholder="Psst. We'll only use this to contact you! You are Anonymous! 🕵" />
        {/* <div className="ourData__donateDisclaimer"></div> */}
        </div>

        <div className="ourData__indFormContainer">
        <div className="ourData__donateSubtitle">Message</div>
        <textarea className="ourData__donateTextarea" placeholder="Don't worry about fitting all the data here, we'll follow up! 👋" />
        {/* <div className="ourData__donateDisclaimer"></div> */}
        </div>

        <div className="ourData__submitButtonPositioning">

        <div href="https://www.tesco.com" className="ourData__goToButton">Send &nbsp; 🚀</div>

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
          <div className="landing__individualPageLinks"><Link to="/about" className="landing__individualPageLinksText">About</Link></div>
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
        {/* <!-- ***** Footer Area Start ***** --> */}
        </div>
      </>
    );
  }
}

export default OurData;
