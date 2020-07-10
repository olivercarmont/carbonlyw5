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
import '../OwnCSS/blog.scss';

import './eden/css/bootstrap.css';
import './eden/css/themify-icons.css';
import './eden/css/flaticon.css';
import './eden/vendors/fontawesome/css/all.min.css';
import './eden/vendors/animate-css/animate.css';
import './eden/css/style.css';
import './eden/css/responsive.css';

// import './landingTheme/css/responsive.css';
// import './landingTheme/style.css';
// import './landingTheme/appy/style.css';

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
      isSearching: false,
      num1: 0,
      downloadText: '',
      downloadImage: '',
      footerImage: '',
      footerText: '',
  }
  this.trackScrolling = this.trackScrolling.bind(this);
}
componentWillMount() {

      axios.post('https://carbonly.org/blogs/return-blogs', {  }, {

      })
    .then(response => {

    this.setState({ videoBlogs: response.data.videoBlogs });
    this.setState({ writtenBlogs: response.data.writtenBlogs });

    console.log('SEE EE', response.data.writtenBlogs);

   document.addEventListener('scroll', this.trackScrolling);

    })
    .catch((error) => {
      console.log(error);
    })

}
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
      {this.state.videoBlogs && this.state.writtenBlogs ? <div>

        <Helmet>
        <title>Carbonly | The Carbonly Blog</title>
        <meta name="description" content="Stay in The Loop of All Our Events at Carbonly!" />
        </Helmet>

        <div className="" style={{"background-color":"#f7f7f7"}}>

        <section className="header-top" style= {{ "position": "relative", "z-index": "50", "background-color": "#fff", "height": "100%"}}>
         <div className="container">
             <div className="row align-items-center justify-content-between">
                 <div className="col-6 col-lg-4">
                     <div className="float-left">
                         <ul className="header_social">
                             <li><a href="https://www.facebook.com/Carbonly-111577497250555" className="blog__topSocialIcon"><Icon icon={facebookIcon} /></a></li>
                             <li><a href="https://twitter.com/carbonly_org" className="blog__topSocialIcon"><Icon icon={twitterIcon} /></a></li>
                             <li><a href="https://www.youtube.com/channel/UCTYFGwIzSOs_Hf5Wcy9Ta_A" className="blog__topSocialIcon"><Icon icon={youtubeFilled} /></a></li>
                             <li><a href="https://medium.com/@carbonly.org" className="blog__topSocialIcon"><Icon icon={mediumSquareFilled} /></a></li>
                         </ul>
                     </div>
                 </div>
                 <div className="col-6 col-lg-4 col-md-6 col-sm-6 logo-wrapper">
                     <Link to="/blog" className="logo">
                         <img src={require("../assets/img/carbonlyBlogTitle.jpg")} style={{"width": "85%", "margin-top": "10px", "margin-bottom": "10px"}} alt="Carbonly (Carbonly.org) Carbon Tracking Blog" />
                     </Link>
                 </div>
                 <div className="col-lg-4 col-md-6 col-sm-6 search-trigger">
                     <div className="right-button">
                         <ul>
                             <li><a id="search" onClick={() => this.setState({ isSearching: true })} href="javascript:void(0)" className="blog__hoverGreen"><i className="fas fa-search"></i></a></li>
                             <li><Link to="/landing" style={{"z-index": "30"}} className="blog__hoverGreen">Home</Link></li>
                             <li><a href="#newsletter" style={{"z-index": "30"}} className="blog__hoverGreen">Subscribe</a></li>
                         </ul>
                     </div>
                 </div>
             </div>
         </div>
      {this.state.isSearching ? <div className="search_input" id="search_input_box">
             <div className="container" style={{"bacjground-color": "#fff"}}>
                 <form className="d-flex justify-content-between search-inner">
                     <input type="text" className="form-control" id="search_input" placeholder="Search Here" />
                     <button type="submit" className="btn"></button>
                     <span className="ti-close blogItem__closeSearchX" id="close_search" onClick={() => this.setState({ isSearching: false })} title="Close Search"></span>
                 </form>
             </div>
         </div> : undefined}
     </section>

     <header id="header" className="header_area" style={{ "height": "100%", "display": "block", "position": "relative"}}>
         <div className="main_menu">
             <nav className="navbar navbar-expand-lg navbar-light">
                 <div className="container">
                     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                         <span className="icon-bar"></span>
                         <span className="icon-bar"></span>
                         <span className="icon-bar"></span>
                     </button>

                     <div className="collapse navbar-collapse offset" id="navbarSupportedContent" style={{"background-color": "#fff", "width": "100vw"}}>
                         <ul className="nav navbar-nav menu_nav ml-auto mr-auto">
                             <li className="nav-item"><Link className="nav-link" to="/landing">Home</Link></li>
                              <li className="nav-item active"><a className="nav-link" href="#">Blog</a></li>
                             <li className="nav-item submenu dropdown">
                                 <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Categories</a>
                                 <ul className="dropdown-menu">
                                     <li className="nav-item blog__navDropdownFullWidth"><a className="nav-link blog__navDropdownFullWidth" href="#">Season 1</a></li>
                                 </ul>
                             </li>

                         </ul>
                     </div>
                 </div>
             </nav>
         </div>
     </header>

     <section className="fullwidth-block area-padding-bottom" style={{"background-color":"#f7f7f7"}}>
         <div className="container-fluid">
             <div className="row" style={{"background-color":"#f7f7f7"}}>
                 <Link to={this.state.writtenBlogs[0].blog ? this.state.writtenBlogs[0].blog.link : ''} className="col-md-6 col-lg-6 col-xl-5">
                     <div className="single-blog">
                         <div className="thumb">
                             <img className="img-fluid" src={this.state.writtenBlogs[0].blog ? this.state.writtenBlogs[0].blog.imageLink : require("./eden/img/magazine/1.jpg")} alt={this.state.writtenBlogs[0].blog ? this.state.writtenBlogs[0].blog.altTags : ''} />
                         </div>
                         <div className="short_details">
                             <div className="meta-top d-flex">
                                 <Link className={this.state.writtenBlogs[0].blog ? 'blog__basicCategory' : 'blog__greyCategory'} to="">{this.state.writtenBlogs[0].blog ? this.state.writtenBlogs[0].blog.category : 'Category'}</Link>
                             </div>
                             <a className="d-block" href="single-blog.html">
                                 <h4 className={this.state.writtenBlogs[0].blog ? 'blog__basicTitle' : 'blog__greyTitle'}>{this.state.writtenBlogs[0].blog ? this.state.writtenBlogs[0].blog.title : 'No Article Found'}</h4>
                             </a>
                             <div className="meta-bottom d-flex">
                                 <a href="#" className="blog__firstArticleDate">{this.state.writtenBlogs[0].blog ? this.state.writtenBlogs[0].blog.date : 'No Date'} </a>&nbsp;<span style={{"color": "#a5a5a5", "font-weight": "600"}}>/</span>&nbsp;
                                 <a href="#" className="blog__firstArticleAuthor">{this.state.writtenBlogs[0].blog ? this.state.writtenBlogs[0].blog.author : 'User'} </a>
                             </div>
                         </div>
                     </div>
                 </Link>

                 <Link to={this.state.writtenBlogs[1] ? this.state.writtenBlogs[1].blog.link : ''} className="col-md-6 col-lg-6 col-xl-4">
                     <div className="single-blog style_two">
                         <div className="thumb">
                             <img className="img-fluid" src={this.state.writtenBlogs[1] ? this.state.writtenBlogs[1].blog.imageLink : require("./eden/img/magazine/2.jpg")} alt={this.state.writtenBlogs[1] ? this.state.writtenBlogs[1].blog.altTags : ''} />
                         </div>
                         <div className="short_details text-center">

                             <div className="meta-top d-flex justify-content-center">
                                 <Link to="" className="blog__secondBlogItemHiglight">{this.state.writtenBlogs[1] ? this.state.writtenBlogs[1].blog.category : 'Category'}</Link>
                             </div>
                             <a className="d-block" href="single-blog.html">
                                 <h4 className="blog__secondBlogItemHiglight">{this.state.writtenBlogs[1] ? this.state.writtenBlogs[1].blog.title : 'No Article Found'}</h4>
                             </a>
                             <div className="meta-bottom d-flex justify-content-center">
                                 <a className="blog__secondBlogItemHiglight" href="#">{this.state.writtenBlogs[1] ? this.state.writtenBlogs[1].blog.date : 'No Date'} </a>&nbsp;<span style={{"color": "#fff", "font-weight": "600"}}>/</span>&nbsp;
                                 <a className="blog__secondBlogItemHiglight" href="#">{this.state.writtenBlogs[1] ? this.state.writtenBlogs[1].blog.author : 'N/a'}</a>
                             </div>
                         </div>
                     </div>
                 </Link>

                 <div className="col-lg-12 col-xl-3">
                     <div className="row">
                         <Link to={this.state.writtenBlogs[2] ? this.state.writtenBlogs[2].blog.link : ''}  className="col-12 col-md-6 col-lg-6 col-xl-12">
                             <div className="single-blog style-three m_b_30">
                                 <div className="thumb">
                                     <img className="img-fluid" src={require("./eden/img/magazine/3.jpg")} alt={this.state.videoBlogs[2] ? this.state.videoBlogs[2].blog.altTags : ''} />
                                 </div>
                                 <div className="short_details" style={{ "border-radius": "4px" }}>

                                     <div className="meta-top d-flex justify-content-center">
                                         <Link className={this.state.writtenBlogs[2] ? 'blog__basicCategory' : 'blog__greyCategory'} to="">{this.state.writtenBlogs[2] ? this.state.writtenBlogs[2].blog.category : 'Category'}</Link>
                                     </div>
                                     <a className="d-block" href="single-blog.html">
                                         <h4 className={this.state.writtenBlogs[2] ? 'blog__basicTitle' : 'blog__greyTitle'}>{this.state.writtenBlogs[2] ? this.state.writtenBlogs[2].blog.title : 'No Article Found'}</h4>
                                     </a>
                                 </div>
                             </div>

                         </Link>


                         <Link to={this.state.writtenBlogs[2] ? this.state.writtenBlogs[2].blog.link : ''} className="col-12 col-md-6 col-lg-6 col-xl-12">
                             <div className="single-blog style-three">
                                 <div className="thumb">
                                     <img className="img-fluid" src={require("./eden/img/magazine/4.jpg")} alt={this.state.videoBlogs[3] ? this.state.videoBlogs[3].blog.altTags : ''} />
                                 </div>
                                 <div className="short_details" style={{ "border-radius": "4px"}}>

                                     <div className="meta-top d-flex justify-content-center">
                                         <Link to="" className={this.state.writtenBlogs[3] ? 'blog__basicCategory' : 'blog__greyCategory'}>{this.state.writtenBlogs[3] ? this.state.writtenBlogs[3].blog.category : 'Category'}</Link>
                                     </div>
                                     <a className="d-block" href="single-blog.html">
                                         <h4 className={this.state.writtenBlogs[3] ? 'blog__basicTitle' : 'blog__greyTitle'}>{this.state.writtenBlogs[3] ? this.state.writtenBlogs[3].blog.title : 'No Article Found'}</h4>
                                     </a>
                                 </div>
                             </div>
                         </Link>


                      </div>

                 </div>
             </div>
         </div>
     </section>






     <div className="video-area background_one area-padding" style={{ "height": "1000%", "display":"block" }}>
         <div className="container">
             <div className="row">
                 <div className="area-heading blog__videoBlogsTitleTop">
                     <h3>Video Blogs</h3>
                     <p>Check Out The Latest Hightlights &nbsp;🎬</p>
                 </div>

             </div>
             <div className="row">
                 <div className="col-lg-7">
                     <Link to={this.state.videoBlogs[0] ? this.state.videoBlogs[0].blog.link : ''} className="single-blog video-style">
                         <div className="thumb">
                             <img className="img-fluid" src={this.state.videoBlogs[0] ? this.state.videoBlogs[0].blog.imageLink : require("./eden/img/magazine/11.jpg")} alt={this.state.videoBlogs[0] ? this.state.videoBlogs[0].blog.altTags : ''} />
                             <div className="play_btn">
                                 <a className="play-video" href={this.state.videoBlogs[0] ? this.state.videoBlogs[0].blog.videoLink : ''} data-animate="zoomIn"
                                 data-duration="1.5s" data-delay="0.1s"><span className="ti-control-play"></span></a>
                             </div>
                         </div>
                         <div className="short_details">
                             <div className="meta-top d-flex">
                                 <a href="#" className={this.state.videoBlogs[0] ? 'blog__basicCategory' : 'blog__greyCategory'}>{this.state.videoBlogs[0] ? this.state.videoBlogs[0].blog.category : 'Category'}</a>&nbsp;<span style={{"color": "#aaa", "font-weight": "600"}}>/</span>&nbsp;
                                 <a href="#" className={this.state.videoBlogs[0] ? 'blog__basicCategory' : 'blog__greyCategory'}>{this.state.videoBlogs[0] ? this.state.videoBlogs[0].blog.date : 'N/a'}</a>
                             </div>
                             <a className="d-block" href="">
                                 <h4 className={this.state.videoBlogs[0] ? 'blog__basicTitle' : 'blog__greyTitle'}>{this.state.videoBlogs[0] ? this.state.videoBlogs[0].blog.title : 'Article Not Found'}</h4>
                             </a>
                             <div className="meta-bottom d-flex">
                                 <a href="#"><i className="ti-comment"></i>0 Comments</a>
                                 <a href="#"><i className="ti-heart"></i> 0</a>
                                 <a href="#"><i className="ti-eye"></i> 0</a>
                             </div>
                         </div>
                     </Link>

                 </div>

                 <div className="col-lg-5">
                     <Link to={this.state.videoBlogs[1] ? this.state.videoBlogs[1].blog.link : ''} className="single-blog video-style small row m_b_30">
                         <div className="thumb col-12 col-sm-5">
                             <img className="img-fluid" src={this.state.videoBlogs[1] ? this.state.videoBlogs[1].blog.imageLink : require("./eden/img/magazine/12.jpg")} alt={this.state.videoBlogs[1] ? this.state.videoBlogs[1].blog.altTags : ''} />
                             <div className="play_btn">
                                 <a className="play-video" href={this.state.videoBlogs[1] ? this.state.videoBlogs[1].blog.videoLink : ''} data-animate="zoomIn"
                                 data-duration="1.5s" data-delay="0.1s"><span className="ti-control-play"></span></a>
                             </div>
                         </div>
                         <div className="short_details col-12 col-sm-7">
                             <div className="meta-top d-flex">
                                 <a href="#" className={this.state.videoBlogs[1] ? 'blog__basicCategory' : 'blog__greyCategory'}>{this.state.videoBlogs[1] ? this.state.videoBlogs[1].blog.category : 'Category'}</a>
                             </div>
                             <a className="d-block" href="single-blog.html">
                                 <h4 className={this.state.videoBlogs[1] ? 'blog__basicTitle' : 'blog__greyTitle'}>{this.state.videoBlogs[1] ? this.state.videoBlogs[1].blog.title : 'Article Not Found'}</h4>
                             </a>
                             <div className="meta-bottom d-flex">
                                 <a href="#"><i className="ti-time"></i>{this.state.videoBlogs[1] ? this.state.videoBlogs[1].blog.comments.length : '0'}</a>
                                 <a href="#"><i className="ti-heart"></i> {this.state.videoBlogs[1] ? this.state.videoBlogs[1].blog.likes.length : '0'}</a>
                                 <a href="#"><i className="ti-eye"></i> {this.state.videoBlogs[1] ? this.state.videoBlogs[1].blog.views : '0'}</a>
                             </div>
                         </div>
                         </Link>


                     <Link to={this.state.videoBlogs[2] ? this.state.videoBlogs[2].blog.link : ''} className="single-blog video-style small row m_b_30 ">
                         <div className="thumb col-12 col-sm-5">
                             <img className="img-fluid" src={this.state.videoBlogs[2] ? this.state.videoBlogs[2].blog.imageLink : require("./eden/img/magazine/13.jpg")} alt={this.state.videoBlogs[2] ? this.state.videoBlogs[2].blog.altTags : ''} />
                             <div className="play_btn">
                                 <a className="play-video" href={this.state.videoBlogs[2] ? this.state.videoBlogs[2].blog.videoLink : ''} data-animate="zoomIn"
                                 data-duration="1.5s" data-delay="0.1s"><span className="ti-control-play"></span></a>
                             </div>
                         </div>
                         <div className="short_details col-12 col-sm-7">
                             <div className="meta-top d-flex">
                                 <a href="#" className={this.state.videoBlogs[2] ? 'blog__basicCategory' : 'blog__greyCategory'}>{this.state.videoBlogs[2] ? this.state.videoBlogs[2].blog.category : 'Category'}</a>
                             </div>
                             <a className="d-block" href="single-blog.html">
                                 <h4 className={this.state.videoBlogs[2] ? 'blog__basicTitle' : 'blog__greyTitle'}>{this.state.videoBlogs[2] ? this.state.videoBlogs[2].blog.title : 'Article Not Found'}</h4>
                             </a>
                             <div className="meta-bottom d-flex">
                               <a href="#"><i className="ti-time"></i>{this.state.videoBlogs[2] ? this.state.videoBlogs[2].blog.comments.length : '0'}</a>
                               <a href="#"><i className="ti-heart"></i> {this.state.videoBlogs[2] ? this.state.videoBlogs[2].blog.likes.length : '0'}</a>
                               <a href="#"><i className="ti-eye"></i> {this.state.videoBlogs[2] ? this.state.videoBlogs[2].blog.views : '0'}</a>
                             </div>
                         </div>
                     </Link>

                     <Link to={this.state.videoBlogs[3] ? this.state.videoBlogs[3].blog.link : ''} id="newsletter" className="single-blog video-style small row">
                         <div className="thumb col-12 col-sm-5">
                             <img className="img-fluid" src={this.state.videoBlogs[3] ? this.state.videoBlogs[3].blog.imageLink : require("./eden/img/magazine/14.jpg")} alt={this.state.videoBlogs[3] ? this.state.videoBlogs[3].blog.altTags : ''} />
                             <div className="play_btn">
                                 <a className="play-video" href={this.state.videoBlogs[3] ? this.state.videoBlogs[3].blog.videoLink : ''} data-animate="zoomIn"
                                 data-duration="1.5s" data-delay="0.1s"><span className="ti-control-play"></span></a>
                             </div>
                         </div>
                         <div className="short_details col-12 col-sm-7">
                             <div className="meta-top d-flex">
                                 <a href="#" className={this.state.videoBlogs[3] ? 'blog__basicCategory' : 'blog__greyCategory'}>{this.state.videoBlogs[3] ? this.state.videoBlogs[3].blog.category : 'Category'}</a>
                             </div>
                             <a className="d-block" href="single-blog.html">
                                 <h4 className={this.state.videoBlogs[3] ? 'blog__basicTitle' : 'blog__greyTitle'}>{this.state.videoBlogs[3] ? this.state.videoBlogs[3].blog.title : 'Article Not Found'}</h4>
                             </a>
                             <div className="meta-bottom d-flex">
                               <a href="#"><i className="ti-time"></i>{this.state.videoBlogs[3] ? this.state.videoBlogs[3].blog.comments.length : '0'}</a>
                               <a href="#"><i className="ti-heart"></i> {this.state.videoBlogs[3] ? this.state.videoBlogs[3].blog.likes.length : '0'}</a>
                               <a href="#"><i className="ti-eye"></i> {this.state.videoBlogs[3] ? this.state.videoBlogs[3].blog.views : '0'}</a>
                             </div>
                         </div>
                     </Link>



                 </div>
             </div>
         </div>
         <div className="blog__videoBlogsRemoveSpacing"></div>
     </div>

     <div id="newsletter2">

     <div className="blog__signupNewsletterTitle">Wanna Keep in The Loop?</div>

     <div className="blog__signupNewsletterDescription">Signup to The Carbonly Blog Newsletter to Never Miss Out!</div>

     <hr className="blog__signupNewsletterLine"/>

     <div className="blog__signupNewsletterInputContainer">

     <input className="blog__signupNewsletterInput" placeholder="example@gmail.com" /><div className="blog__newsletterButton"><Icon icon={paperPlane} /></div>

     </div>

     <div className="blog__newsletterSignupSpacing"></div>

     </div>


     <div className="blog__secondSpacing"></div>

     <section className="category-page area-padding">
         <div className="container">
             <div className="row">
                 <Link to={this.state.writtenBlogs[4] ? this.state.writtenBlogs[4].blog.link : ''} className="col-md-6 col-lg-4">
                     <div className="single-category blog__whiteBackground">
                         <div className="thumb">
                             <img className="img-fluid" src={this.state.writtenBlogs[4] ? this.state.writtenBlogs[4].blog.imageLink : require("./eden/img/category/1.jpg")} alt={this.state.writtenBlogs[4] ? this.state.writtenBlogs[4].blog.altTags : ''} />
                         </div>
                         <div className="short_details">
                             <div className="meta-top d-flex">
                                 <a href="#" className={this.state.writtenBlogs[4] ? 'blog__basicCategory' : 'blog__greyCategory'}>{this.state.writtenBlogs[4] ? this.state.writtenBlogs[4].blog.category : 'Category'}</a>
                                {/* <a href="#" className="blog__basicCategory"> 15th March</a> */}
                             </div>
                             <a className="d-block" href="single-blog.html">
                                 <h4 className={this.state.writtenBlogs[4] ? 'blog__basicTitle' : 'blog__greyTitle'}>{this.state.writtenBlogs[4] ? this.state.writtenBlogs[4].blog.title : 'Article Not Found'}</h4>
                             </a>
                             <div className="meta-bottom d-flex">
                                 <a href="#"><i className="ti-comment"></i>{this.state.writtenBlogs[4] ? this.state.writtenBlogs[4].blog.comments.length : '0'}</a>
                                 <a href="#"><i className="ti-eye"></i> {this.state.writtenBlogs[4] ? this.state.writtenBlogs[4].blog.views : '0'}</a>
                             </div>
                         </div>
                     </div>
                 </Link>

                 <Link to={this.state.writtenBlogs[5] ? this.state.writtenBlogs[5].blog.link : ''} className="col-md-6 col-lg-4">
                     <div className="single-category blog__whiteBackground">
                         <div className="thumb">
                             <img className="img-fluid" src={this.state.writtenBlogs[5] ? this.state.writtenBlogs[5].blog.imageLink : require("./eden/img/category/2.jpg")} alt={this.state.writtenBlogs[5] ? this.state.writtenBlogs[5].blog.altTags : ''} />
                         </div>
                         <div className="short_details">
                             <div className="meta-top d-flex">
                                 <a href="#" className={this.state.writtenBlogs[5] ? 'blog__basicCategory' : 'blog__greyCategory'}>{this.state.writtenBlogs[5] ? this.state.writtenBlogs[5].blog.category : 'Category'}</a>
                                 {/* <a href="#" className="blog__basicCategory"> 15th March</a> */}
                             </div>
                             <a className="d-block" href="single-blog.html">
                                 <h4 className={this.state.writtenBlogs[5] ? 'blog__basicTitle' : 'blog__greyTitle'}>{this.state.writtenBlogs[5] ? this.state.writtenBlogs[5].blog.title : 'Article Not Found'}</h4>
                             </a>
                             <div className="meta-bottom d-flex">
                                <a href="#"><i className="ti-comment"></i>{this.state.writtenBlogs[5] ? this.state.writtenBlogs[5].blog.comments.length : '0'}</a>
                                <a href="#"><i className="ti-eye"></i> {this.state.writtenBlogs[5] ? this.state.writtenBlogs[5].blog.views : '0'}</a>
                             </div>
                         </div>
                     </div>
                 </Link>

                 <Link to={this.state.writtenBlogs[6] ? this.state.writtenBlogs[6].blog.link : ''} className="col-md-6 col-lg-4">
                     <div className="single-category blog__whiteBackground">
                         <div className="thumb">
                             <img className="img-fluid" src={this.state.writtenBlogs[6] ? this.state.writtenBlogs[6].blog.imageLink : require("./eden/img/category/3.jpg")} alt={this.state.writtenBlogs[6] ? this.state.writtenBlogs[6].blog.altTags : ''} />
                         </div>
                         <div className="short_details">
                             <div className="meta-top d-flex">
                                 <a href="#" className={this.state.writtenBlogs[6] ? 'blog__basicCategory' : 'blog__greyCategory'}>{this.state.writtenBlogs[6] ? this.state.writtenBlogs[6].blog.category : 'Category'} </a>
                                  {/* <a href="#" className="blog__basicCategory"> 15th March</a> */}
                             </div>
                             <a className="d-block" href="single-blog.html">
                                 <h4 className={this.state.writtenBlogs[6] ? 'blog__basicTitle' : 'blog__greyTitle'}>{this.state.writtenBlogs[6] ? this.state.writtenBlogs[6].blog.title : 'Article Not Found'}</h4>
                             </a>
                             <div className="meta-bottom d-flex">
                                  <a href="#"><i className="ti-comment"></i>{this.state.writtenBlogs[6] ? this.state.writtenBlogs[6].blog.comments.length : '0'}</a>
                                  <a href="#"><i className="ti-eye"></i> {this.state.writtenBlogs[6] ? this.state.writtenBlogs[6].blog.views : '0'}</a>
                             </div>
                         </div>
                     </div>
                 </Link>

                 {this.state.writtenBlogs.length > 4 ?

                <div>


                 <div className="col-md-6 col-lg-4">
                     <div className="single-category blog__whiteBackground">
                         <div className="thumb">
                             <img className="img-fluid" src={require("./eden/img/category/4.jpg")} alt="" />
                         </div>
                         <div className="short_details">
                             <div className="meta-top d-flex">
                                 <a href="#" className="blog__basicCategory">shoes </a>
                                  {/* <a href="#" className="blog__basicCategory"> 15th March</a> */}
                             </div>
                             <a className="d-block" href="single-blog.html">
                                 <h4 className="blog__basicTitle">Given moved air be a male earth called multiply</h4>
                             </a>
                             <div className="meta-bottom d-flex">
                                 <a href="#" ><i className="ti-comment"></i>5 Comments</a>
                                 <a href="#"><i className="ti-heart"></i> 10</a>
                             </div>
                         </div>
                     </div>
                 </div>
                 <div className="col-md-6 col-lg-4">
                     <div className="single-category blog__whiteBackground">
                         <div className="thumb">
                             <img className="img-fluid" src='' alt="" />
                         </div>
                         <div className="short_details">
                             <div className="meta-top d-flex">
                                 <a href="#" className="blog__basicCategory">shoes </a>
                                  {/* <a href="#" className="blog__basicCategory"> 15th March</a> */}
                             </div>
                             <a className="d-block" href="single-blog.html">
                                 <h4 className="blog__basicTitle">Shall for rule whose toge one may heaven to dat</h4>
                             </a>
                             <div className="meta-bottom d-flex">
                                 <a href="#"><i className="ti-comment"></i>5 Comments</a>
                                 <a href="#"><i className="ti-heart"></i> 20</a>
                             </div>
                         </div>
                     </div>
                 </div>
                 <div className="col-md-6 col-lg-4">
                     <div className="single-category blog__whiteBackground">
                         <div className="thumb">
                             <img className="img-fluid" src='' alt="" />
                         </div>
                         <div className="short_details">
                             <div className="meta-top d-flex">
                                 <a href="#" className="blog__basicCategory">shoes </a>
                                  {/* <a href="#" className="blog__basicCategory"> 15th March</a> */}
                             </div>
                             <a className="d-block" href="single-blog.html">
                                 <h4 className="blog__basicTitle">Given moved air be a male earth called multiply</h4>
                             </a>
                             <div className="meta-bottom d-flex">
                                 <a href="#"><i className="ti-comment"></i>25 Comments</a>
                                 <a href="#"><i className="ti-heart"></i> 0</a>
                             </div>
                         </div>
                     </div>
                 </div>
                 <div className="col-md-6 col-lg-4">
                     <div className="single-category blog__whiteBackground">
                         <div className="thumb">
                             <img className="img-fluid" src='' alt="" />
                         </div>
                         <div className="short_details">
                             <div className="meta-top d-flex">
                                 <a href="#" className="blog__basicCategory">shoes </a>
                                  {/* <a href="#" className="blog__basicCategory"> 15th March</a> */}
                             </div>
                             <a className="d-block" href="single-blog.html">
                                 <h4 className="blog__basicTitle">Multiply blessed light unto green moving</h4>
                             </a>
                             <div className="meta-bottom d-flex">
                                 <a href="#" className="blog__basicCategory"><i className="ti-comment"></i>5 Comment</a>
                                 <a href="#" className="blog__basicCategory"><i className="ti-heart"></i> 0</a>
                             </div>
                         </div>
                     </div>
                 </div>
                 <div className="col-md-6 col-lg-4">
                     <div className="single-category blog__whiteBackground">
                         <div className="thumb">
                             <img className="img-fluid" src='' alt="" />
                         </div>
                         <div className="short_details">
                             <div className="meta-top d-flex">
                                 <a href="#" className="blog__basicCategory">shoes </a>
                                 {/* <a href="#" className="blog__basicCategory"> 15th March</a> */}
                             </div>
                             <a className="d-block" href="single-blog.html">
                                 <h4 className="blog__basicTitle">Shall for rule whose toge one may heaven to dat</h4>
                             </a>
                             <div className="meta-bottom d-flex">
                                 <a href="#"><i className="ti-comment"></i>5 Comments</a>
                                 <a href="#"><i className="ti-heart"></i> 0 </a>
                             </div>
                         </div>
                     </div>
                 </div>
                 <div className="col-md-6 col-lg-4">
                     <div className="single-category blog__whiteBackground">
                         <div className="thumb">
                             <img className="img-fluid" src='' alt="" />
                         </div>
                         <div className="short_details">
                             <div className="meta-top d-flex">
                                 <a href="#" className="blog__basicCategory">Shoes </a>
                                  {/* <a href="#" className="blog__basicCategory"> 15th March</a> */}
                             </div>
                             <a className="d-block" href="single-blog.html">
                                 <h4 className="blog__basicTitle">Given moved air be a male earth called multiply</h4>
                             </a>
                             <div className="meta-bottom d-flex">
                                 <a href="#"><i className="ti-comment"></i>5 Comments</a>
                                 <a href="#"><i className="ti-heart"></i> 0 </a>
                             </div>
                         </div>
                     </div>
                 </div>

                 </div> : undefined}

                 <div className="col-12 text-center">
                     <a onClick={() => this.setState({ showMoreClicked: true })} className="main_btn blog__showMoreButton trytry">Load More <span className="ti-angle-double-right"></span></a>

                     {this.state.showMoreClicked ? <div className="blog__nothingToShowMessage">Nothing to Show 😟</div> : undefined}
                 </div>
             </div>
         </div>
     </section>


     <section id="downloadSection" className="cool_facts_area clearfix blog__downloadSectionTopContainer">

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
          <div className="landing__individualPageLinks"><Link to="/features" className="landing__individualPageLinksText"><Icon icon={gamepadIcon} /> &nbsp; Features</Link></div>
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
