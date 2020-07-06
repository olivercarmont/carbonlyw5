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
import {Helmet} from "react-helmet";

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

// import '../OwnCSS/landing.scss';
// import '../OwnCSS/ourData.css';

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

import emailaltIcon from '@iconify/icons-whh/emailalt';
import bxlPinterest from '@iconify/icons-bx/bxl-pinterest';
import commentsIcon from '@iconify/icons-fa-solid/comments';
import heartFilled from '@iconify/icons-ant-design/heart-filled';
import baselineRemoveRedEye from '@iconify/icons-ic/baseline-remove-red-eye';

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

let location;

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      howItWorks: 'account',
      allFeatures: "budget",
      newsletterEmail: '',
      num1: 0,
      downloadText: '',
      downloadImage: '',
      footerImage: '',
      footerText: '',
  }
  this.trackScrolling = this.trackScrolling.bind(this);
}
componentDidMount() {

  location = window.location.href;

  let indexBlogs = location.indexOf('/blogs');

  location = location.slice(indexBlogs+1, location.length)

  if (location.includes('#')) {
    let locOfHash = location.indexOf('#');
    location = location.slice(0, locOfHash);
  }

  console.log('LOC', location);

  if (localStorage.jwtToken) {

  axios.post('https://carbonly.org/blogs/return-blog', { jwt: localStorage.jwtToken, link: location  }, {
    jwt: localStorage.jwtToken, "link": location
  })
.then(response => {

  console.log('SEE', response.data)

this.setState({ blog: response.data.blog });
this.setState({ likes: response.data.blog.likes });
this.setState({ comments: response.data.blog.comments });
this.setState({ allBlogs: response.data.allBlogs });
this.setState({ user: response.data.userProps });
this.setState({ allUsers: response.data.allUsersArray });

  axios.post('http://localhost:3000/blogs/add-page-view', { link: location  }, {
    "link": location
  })
.then(response => {

})
.catch((error) => {
  console.log('E', error);
})

let hasLiked = false;

response.data.blog.likes.map((user) => {
  if (user == response.data.userProps.publicId) {
    hasLiked = true;
  }
})

this.setState({ hasLiked: hasLiked })

console.log('1', response)
// console.log('2', response.data.allBlogs)
// console.log('3', response.data.userProps)

// console.log('SEE EE', response.data.writtenBlogs);

if (response.data.blogNotFound) {
  this.setState({ error: true });
}

document.addEventListener('scroll', this.trackScrolling);

})
.catch((error) => {
  console.log('E', error);
})

} else {

  axios.post('https://carbonly.org/blogs/return-blog', { link: location }, {
    "link": location
  })
.then(response => {

  this.setState({ blog: response.data.blog });
  this.setState({ likes: response.data.blog.likes });
  this.setState({ comments: response.data.blog.comments });
  this.setState({ allBlogs: response.data.allBlogs });
  // this.setState({ user: response.data.userProps });
  this.setState({ allUsers: response.data.allUsersArray });

  console.log('1', response)
  // console.log('2', response.data.allBlogs)
  // console.log('3', response.data.userProps)

  // console.log('SEE EE', response.data.writtenBlogs);

  if (response.data.blogNotFound) {
    this.setState({ error: true });
  }

document.addEventListener('scroll', this.trackScrolling);

})
.catch((error) => {
  console.log(error);
})

}

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
findNumSeasons() {
  let arrayBlogs = this.state.allBlogs;
  let nums1 = 0, nums2 = 0, nums3 = 0, nums4 = 0;

  arrayBlogs.map((blog) => {
    if (blog.blog.category.includes('Season 1')) {
      nums1++;
    } else if (blog.blog.category.includes('Season 2')) {
      nums2++;
    } else if (blog.blog.category.includes('Season 3')) {
      nums3++;
    } else if (blog.blog.category.includes('Season 4')) {
      nums4++;
    }
  })
  return [nums1, nums2, nums3, nums4];
}
postAComment() {
  if (localStorage.jwtToken && this.state.commentBody.length > 0) {

  let time = new Date();

  let commentData = {
    body: this.state.commentBody,
    publicId: this.state.user.publicId,
    time,
  }

  axios.post('https://carbonly.org/blogs/post-comment', { userPublicId: this.state.user.publicId, link: location, commentData }, {
    userPublicId: this.state.user.publicId, "link": location, commentData
  })
  .then(response => {

  this.setState({ comments: response.data.comments });

  })
  .catch((error) => {
  console.log('E', error);
  })
  }
}
changeLike() {
  if (localStorage.jwtToken) {

  axios.post('https://carbonly.org/blogs/change-like', { userPublicId: this.state.user.publicId, link: location  }, {
    userPublicId: this.state.user.publicId, "link": location
  })
.then(response => {

  this.setState({ likes: response.data.likes });
  this.setState({ hasLiked: !this.state.hasLiked });
})
.catch((error) => {
  console.log('E', error);
})
}
}
findUserProps(publicId) {

  let userf = '';

  this.state.allUsers.map((user) => {
    // console.log('1', user.publicId);
    // console.log('2', publicId);
    if (user.publicId == publicId) {
      console.log('FOUND', user)
      userf = user;
      return user;
    }
  });

  return userf;

}
formatDate(date) {

  let acDate = new Date(Date.parse(date));

  console.log('DI', date);

  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

 let formattedDate = `${acDate.getDate()} ${months[acDate.getMonth()]} ${acDate.getFullYear()}`;
 return formattedDate;

}
addToNewsletter(e) {

  e.preventDefault();

  if (this.state.newsletterEmail.length > 0) {

  axios.post('http://localhost:3000/form/add-to-newsletter', { email: this.state.newsletterEmail  }, {
    email: this.state.newsletterEmail
  })
.then(response => {

  console.log('RESSS', response)

  this.setState({ newsLetterReponse: response.data });

  this.setState({ hasSubmittedNewsletter: true });

  this.setState({ emailNewsletterChanged: false })

})
.catch((error) => {
  console.log('E', error);
})
}

}
changeNewsletterEmail(e) {

  this.setState({ newsletterEmail: e.target.value })

  this.setState({ emailNewsletterChanged: true })
}
shouldBeSubscribed() {
  console.log('HasSubmit', this.state.hasSubmittedNewsletter);
  console.log('hasChanged', this.state.emailNewsletterChanged);
  console.log('User', this.state.user);

  if (this.state.emailNewsletterChanged) {
    return false;
  }

  if (this.state.hasSubmittedNewsletter && !this.state.emailNewsletterChanged) {
    return true;
  } else {
    if (this.state.user) {
      return true;
    } else {
      return false;
    }
  }
}
render() {
    return (
      <>
      {this.state.blog && this.state.allBlogs && this.state.allUsers ? <div>

        <div className="" style={{"background-color":"#f7f7f7"}}>

        <Helmet>
              <title>Carbonly Blog: {this.state.blog.title}</title>
              <meta name="description" content={this.state.blog.description} />

              <meta property="og:image" content={this.state.blog.imageLink} />
              <meta property="og:url" content={`https://www.carbonly.org/${this.state.blog.link}`} />
              <meta property="og:image:width" content={this.state.blog.description} />
              <meta property="og:image:height" content={this.state.blog.description} />
              <meta description="og:description" content={this.state.blog.description} />
              <meta description="og:title" content={this.state.blog.title} />

              <meta itemprop="name" content={this.state.blog.title} />
              <meta itemprop="description" content={this.state.blog.description} />

              <meta name="twitter:title" content={this.state.blog.title} />
              <meta name="twitter:description" content={this.state.blog.description} />
              <meta name="twitter:image" content={this.state.blog.imageLink} />

              <meta property="og:site_name" content={this.state.blog.title} />

              <meta name="robots" content="index, follow" />
              <meta charset="UTF-8" />
          </Helmet>

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

     <header id="header" className="header_area" style={{ "height": "100%", "display": "block", "position": "relative", "margin-bottom": "-130px"}}>
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
                              <li className="nav-item"><Link className="nav-link" to="/blog">Blog</Link></li>
                             <li className="nav-item active submenu dropdown">
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

<section className="blog_area single-post-area area-padding">
  <div className="container">
      <div className="row">
          <div className="col-lg-8 posts-list">
              <div className="single-post">
                  <div className="feature-img">
                      {/* <img className="img-fluid blogItem__mainImage" src={this.state.blog.imageLink} alt="" /> */}
                  </div>

                  <div className="blog_details">
                      <p className="blogItem__topCategory">{this.state.blog.category}</p>
                      <h2 className="blogItem__topTitle">{this.state.blog.title}</h2>
                      <ul className="blog-info-link mt-3 mb-4">
                          <li><a href="#"><i className="far fa-user"></i> {this.state.blog.tags[0]}, {this.state.blog.tags[1]}</a></li>
                          <li><a href="#"><i className="far fa-comments"></i>{this.state.blog.comments.length} {this.state.blog.comments.length === 1 ? 'Comment' : 'Comments'}</a></li>
                      </ul>




                      <div id="blogItem__mainContent" style={{ "color": "#222"}} dangerouslySetInnerHTML={{ __html: this.state.blog.body }}>


                      </div>






                  </div>
              </div>

              <div style={{"margin-top":"25px", "width":"90%", "margin-left":"auto", "margin-right":"auto" }}>


              <div className="navigation-top">
                  <div className="d-sm-flex justify-content-between text-center">
                      <p className="like-info" onClick={() => this.changeLike()} style={{ "color": "#999", "cursor": "pointer"}}><span className="align-middle"><i className={this.state.hasLiked ? 'fas fa-heart' : "far fa-heart"}></i></span> {this.state.likes.length} {this.state.likes.length === 1 ? 'person likes this' : 'people like this'}</p>
                      <div className="col-sm-4 text-center my-2 my-sm-0">
                          <a href="#comments" className="comment-count" style={{ "color": "#999"}}><span className="align-middle"><i className="far fa-comment"></i></span>{this.state.comments.length} {this.state.comments.length === 1 ? 'Comment' : 'Comments'}</a>
                      </div>
                      <ul className="social-icons">
                          <li><a target="_blank" href={this.state.blog.facebookLink} className="blog__topSocialIcon"><Icon icon={facebookIcon} /></a></li>
                          <li><a target="_blank" href={this.state.blog.twitterLink} className="blog__topSocialIcon"><Icon icon={twitterIcon} /></a></li>
                          <li><a target="_blank" href={this.state.blog.emailLink} className="blog__topSocialIcon"><Icon icon={bxlPinterest} /></a></li>
                          <li><a target="_blank" href={this.state.blog.pinterestLink} className="blog__topSocialIconEmail"><Icon icon={emailaltIcon} /></a></li>
                      </ul>
                  </div>

                  </div>


                  <div className="navigation-area">
                      <div className="row">
                          <div className="col-lg-6 col-md-6 col-12 nav-left flex-row d-flex justify-content-start align-items-center">
                              <div className="thumb">
                                  <a href="#" className="blogItem__nextAndPrevImgs">
                                      <img className="img-fluid" src={require("./eden/img/blog/prev.jpg")} alt="Carbonly Blog Previous Post Image" />
                                  </a>
                              </div>
                              <div className="arrow">
                                  <a href="#">
                                      <span className="lnr text-white lnr-arrow-left"></span>
                                  </a>
                              </div>
                              <div className="detials">
                                  <p className="blogItem__nextArticles">Prev Post</p>
                                  <a href="#">
                                      <h4 style={{ "color":"#aaa"}}>Nothing to Show</h4>
                                  </a>
                              </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-12 nav-right flex-row d-flex justify-content-end align-items-center" style={{"float":"right"}}>
                              <div className="detials">
                                  <p className="blogItem__nextArticles">Next Post</p>
                                  <a href="#">
                                      <h4>S1E2 (Upcoming!)</h4>
                                  </a>
                              </div>
                              <div className="arrow">
                                  <a href="#">
                                      <span className="lnr text-white lnr-arrow-right"></span>
                                  </a>
                              </div>
                              <div className="thumb">
                                  <a href="#" className="blogItem__nextAndPrevImgs">
                                      <img className="img-fluid" src={require("./eden/img/blog/next.jpg")} alt="Carbonly Blog Next Post Image" />
                                  </a>
                              </div>

                          </div>
                      </div>
                  </div>
              </div>
              <span id="comments"></span>

              <div className="blog-author blogItem__authorShadow">
                  <div className="media align-items-center">
                      <Link target="_blank" to={this.state.blog.authorLink}><img src={this.state.blog.authorImage} alt={this.state.blog.authorDescription} /></Link>
                      <div className="media-body">
                          <Link target="_blank" to={this.state.blog.authorLink}>
                              <h4 className="blogItem__authorName">{this.state.blog.author}</h4>
                          </Link>
                          <p className="blogItem__authorDescription">{this.state.blog.authorDescription}</p>
                      </div>
                  </div>
              </div>

              <div className="comments-area">
                  <h4>{this.state.comments.length} {this.state.comments.length === 1 ? 'Comment' : 'Comments'}</h4>


                  {this.state.comments.map((comment) => {

                   let user = this.findUserProps(comment.publicId);

                   if (user) {

                    return (<div className="comment-list"><div className="single-comment justify-content-between d-flex">
                          <div className="user justify-content-between d-flex">
                              <div className="thumb">
                                  <Link target="_blank" to=""><img src={require(`../assets/img/${user.avatar}`)} className='blogItem__commentImage' alt="THE USERS NAME AND SOME INFO --> just their name" /></Link>
                              </div>
                              <div className="desc">
                                  <p className="comment">
                                      {comment.body}
                                  </p>

                                  <div className="d-flex justify-content-between">
                                      <div className="d-flex align-items-center">
                                          <h5>
                                              <Link target="_blank" to="" style={{ "font-size": "0.93em" }}>{user.name}</Link>
                                          </h5>
                                          <p className="date">{this.formatDate(comment.time)}</p>
                                      </div>

                                      <div className="reply-btn">
                                        {/*  <a href="#" className="btn-reply text-uppercase">reply</a> */}
                                      </div>
                                  </div>

                              </div>


                          </div>
                      </div>  </div>)} })}

                  <h4>Leave a Reply</h4>
                  <div className="form-contact comment_form" id="commentForm">
                      <div className="row">
                          <div className="col-12">
                              <div className="form-group">
                                  <textarea className="form-control w-100 blogItem__mainInput" name="comment" id="comment" cols="30" rows="9" placeholder="Hey, Great Article! 🎉" onChange={(e) => this.setState({ commentBody: e.target.value })} value={this.state.commentBody}></textarea>
                              </div>
                          </div>

                          {this.state.user ? <div className="blogItem__commentCaptionLoggedIn">You are posting this as <Link target="_blank" to="/profile" className="blogItem__captionLoggedInUnderline">{this.state.user.name}</Link></div> : <div className="blogItem__commentCaption">You Must Be Signed in to Comment. <Link to="/log-in" className="blogItem__commentLoginLink">Login</Link></div>}

                      </div>
                      <div className="form-group">
                          <button onClick={() => this.postAComment()} type="submit" className="button button-contactForm blogItem__hoverCommentButton">Comment 💬</button>
                      </div>
                  </div>
              </div>
          </div>


          <div className="col-lg-4">
              <div className="blog_right_sidebar">


                {/*   <aside className="single_sidebar_widget search_widget">
                      <form action="#">
                          <div className="form-group">
                              <div className="input-group mb-3">
                                  <input type="text" className="form-control" placeholder="Search Keyword" />
                                  <div className="input-group-append">
                                      <button className="btn" type="button"><i className="ti-search"></i></button>
                                  </div>
                              </div>
                          </div>
                          <button className="button rounded-0 primary-bg text-white w-100" type="submit">Search</button>
                      </form>
                  </aside>
              */}
                  <aside className="single_sidebar_widget popular_post_widget" style={{ "background-color": "#fff"}}>

                      {/* Top Stories &nbsp;🏆 */}

                      <img src={require("../assets/img/blogItem/topStories.jpg")} className="blogItem__topStoriesImg"/>

                      <h3 className="widget_title"></h3>

                      {this.state.allBlogs.slice(0,4).map((blog) => {
                        console.log('SEE', blog.blog.link)
                        return (
                        <Link to={`/${blog.blog.link}`} className="media post_item">
                            <img src={blog.blog.imageLink} className="blogItem__topStoriesImage" alt="post" />
                            <div className="media-body">
                                <a href="">
                                    <span className="blogItem__topStoriesCategory">{blog.blog.category}</span>
                                    <h3 className="blogItem__storiesTitle">{blog.blog.title}</h3>
                                </a>
                                  <p className="blogItem__storiesDes"><Icon className="blogItemm__storiesIcon" icon={commentsIcon} />{blog.blog.comments.length}</p><p className="blogItem__storiesDes"><Icon className="blogItemm__storiesIcon" icon={baselineRemoveRedEye} />{blog.blog.views+1}</p><p className="blogItem__storiesDes"><Icon className="blogItemm__storiesIcon" icon={heartFilled} />{blog.blog.likes.length}</p>
                            </div>
                        </Link>
                        );
                        })}

                  </aside>

                  <aside className="single_sidebar_widget post_category_widget" style={{ "background-color": "#fff"}}>
                      {/* Category 🌎</h4> */}

                      <img src={require("../assets/img/blogItem/categories.jpg")} className="blogItem__topStoriesImg"/>
                      <h4 className="widget_title"></h4>


                      <ul className="list cat-list">
                          <li>
                              <a href="#" className="">
                                  <p className="blogItem__categoryName">Season 1</p>&nbsp;
                                  <p className="blogItem__categoryNum">({this.findNumSeasons()[0]})</p>
                              </a>
                          </li>
                          <li>
                              <a href="#" className=""> {/* d-flex */}
                                  <p className="blogItem__categoryName">Season 2</p>&nbsp;
                                  <p className="blogItem__categoryNum">({this.findNumSeasons()[1]})</p>
                              </a>
                          </li>
                          <li>
                              <a href="#" className="">
                                  <p className="blogItem__categoryName">Season 3</p>&nbsp;
                                  <p className="blogItem__categoryNum">({this.findNumSeasons()[2]})</p>
                              </a>
                          </li>
                          <li>
                              <a href="#" className="">
                                  <p className="blogItem__categoryName">Season 4</p>&nbsp;
                                  <p className="blogItem__categoryNum">({this.findNumSeasons()[3]})</p>
                              </a>
                          </li>

                      </ul>
                  </aside>

                  <aside className="single_sidebar_widget tag_cloud_widget" style={{ "background-color": "#fff"}}>

                      {/* Tag Clouds &nbsp;☁️ */}

                      <img src={require("../assets/img/blogItem/tagClouds.jpg")} className="blogItem__topStoriesImg"/>
                      <h4 className="widget_title"></h4>

                      <ul className="list">
                          <li>
                              <a href="#" className="blogItem__tagButtons">Product</a>
                          </li>
                          <li>
                              <a href="#" className="blogItem__tagButtons">Sustainability</a>
                          </li>
                          <li>
                              <a href="#" className="blogItem__tagButtons">Technology</a>
                          </li>
                          <li>
                              <a href="#" className="blogItem__tagButtons">Industry</a>
                          </li>
                          <li>
                              <a href="#" className="blogItem__tagButtons">Environment</a>
                          </li>
                      </ul>
                      <div id="newsletter"></div>
                  </aside>

                  <aside className="single_sidebar_widget newsletter_widget" style={{ "background-color": "#fff"}}>
                      {/* Newsletter */}

                      <img src={require("../assets/img/blogItem/newsletter.jpg")} className="blogItem__topStoriesImg"/>
                      <h4 className="widget_title"></h4>

                      <form onSubmit={(e) => this.addToNewsletter(e)}>
                          <div className="form-group">
                              <input type="email" className="form-control blogItem__newsletterInput" value={this.state.newsletterEmail} onChange={(e) => this.changeNewsletterEmail(e)} placeholder={this.state.user ? this.state.user.email : 'example@gmail.com'} required />
                          </div>
                          <button className={`button rounded-0 primary-bg text-white w-100`} id={this.shouldBeSubscribed() ? 'blogItem__newsletterButtonSubscribed' : 'blogItem__newsletterButton'} type="submit">{this.shouldBeSubscribed() ? 'Subscribed' : 'Subscribe'}</button>
                      </form>
                    {this.state.newsLetterReponse ? this.state.newsLetterReponse.updated ? <div className="blogItem__newsletterResponse">Congrats You're in! 🎉 We'll Keep You in The Loop!</div> : this.state.newsLetterReponse.alreadyAdded ? <div className="blogItem__newsletterResponse">It Seems Like You're Already in This Newsletter 🤷</div> : undefined : undefined}
                  </aside>
              </div>
          </div>
      </div>
  </div>
</section>

  <div className="blogItem__bottomClearSpacing"></div>



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
          {/* <img src={require("../assets/eden/img/landing/whiteBrush.png")} style={{ "width": "450px", "position":"absolute", "z-index": "-1" }}/> */}
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
      </div>  : this.state.error ?

      <div>

          {/* COULD NOT FIND ARTICLE */}

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
                             <li><Link target="_blank" to="/landing" style={{"z-index": "30"}} className="blog__hoverGreen">Home</Link></li>
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

     <header id="header" className="header_area" style={{ "height": "100%", "display": "block", "position": "relative", "margin-bottom": "-130px"}}>
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
                              <li className="nav-item"><a className="nav-link" href="/blog">Blog</a></li>
                             <li className="nav-item active submenu dropdown">
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

     <div className="blogItem__notFoundMiddleContainer">


     <img src={require("../assets/img/blogItem/notFoundMessage.jpg")} className="blogItem__notFoundMainImage" />

     <div className="blogItem__notFoundDescription">Sorry about that; we're having some issues finding this page. Consider going to the blog home:</div>

     <div className="blogItem__notFoundButton">
        <Link to="/blog" className="main_btn blog__showMoreButton trytry">Go to Blog <span className="ti-angle-double-right"></span></Link>
      </div>

      <div className="blogItem__notFoundSpacing"></div>

     </div>


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
          {/* <img src={require("../assets/eden/img/landing/whiteBrush.png")} style={{ "width": "450px", "position":"absolute", "z-index": "-1" }}/> */}
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
      </div>






       : undefined}
      </>
    );
  }
}

export default Landing;
