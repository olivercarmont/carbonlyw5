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
import React, { Component, useContext } from 'react';
import { logoutUser } from "../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import classNames from "classnames";
import { Line, Bar } from "react-chartjs-2";
import axios from 'axios';
import { Link } from "react-router-dom";
import Tour from 'reactour';
import Text from "./Text";
import Glitch from "./Glitch";
import Tooltip from "./Tooltip";

import Loader from 'react-loader-spinner';

import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/core";

import '../OwnCSS/home.css';
import { ReactSortable } from "react-sortablejs";
import NotificationAlert from "react-notification-alert";

import { Icon, InlineIcon } from '@iconify/react';
import storeIcon from '@iconify/icons-fa-solid/store';
import externalLinkAlt from '@iconify/icons-fa-solid/external-link-alt';
import accountMusic from '@iconify/icons-mdi/account-music';
import accountArrowRight from '@iconify/icons-mdi/account-arrow-right';
import sadTear from '@iconify/icons-fa-regular/sad-tear';
import handPointRight from '@iconify/icons-fa-regular/hand-point-right';

import roundOpenInFull from '@iconify/icons-ic/round-open-in-full';
import closeCircleO from '@iconify/icons-zmdi/close-circle-o';
import awardIcon from '@iconify/icons-fa-solid/award';


import treeOutline from '@iconify/icons-mdi/tree-outline';
import treeIcon from '@iconify/icons-mdi/tree';

import outlineKeyboardArrowLeft from '@iconify/icons-ic/outline-keyboard-arrow-left';
import outlineKeyboardArrowRight from '@iconify/icons-ic/outline-keyboard-arrow-right';
import seedlingIcon from '@iconify/icons-fa-solid/seedling';
import personCircle from '@iconify/icons-ion/person-circle';
import checkCircle from '@iconify/icons-la/check-circle';

import leafIcon from '@iconify/icons-entypo/leaf';
import treesIcon from '@iconify/icons-foundation/trees';
import boxOpen from '@iconify/icons-fa-solid/box-open';
import searchIcon from '@iconify/icons-fa-solid/search';
import cloudIcon from '@iconify/icons-subway/cloud';
import moneyBillWave from '@iconify/icons-fa-solid/money-bill-wave';
import gumtreeIcon from '@iconify/icons-simple-icons/gumtree';
import roundLeaderboard from '@iconify/icons-ic/round-leaderboard';
import graphPie from '@iconify/icons-foundation/graph-pie';
import paperPlane from '@iconify/icons-fa/paper-plane';


// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Form,
  Row,
  Col,
  UncontrolledTooltip,
  Alert,
  UncontrolledAlert,
} from "reactstrap";

// let moment = require('moment');
 // const moment = require('moment');

// import moment from 'moment';
// let date = moment();

let amazonImg = require("../assets/img/companyLogos/amazon.png");
let bookingImg = require("../assets/img/companyLogos/booking.png");
let expediaImg = require("../assets/img/companyLogos/expedia.png");
let foodieImg = require("../assets/img/companyLogos/foodie.png");
let googleFlightsImg = require("../assets/img/companyLogos/googleFlights.png");
let kauppahalliImg = require("../assets/img/companyLogos/kauppahalli24.png");
let kayakImg = require("../assets/img/companyLogos/kayak.png");
let klmImg = require("../assets/img/companyLogos/klm.png");
let kRuokaImg = require("../assets/img/companyLogos/kruoka.png");
let momondoImg = require("../assets/img/companyLogos/momondo.png");
let skyscannerImg = require("../assets/img/companyLogos/skyscanner.png");
let tescoImg = require("../assets/img/companyLogos/tesco.png");
let tripAdvisorImg = require("../assets/img/companyLogos/tripAdvisor.png");
let uberEatsImg = require("../assets/img/companyLogos/ubereats.png");

let chartExample3;

let chart1_2_options = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  tooltips: {
    backgroundColor: "rgba(160, 209, 186, 0.88)",
    borderColor: '#fff',
    titleFontColor: "#fff",
    bodyFontColor: "#fff",
    bodySpacing: 8,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
    displayColors: false,
    callbacks: {
    label: function(tooltipItem, data) {
          return Math.round(parseInt(data['datasets'][0]['data'][tooltipItem['index']])) + 'kg CO2';
        }
      },

  },
  responsive: true,
  scales: {
    yAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.0)",
          zeroLineColor: "transparent"
        },
        ticks: {
          padding: 20,
          fontColor: "#9a9a9a"
        }
      }
    ],
    xAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          display:false
        },
        ticks: {
          padding: 20,
          fontColor: "#9a9a9a"
        }
      }
    ]
  }
};

/*
<Tooltip style={{ "color": "#8db8a2"}} data-tooltip="Check it Out! ⬇️"></Tooltip>


*/

const steps = [
  {
    selector: '',
    content: () => (
      <div>
      <Glitch data-glitch="styled" style={{ marginBottom: "1px"}}>Home</Glitch>
      <Text color="#e5e5e5">
      A Summary 📔 of All Your Tabs on Carbonly
      </Text>
      </div>
    ),
    style: {
      backgroundColor: "#fff",

    }
  },
  {
    selector: '[data-tut="tour__leaderboard"]',
    content: () => (
      <div>
      <Glitch data-glitch="styled" style={{ marginBottom: "3px"}}>Leaderboard 📊</Glitch>
      <img src={require(`../assets/img/landing/tourLeaderboard.jpg`)} style={{ marginBottom: "10px"}} />
      <Text color="#e5e5e5">
          The <span style={{ "color": "#8db8a2"}}>Carbonly Leaderboard</span>{" "}
          -Use The Tabs on The Right to Navigate to it- Will Show You The Rank of Your Friends Based on <span style={{ "color": "#8db8a2"}}>Offset Points</span>
      </Text>
      </div>
    ),
    style: {
      backgroundColor: "#fff",

    }
  },
  {
    selector: '[data-tut="tour__leaderboard"]',
    content: () => (
      <div>
      <Glitch data-glitch="styled" style={{ marginBottom: "3px"}}>Offset Points 🌳</Glitch>
      <img src={require(`../assets/img/landing/offsetPointsImage.jpg`)} style={{ marginBottom: "10px"}} />
      <Text color="#e5e5e5">
        <span style={{ "color": "#8db8a2"}}>Offset Points</span> Are a Measure of the Sustainability of Your Online Habits. Get Points From Buying Sustainable <span style={{ "color": "#8db8a2"}}>"Green-Label"</span> Products, Referring Friends And Offsetting Your Orders!
      </Text>
      </div>
    ),
    style: {
      backgroundColor: "#fff",

    }
  },
  {
    selector: '[data-tut="tour__budget"]',
    content: () => (
      <div>
      <Glitch data-glitch="styled" style={{ marginBottom: "3px"}}>Carbon Budget ✂️</Glitch>
      <img src={require(`../assets/img/landing/carbonBudget.jpg`)} style={{ marginBottom: "10px"}} />
      <Text color="#e5e5e5">
        Your Monthly Carbon Budget. Go to Your <span style={{ "color": "#8db8a2"}}>Profile</span> to Change it!
      </Text>
      </div>
    ),
    style: {
      backgroundColor: "#fff",

    }
  },
  {
    selector: '[data-tut="tour__recentOrders"]',
    content: () => (
      <div>
      <Glitch data-glitch="styled" style={{ marginBottom: "3px"}}>Recent Orders 📦</Glitch>
      <img src={require(`../assets/img/landing/homeRecentOrders.png`)} style={{ marginBottom: "10px"}} />
      <Text color="#e5e5e5">
        All Your Recent Orders And The Total Carbon Cost. Go to Your <span style={{ "color": "#8db8a2"}}>Offset</span> Page to Offset Them!
      </Text>
      </div>
    ),
    style: {
      backgroundColor: "#fff",

    }
  },
  {
    selector: '',
    content: (e) => (
      <div>
      <Glitch data-glitch="styled" style={{ marginBottom: "3px"}}>Analytics 📈</Glitch>
      <img src={require(`../assets/img/landing/analyticsTour.png`)} style={{ marginBottom: "10px"}} />
      <Text color="#e5e5e5">
        We're Now Redirecting You to Your Analytics Page 🛫
      </Text>
      <div style={{ "color": "#fff"}}>{setTimeout(function() { window.location.href = 'https://carbonly.org/analytics' }, 1000)}</div>
      </div>
    ),
    style: {
      backgroundColor: "#fff",

    }
  },
]

let props = {
  accentColor: '#86b89b',
}

const override = css`
  display: block;
  margin: 0 auto;
`;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      bigChartData: "data1",
      hasShownFeedback: false,
      isTourOpen:true,
      global: true,
      taskList: false,
      shoppingList: [],
      cur: '$',
      search: [{ name: 'Amazon US', image: amazonImg, link: "https://www.amazon.com", description: 'All Products'}, { name: 'Amazon UK', image: amazonImg, link: "https://www.amazon.co.uk", description: 'All Products'}, { name: 'Booking.com', image: bookingImg, link: "https://flights.booking.com/", description: 'All Flights'}, { name: 'Expedia', image: expediaImg, link: "https://www.expedia.com/", description: 'All Flights'}, { name: 'S-Group Foodie', image: foodieImg, link: "https://www.foodie.fi/", description: 'All Products'}, { name: 'Google Flights', image: googleFlightsImg, link: "https://www.google.com/flights", description: 'All Flights'}, { name: 'Kauppahalli24', image: kauppahalliImg, link: "https://www.kauppahalli24.fi/", description: 'All Products'}, { name: 'Kayak', image: kayakImg, link: "https://www.kayak.com/", description: 'All Flights'}, { name: 'KLM', image: klmImg, link: "https://www.klm.com", description: 'All Flights'}, { name: 'K Ruoka', image: kRuokaImg, link: "https://www.k-ruoka.fi/", description: 'All Products'}, { name: 'Momondo', image: momondoImg, link: "https://www.momondo.com/", description: 'All Flights'}, { name: 'Skyscanner', image: skyscannerImg, link: "https://www.skyscanner.com", description: 'All Flights'}, { name: 'Tesco', image: tescoImg, link: "https://www.tesco.com", description: 'All Products'}, { name: 'Trip Advisor', image: tripAdvisorImg, link: "https://www.tripadvisor.com/CheapFlightsHome", description: 'All Flights'}, { name: 'Uber Eats', image: uberEatsImg, link: "https://www.ubereats.com", description: 'All Products'}],
      compatibleMarketplaces: [{ name: 'Amazon US', image: amazonImg, link: "https://www.amazon.com", description: 'All Products'}, { name: 'Amazon UK', image: amazonImg, link: "https://www.amazon.co.uk", description: 'All Products'}, { name: 'Booking.com', image: bookingImg, link: "https://flights.booking.com/", description: 'All Flights'}, { name: 'Expedia', image: expediaImg, link: "https://www.expedia.com/", description: 'All Flights'}, { name: 'S-Group Foodie', image: foodieImg, link: "https://www.foodie.fi/", description: 'All Products'}, { name: 'Google Flights', image: googleFlightsImg, link: "https://www.google.com/flights", description: 'All Flights'}, { name: 'Kauppahalli24', image: kauppahalliImg, link: "https://www.kauppahalli24.fi/", description: 'All Products'}, { name: 'Kayak', image: kayakImg, link: "https://www.kayak.com/", description: 'All Flights'}, { name: 'KLM', image: klmImg, link: "https://www.klm.com", description: 'All Flights'}, { name: 'K Ruoka', image: kRuokaImg, link: "https://www.k-ruoka.fi/", description: 'All Products'}, { name: 'Momondo', image: momondoImg, link: "https://www.momondo.com/", description: 'All Flights'}, { name: 'Skyscanner', image: skyscannerImg, link: "https://www.skyscanner.com", description: 'All Flights'}, { name: 'Tesco', image: tescoImg, link: "https://www.tesco.com", description: 'All Flights'}, { name: 'Trip Advisor', image: tripAdvisorImg, link: "https://www.tripadvisor.com/CheapFlightsHome", description: 'All Flights'}, { name: 'Uber Eats', image: uberEatsImg, link: "https://www.ubereats.com", description: 'All Products'}],
      period: 'yearly',
      stars: 0,
      notificationDisplay: 'block',
      lineOptions: {
        scales: {
          yAxes: [{
            gridLines: {
              drawBorder: false,
            },
          }], xAxes: [{
            gridLines: {
              display: false,
            },
          }], yAxes: [{
            display: false, ticks: { reverse: true }
          }],
          xAxes: [{
            display: false
          }]
        }, legend: {
          display: false
        }, tooltips: {
          enabled: false
        }, elements: {
          point:{
            radius: 0
          }
        }
      },
  };
  this.closeTour = this.closeTour.bind(this);
}
componentWillMount() {

  axios.post('https://carbonly.org/users/return-leaderboard', { jwt: localStorage.jwtToken }, {
    'jwt': localStorage.jwtToken,
  })
.then(response => {

  // console.log('RE', response)

    if (response.data.userNotFound) {
      this.props.logoutUser();
      window.location.href = 'https://www.carbonly.org/log-in';
    }

    if (response.data.info[0].hasLoggedIn === 'f') {
      window.location.href="/click";
    }

     this.setState({ allUsers: response.data.info[4] });

    chartExample3 = {
    data: canvas => {
      let ctx = canvas.getContext("2d");

      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      let gradientStrokeRed = ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, "rgba(137, 179, 157,0.2)");
      gradientStroke.addColorStop(0.4, "rgba(137, 179, 157,0.0)");
      gradientStroke.addColorStop(0, "rgba(137, 179, 157,0)"); //blue colors

      gradientStrokeRed.addColorStop(1, "rgba(196, 143, 143,0.2)");
      gradientStrokeRed.addColorStop(0.4, "rgba(196, 143, 143,0)");
      gradientStrokeRed.addColorStop(0, "rgba(196, 143, 143,0)"); //blue colors

      return {
        labels:  this.returnMonthLabels(),
        datasets: [
          {
            label: "Emissions",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#75c79a",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#75c79a",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#75c79a",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.returnBudgetGraphData(),
          },
          {
            label: "Budget",
            fill: true,
            backgroundColor: gradientStrokeRed,
            borderColor: "#e07073",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#e07073",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#e07073",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.returnBudgetGraph(),
          },
        ]
      };
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        backgroundColor: "rgba(160, 209, 186, 0.88)",
        titleFontColor: "#fff",
        bodyFontColor: "#fff",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        displayColors: false,
        callbacks: {
        label: function(tooltipItem, data) {
          // console.log('DATA', data['datasets'][0]['data'][tooltipItem['index']] );

          let emissions = tooltipItem.yLabel;

          if (emissions > 1000000) {
            emissions = emissions / 1000000;
            return parseInt(emissions) + 'kt CO2';
          } else if (emissions > 1000) {
            emissions = emissions / 1000;
            return parseInt(emissions) + 't CO2';
          } else {
            return parseInt(emissions) + 'kg CO2';
          }
            }
          },
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false
            },
            ticks: {

              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ],
        xAxes: [
          {
            gridLines: {
              display:false
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ]
      }
    }
  };

  this.setState({ friends: response.data.info[1] });

  this.setState({ shoppingList: response.data.info[0].shoppingList });

  this.setState({ user: response.data.info[0] });

  axios.post('https://carbonly.org/form/has-submitted-form', { formId: "WO732A2", email: response.data.info[0].email }, {
    formId: "WO732A2", email: response.data.info[0].email
    })
  .then(response => {

      // console.log('RESPPPPPP', response.data.hasAnswered)

       this.setState({ hasAnsweredFeedback: response.data.hasAnswered });

       if (response) {
        this.setState({ hasReceivedFeedbackAnswer: true });
       }

       // if (hasAnswered === )
       //
       // hasAnswered

  })
  .catch((error) => {

  });

  let shuffleUsers = response.data.info[4].map((el) => {
    return el;
  })

  this.setState({ search: this.shuffleArray(shuffleUsers) });


 this.setState({ userRank: response.data.info[3].usrank });

    // this.setState({ leaderboard: response.data.info[2].slice(0, 3) });
     // console.log('user', response.data.info[0]);
     // console.log('leaderboard', response.data.info[2].slice(0, 3));
     //
     // console.log('all users', response.data.info[4]);

})
.catch((error) => {
  console.log(error);
})
}
setBgChartData = name => {
  this.setState({
    bigChartData: name,
  });
};
sendFeedback(message) {

  let totMessage = {
    message,
  }

  let time = new Date();
  let minutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();

  time = time.getDate()  + "/" + (time.getMonth()+1) + "/" + time.getFullYear() + " " +
  time.getHours() + ":" + minutes;

      axios.post('https://carbonly.org/form/add-submission', { "type": "user-feedback", "data": totMessage, time }, {
        "type": "user-feedback", "data": totMessage, time
      })
    .then(response => {

      if (response) {
        // alert(response)
        this.setState({ notificationDisplay: 'none'})

      }

    });

}
createFeedbackNotification = place => {
    var color = Math.floor(Math.random() * 5 + 1);

    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            <span style={{ textAlign: "center"}}><span style={{"font-weight":"600", "font-size":"1.1em"}}>Howdy 👋</span><div style={{ height:"1px", "clear":"both"}}></div><span style={{ "margin-top": "10px !important"}}>Wanna' Tell us How We're Doing?</span></span>
                      <div style={{ height:"6px", "clear":"both"}}></div>

              {/* this.state.stars === 0 ?
              <div className="feedback__positionStars">
              <span className="home__feedbackHover1" id="home__feedbackRatingIcon1"> <Icon icon={treeOutline} onClick={() => this.clickedStars(1)} /></span> <span2 id="home__feedbackRatingIcon2" className="home__feedbackHover2"><Icon icon={treeOutline} /></span2>  <span id="home__feedbackRatingIcon3"><Icon icon={treeOutline} /></span>  <Icon icon={treeOutline} id="home__feedbackRatingIcon4" />  <Icon icon={treeOutline} id="home__feedbackRatingIcon5" />
              </div> : undefined}

              {this.state.stars === 1 ?
              <div className="feedback__positionStars">ONE TWO THREE
              <span className="home__feedbackHover2" id="home__feedbackRatingIcon1"><Icon icon={treeIcon} onClick={() => this.setState({ stars: 1 })} /></span><span2 id="home__feedbackRatingIcon2" className="home__feedbackHover2"><Icon icon={treeOutline} /></span2>  <span id="home__feedbackRatingIcon3"><Icon icon={treeOutline} /></span>  <Icon icon={treeOutline} id="home__feedbackRatingIcon4" />  <Icon icon={treeOutline} id="home__feedbackRatingIcon5" />
              </div> : undefined */}

                <div className="">{this.state.feedbackThanks}</div>


            <div className="ourData__indFormContainer">
            <div className="home__feedbackSubtitle">Comments</div>
            <textarea className="home__feedbackTextArea" value={this.state.feedbackMessage} maxlength="1500" onChange={(e) => this.setState({ feedbackMessage: e.target.value})} placeholder="Anything Helps 😝" />
            </div>

            <div className="home__feedbackSendIcon" onClick={() => this.sendFeedback(this.state.feedbackMessage)}><Icon icon={paperPlane} /></div>



          </div>
        </div>
      ),
      type: "success",
      icon: "tim-icons icon-palette",

    };
    this.refs.notificationAlert.notificationAlert(options);

};
changeGlobal(bool) {
  this.setState({ global: bool });
  // console.log('changed');
}
returnNumberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
shuffleArray(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
returnBudgetGraph() {

  let date = new Date();
  let cur_month = date.getMonth() + 1;
  let budget = Math.round(this.state.user.budget);

  if (cur_month === 2) {

  return [ budget, budget, budget, budget, budget, budget, budget];

  } else {

  return [ budget, budget, budget, budget, budget, budget, budget, budget ];

  }

}
returnMonthLabels() {

  let date = new Date();
    let currentMonth = date.getMonth();
    let lastDay;

    if (currentMonth === 0) {
      lastDay = `31`;
    } else if (currentMonth === 1) {
      lastDay = `28`;
    } else if (currentMonth === 2) {
      lastDay = `31`;
    } else if (currentMonth === 3) {
      lastDay = `30`;
    } else if (currentMonth === 4) {
      lastDay = `31`;
    } else if (currentMonth === 5) {
      lastDay = `30`;
    } else if (currentMonth === 6) {
      lastDay = `31`;
    } else if (currentMonth === 7) {
      lastDay = `31`;
    } else if (currentMonth === 8) {
      lastDay = `30`;
    } else if (currentMonth === 9) {
      lastDay = `31`;
    } else if (currentMonth === 10) {
      lastDay = `30`;
    } else if (currentMonth === 11) {
      lastDay = `31`;
    }

    if (lastDay === `28th`) {

    return ['1 - 4', '5 - 9', '10 - 13', '14 - 17', '18 - 21', '22 - 24', '25 - 28'];

    } else {

    return ['1 - 4', '5 - 9', '10 - 13', '14 - 17', '18 - 21', '22 - 24', '25 - 28', `29 - ${lastDay}`];

    }
}
returnOffsets(amount) {

let calcData;

  if (amount === 0) {

    return `${amount}`;

  } else if (amount > 999) {

    calcData = amount;

    calcData = Math.round(calcData);

    calcData = this.returnNumberWithCommas(calcData);

    return `${calcData}`

  } else if (amount >= 10000000) {

    calcData = amount / 10000000;

    calcData = Math.round(calcData);

    calcData = this.returnNumberWithCommas(calcData);

    return `${calcData}m`

  } else {
    let calcData = Math.round(amount);
    return `${calcData}`;
  }
}
returnLeaderboardOffsets(amount) {

  let calcData = 0;

  if (amount === 0) {

    return `${amount}`;

  } else if (amount > 999) {

    calcData = amount;

    calcData = Math.round(calcData);

    return `${calcData}`

  } else if (amount >= 10000000) {

    calcData = amount / 10000000;

    calcData = Math.round(calcData);

    return `${calcData}m`

  } else {
    let calcData = Math.round(amount);
    return `${calcData}`;
  }

}
returnOffsetWidth(points) {

  let comparison;

  if (this.returnAllUsersLeaderboard()[0].publicId === this.state.user.publicId) {
    comparison = this.returnUserOffsetsLeaderboard();
  } else {
    comparison = parseFloat(this.returnAllUsersLeaderboard()[0].points);
  }

  if (points === 0) {
    return 0.25;
  } else {

  let ratio = points / comparison;

  if (ratio < 0.45) {

    return 0.45;

  } else {

    return ratio;

  }
}
}
returnUserOffsets() {

let totalPoints = 0;

this.state.user.offsets.map((off) => {
  totalPoints += parseFloat(off.points);
})

this.state.user.orders.map((or) => {
  totalPoints += parseFloat(or.points);
})

totalPoints += parseFloat(this.state.user.bonusPoints);

// console.log('offsetAmount', totalPoints)

return `${this.returnOffsets(totalPoints)}`;
}
returnAddFriendsContainerNum() {
if (this.state.friends.length < 2) {
  return 4;
}
}
  preventDrag(e) {
    e.preventDefault();
  }
  allowDrop(ev) {
  ev.preventDefault();
}

  drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}
updateSearchValue(e) {
  this.setState({ searchValue: e.target.value });
  this.updateSearchFunction(e.target.value);
}
updateSearchFunction(searchValue) {

var search = [];

// console.log('val', searchValue);

this.state.compatibleMarketplaces.map((marketplace) => {

  if (this.state.searchValue.length > 0) {
    if (marketplace.name.toLowerCase().includes(searchValue.toLowerCase())) {
      search.push(marketplace);
    }
  } else {
    search = this.state.compatibleMarketplaces;
  }

})

this.setState({ search });

}
createNewItemShoppingList() {

  let newId;

  let newArray = this.state.shoppingList;

  let newSortList = this.state.shoppingList.map((el) => { return el });

  newSortList.sort((a, b) => (a.id < b.id) ? 1 : -1)

  if (newSortList.length > 0) {
    newId = parseFloat(newSortList[0].id) + 1;
  } else {
    newId = 1;
  }

  newArray.push({ id: newId, title: '', description: ''})

  /* update the server here */
  this.setState({ shoppingList: newArray });

  axios.post('https://carbonly.org/users/update', { jwt: localStorage.jwtToken, prop: 'shoppingList', value: newArray, }, {
      prop: 'shoppingList', value: newArray, 'jwt': localStorage.jwtToken,
    })
  .then(response => {

    console.log('RE', response);

  })
  .catch((error) => {
    console.log(error);
  })

}
deleteItemShoppingList(id) {
  let newArray = this.state.shoppingList;
  let index;

  newArray.map((el) => {
    if (el.id == id) {
      index = newArray.indexOf(el);
    }
  });

  newArray.splice(index, 1);

  /* update the server here */
  this.setState({ shoppingList: newArray });

  // this.setState({ saving: 't' });

  axios.post('https://carbonly.org/users/update', { jwt: localStorage.jwtToken, prop: 'shoppingList', value: newArray, }, {
      prop: 'shoppingList', value: newArray, 'jwt': localStorage.jwtToken,
    })
  .then(response => {

    // console.log('UPDATED');

    // this.setState({ saving: 'saved' });

  })
  .catch((error) => {
    console.log(error);
  })
}

setShoppingList(newState) {
  /* update the server here */
  this.setState({ shoppingList: newState })
}
updateDescriptionShopping(e, id) {

  // console.log('event', e.target.value);

  let newArray = this.state.shoppingList;
  let index;

  newArray = newArray.map((el) => {
    if (el.id === id) {
      // console.log('id is the same', id);
      index = newArray.indexOf(el);
      return { id: el.id, title: el.title, description: e.target.value }
    } else {
      return el;
    }

  });

  // this.setState({ saving: 't' });

  // console.log('newArray', newArray);
  /* update the server here */
  this.setState({ shoppingList: newArray });

axios.post('https://carbonly.org/users/update', { jwt: localStorage.jwtToken, prop: 'shoppingList', value: newArray, }, {
    prop: 'shoppingList', value: newArray, 'jwt': localStorage.jwtToken,
  })
.then(response => {

  this.setState({ saving: 'saved' });

})
.catch((error) => {
  console.log(error);
})

}

updateTitleShopping(e, id) {

  let newArray = this.state.shoppingList;
  let index;

  newArray = newArray.map((el) => {
    if (el.id === id) {
      // console.log('id is the same', id);
      index = newArray.indexOf(el);
      return { id: el.id, title: e.target.value, description: el.description  }
    } else {
      return el;
    }

  });

  this.setState({ saving: 't' });

  // console.log('newArray', newArray);
  /* update the server here */
  this.setState({ shoppingList: newArray });

  axios.post('https://carbonly.org/users/update', { jwt: localStorage.jwtToken, prop: 'shoppingList', value: newArray, }, {
      prop: 'shoppingList', value: newArray, 'jwt': localStorage.jwtToken,
    })
  .then(response => {

    this.setState({ saving: 'saved' });

  })
  .catch((error) => {
    console.log(error);
  })

}
returnFriendsRanks() {

  let newFriends = this.state.friends.map((friend) => { return friend });

  let insertUser = this.state.user;

  insertUser['rank'] = this.state.userRank;

  let userPoints = 0;

  insertUser.offsets.map((off) => {
    userPoints += parseFloat(off.points);
  });

  insertUser.orders.map((or) => {
    userPoints += parseFloat(or.points);
  });

  insertUser['totalPoints'] = userPoints;

  newFriends.push(this.state.user);

  return newFriends.sort((a, b) => (a.rank > b.rank) ? 1 : -1)
}
returnAllUsersLeaderboard() {

  let newUsers = this.state.allUsers.map((user) => {

    if (user.publicId === this.state.user.publicId) {
      user['rank'] = this.state.userRank;
    }

    return user;

  });

  return newUsers.sort((a, b) => (a.rank > b.rank) ? 1 : -1)
}
returnFriendOffsetWidth(points) {

  let comparison = this.returnFriendsRanks()[0].points;

  if (!comparison) {
    comparison = this.returnUserOffsetsLeaderboard();
  }

  // console.log('COMP2', comparison)

  if (points === 0) {
    return 0.25;
  } else {

  let ratio = points / comparison;

  if (ratio < 0.45) {

    return 0.45;

  } else {

    return ratio;

  }
}

}
returnUserOffsetsLeaderboard() {

  let totPoints = 0;
  this.state.user.offsets.map((off) => {
    totPoints += parseFloat(off.points);
  })

  this.state.user.orders.map((off) => {
    totPoints += parseFloat(off.points);
  })

  totPoints += parseFloat(this.state.user.bonusPoints);

  return totPoints;
}
returnRanColor() {
  let num = Math.random() * (1000 - 0);

  if (num > 500) {
    return "#a9dbc0";
  } else {
    return "#e07073";
  }

}
getBudgetPercent() {

  let totalMonthEmissions = 0;

  totalMonthEmissions = this.returnBudgetGraphData()[this.returnBudgetGraphData().length-1];

  return Math.round(( (totalMonthEmissions / parseFloat(this.state.user.budget)) *100))

}
returnBudgetGraphData() {

  let date = new Date();
  let cur_month = date.getMonth() + 1;
  let cur_year = date.getFullYear();

  let tFrame0 = 0, tFrame1 = 0, tFrame2 = 0, tFrame3 = 0, tFrame4 = 0, tFrame5 = 0, tFrame6 = 0, tFrame7 = 0;

  let selectArray = this.state.user.orders;

  selectArray.map((el) => {

    let time = new Date(Date.parse(el.time));
    let orderMonth = time.getMonth() + 1;
    let orderYear = time.getFullYear();

    if ((orderMonth === cur_month) && (orderYear === cur_year)) {

    let day = time.getDate();
    let cur_amt = el.carbon;

    if (day <= 4) {
     tFrame0 += parseFloat(cur_amt);
   } else if (day > 4 && day <= 9) {
     tFrame1 += parseFloat(cur_amt);
   } else if (day > 9 && day <= 13) {
     tFrame2 += parseFloat(cur_amt);
   } else if (day > 13 && day <= 17) {
     tFrame3 += parseFloat(cur_amt);
   } else if (day > 17 && day <= 21) {
     tFrame4 += parseFloat(cur_amt);
   } else if (day > 21 && day <= 24) {
     tFrame5 += parseFloat(cur_amt);
   } else if (day > 24 && day <= 28) {
     tFrame6 += parseFloat(cur_amt);
   } else if (day > 28) {
     tFrame7 += parseFloat(cur_amt);
   }

  }
  });

  tFrame1 += tFrame0;

  tFrame2 += tFrame1;

  tFrame3 += tFrame2;

  tFrame4 += tFrame3;

  tFrame5 += tFrame4;

  tFrame6 += tFrame5;

  tFrame7 += tFrame6;

  if (cur_month === 2) {

  return [tFrame0, tFrame1, tFrame2, tFrame3, tFrame4, tFrame5, tFrame6];

  } else {

  return [ tFrame0, tFrame1, tFrame2, tFrame3, tFrame4, tFrame5, tFrame6, tFrame7 ];

  }

}
returnTotalWeek() {
  let totalEmissions = 0;
  let date = new Date()

  let start_of_week = new Date(date.getTime() - (6) * 24*60*60*1000 )
  start_of_week.setHours(0)
  start_of_week.setMinutes(0)
  start_of_week.setSeconds(0)

  this.state.user.orders.map((el) => {

    let time = new Date(Date.parse(el.time));

    if (( time <= date && time >= start_of_week) && !el.offset) {
      totalEmissions += parseFloat(el.carbon);
   }

   return this.formatEmissions(totalEmissions);

  });

  return this.formatEmissions(totalEmissions);
}
returnTotalMonth() {

  let date = new Date();
  let cur_month = date.getMonth() + 1;
  let totalEmissions = 0;

  this.state.user.orders.map((el) => {

    let time = new Date(Date.parse(el.time));
    let orderMonth = time.getMonth() + 1;

    if (orderMonth === cur_month) {
        totalEmissions += parseFloat(el.carbon);
    }

});
  return this.formatEmissions(totalEmissions);
}
returnTotalYear() {

  let date = new Date();
  var cur_year = date.getFullYear();
  let totalEmissions = 0;

  this.state.user.orders.map((el) => {

    let time = new Date(Date.parse(el.time));

    if (time.getFullYear() === cur_year) {
        totalEmissions += parseFloat(el.carbon);
    }

  });
  return this.formatEmissions(totalEmissions);
}
formatEmissions(em) {
  if (em === 0) {
      return `${em}kg CO`;
    } else {

      if (em > 999) {

        let calcData;

        calcData = em / 1000;

        calcData = calcData.toFixed(1);

        em = `${calcData}t CO `

      } else if (em >= 10000000) {

        let calcData;

        calcData = em / 10000000;

        calcData = calcData.toFixed(1);

        em = `${calcData}Mt CO`

      } else {
        let calcData = em.toFixed(1);
        em = `${calcData}kg CO`;
      }

      return em;
    }
}
returnTotalWeekCost() {
  let totalEmissions = 0;
  let date = new Date()

  let start_of_week = new Date(date.getTime() - (6) * 24*60*60*1000 )
  start_of_week.setHours(0)
  start_of_week.setMinutes(0)
  start_of_week.setSeconds(0)

  this.state.user.orders.map((el) => {

    let time = new Date(Date.parse(el.time));

    if (( time <= date && time >= start_of_week) && !el.offset) {
      totalEmissions += parseFloat(el.carbon);
   }

  });

  return (((totalEmissions/1000))*3).toFixed(2);
}
returnTotalMonthCost() {

  let date = new Date();
  let cur_month = date.getMonth() + 1;
  let totalEmissions = 0;

  this.state.user.orders.map((el) => {

    let time = new Date(Date.parse(el.time));
    let orderMonth = time.getMonth() + 1;

    if ((orderMonth === cur_month) && !el.offset) {
        totalEmissions += parseFloat(el.carbon);
    }

});
  return (((totalEmissions/1000))*3).toFixed(2);
}
returnTotalYearCost() {

  let date = new Date();
  var cur_year = date.getFullYear();
  let totalEmissions = 0;

  this.state.user.orders.map((el) => {

    let time = new Date(Date.parse(el.time));

    if ((time.getFullYear() === cur_year) && !el.offset) {
        totalEmissions += parseFloat(el.carbon);
    }

  });
  return (((totalEmissions/1000))*3).toFixed(2);
}
returnYearlyOrders() {

  let date = new Date();
  var cur_year = date.getFullYear();
  let yearOrders = [];

  this.state.user.orders.map((or) => {

  let time = new Date(Date.parse(or.time));

  if ((time.getFullYear() === cur_year) && !or.offset) {
      yearOrders.push(or);
  }

});

  yearOrders.sort((a, b) => (Date.parse(a.time) < Date.parse(b.time)) ? 1 : -1)

  return yearOrders;

}
returnOrderImage(web) {

let webImage;

if (web === 'tesco' || web === 'Tesco') {
  webImage = 'tesco.png';
} else if (web === 'Amazon') {
  webImage = 'amazon.png';
} else if (web === 'Skyscanner') {
  webImage = 'skyscanner.png';
} else if (web === 'Uber Eats') {
  webImage = `ubereats.png`;
} else if (web === 'Momondo') {
  webImage = `momondo.png`;
} else if (web === 'Booking.com') {
  webImage = `momondo.png`;
} else if (web === 'Kayak') {
  webImage = `kayak.png`;
} else if (web === 'Trip Advisor') {
  webImage = `tripAdvisor.png`;
} else if (web === 'KLM') {
  webImage = `klm.png`;
} else if (web === 'Expedia') {
  webImage = `expedia.png`;
} else if (web === 'Google Flights') {
  webImage = `googleFlights.png`;
} else if (web === 'Foodie') {
  webImage = `foodie.png`;
} else if (web === 'K Ruoka') {
  webImage = `kruoka.png`;
} else if (web === 'Kauppahalli24') {
  webImage = `kauppahalli24.png`;
}

return <img src={require(`../assets/img/companyLogos/${webImage}`)} id="analytics__ordersImage" />;
}
returnUpperCase(string) {
return string.charAt(0).toUpperCase() + string.slice(1);
}
roundNumber(num) {
  return Math.round(num * 10) / 10;
}
roundCarbon(amt) {
  if (amt >= 100) {
    return Math.round(amt);
  } else {
    return parseFloat(amt).toFixed(1);
  }
}
closeTour() {
  axios.post('https://carbonly.org/users/update', { jwt: localStorage.jwtToken, prop: 'doneTour', value: 't' }, {
     jwt: localStorage.jwtToken, prop: 'doneTour', value: 't'
  })
.then(response => {

  this.setState({ isTourOpen: false });

})
.catch((error) => {

  console.log('Error', error);
})
  // AND CHANGE USER PROPERTY OF HASDONETOUR TO BE TRUE
}
switchPage() {
  window.location.href = 'https://carbonly.org/analytics';
}
callFeebackNotification() {

  console.log('ST', this.state.hasAnsweredFeedback)

  let newTime = new Date();

  let minutesDiff = Date.parse(newTime) - Date.parse(this.state.user.dateJoined);
  minutesDiff = Math.abs(minutesDiff / 60000);

  if ((!this.state.hasAnsweredFeedback || this.state.hasAnsweredFeedback === 'f') && minutesDiff > 1440) {

    let newMessage = "n/a", answerType = 'hasSeen';

    let time = new Date();
    let minutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();

    time = time.getDate()  + "/" + (time.getMonth()+1) + "/" + time.getFullYear() + " " +
    time.getHours() + ":" + minutes;

        axios.post('https://carbonly.org/form/submit-question', { formId: "WO732A2", "email": this.state.user.email, "details": newMessage, time, answerType }, {
          formId: "WO732A2", "email": this.state.user.email, "details": newMessage, time, answerType })
         .then(response => {

             // console.log('RESPPPPPP', response.data.hasAnswered)

              // this.setState({ hasAnsweredFeedback: response.data.hasAnswered });

              // if (hasAnswered === )
              //
              // hasAnswered

         })
         .catch((error) => {

         });

  try {

  if (!this.state.hasShownFeedback) {
    this.createFeedbackNotification('bc');
    this.setState({ hasShownFeedback: true });
  }

 } catch(e) {
   console.log('E', e);
 }

}

}
returnTaskCompletion() {
  let has1 = false, has2 = false, has3 = false;
  let completion = 0;

  if (this.state.user.orders.length > 0) {
    has1 = true;
    completion += 33;
  }

  if (this.state.user.offsets.length > 0) {
    has2 = true;
    completion += 33;
  }

  if (this.state.user.bonusPoints >= 2500) {
    has3 = true;
    completion += 33;
  }

  if (completion > 64) {
    completion = 100;
  }

  console.log('SEE', [has1, has2, has3, completion])

  return [has1, has2, has3, completion]
}
render() {

    let newDateHome = new Date();
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return (
      <>
        <div className="content">

         <Helmet>
          <title>Carbonly | Home</title>
          <meta name="description" content="See The Latest Changes to Your Online Carbon Footprint!" />
        </Helmet>

        {this.state.user && this.state.allUsers && this.state.hasReceivedFeedbackAnswer ?

          <div>
          <Row>

          <Col md="6">

            <Card data-tut="tour__leaderboard">
              <CardHeader>

              {!this.state.isTourOpen && !this.state.user.hasDoneTour ? <img className="home__topRightArrow" src={require('../assets/img/landing/clickArrowHome.png')} /> : undefined}

              <div className="leaderboard__mainTitle">Leaderboard<div className="leaderboard__sideIcon"><Icon icon={roundLeaderboard} /></div> </div>

              <div className="leaderboard__topSelections"><div onClick={() => this.changeGlobal(true)} className={this.state.global ? 'leaderboard__topSelectFirst leaderboard__topSelected' : 'leaderboard__topSelectFirst leaderboard__topSelect'}>Global</div><div onClick={() => this.changeGlobal(false)} className={!this.state.global ? 'leaderboard__topSelected' : 'leaderboard__topSelect'}>Friends</div></div>

              <Link to="/leaderboard" className="home__pageLabel"><span className="home__pageLabelText">Leaderboard</span> <span className="home__pageLabelIcon"><Icon icon={roundLeaderboard} /></span></Link>

                <Form>
                  <Row>

                    <div className="leaderboard__mainContentMargins">

                    {this.state.global ? <div>

                    {this.returnAllUsersLeaderboard().map((user) => {

                      return (<div className="leaderboard__mainRow">
                      <div className={user.rank === 1 ? 'leaderboard__mainNumberOne' : user.rank === 2 ? 'leaderboard__mainNumberTwo' : user.rank === 3 ? 'leaderboard__mainNumberThree' : 'leaderboard__mainNumber'}>{user.rank}</div>
                      <a href={`/user/@${user.username}`}><img src={require(`../assets/img/${user.avatar}`)} className="leaderboard__mainImage"/></a>
                      <a href={`/user/@${user.username}`} className="leaderboard__rowFirstSection"><div id="leaderboard__mainLeaderboardTextColour" className="leaderboard__mainName">{user.name}</div><div id="leaderabord__mainLeaderboardUsernameColour" className="leaderboard__mainDate">@{user.username}</div></a>  <div className="leaderboard__progressbar"><div id="leaderBoard__progressBarContainerFriendsLeaderboard" style={{ width: (this.returnOffsetWidth(user.publicId === this.state.user.publicId ? this.returnUserOffsetsLeaderboard() : user.points) * 14) + 'vw'}}><div className="leaderboard__mainCO2Emissions"><Icon icon={seedlingIcon} className="leaderboard__pointsIcon" />{this.returnNumberWithCommas(this.returnLeaderboardOffsets(user.publicId === this.state.user.publicId ? this.returnUserOffsetsLeaderboard() : user.points))}</div></div></div>

                    {/*   <div className="leaderboard__individualLineMargins">
                          <Line
                            data={ { labels: [],
                                      datasets: [{
                                      data: [(Math.random() * (1000 - 0)),(Math.random() * (1000 - 0)), (Math.random() * (1000 - 0))],
                                      label: "Ranking",
                                      borderColor: this.returnRanColor(),
                                      fill: false
                                    }] } }
                            options={this.state.lineOptions}
                          />
                        </div> */}

                      </div>)


                    })}</div> :

                    <div className="leaderboard__friendRightShift">{this.returnFriendsRanks().map((friend) => {

                      return (
                        <div className="leaderboard__mainRow">

                        <div className="leaderboard__mainNumber">&nbsp; {friend.rank}</div>
                        <a href={`/user/@${friend.username}`}><img src={require(`../assets/img/${friend.avatar}`)} className="leaderboard__mainImage"/></a>
                        <a href={`/user/@${friend.username}`} className="leaderboard__rowFirstSection"><div id="leaderboard__mainLeaderboardTextColour" className="leaderboard__mainName">{friend.publicId === this.state.user.publicId ? 'You' : friend.name}</div><div id="leaderabord__mainLeaderboardUsernameColour" className="leaderboard__mainDate">@{friend.username}</div></a>  <div className="leaderboard__progressbar"><div id="leaderBoard__progressBarContainerFriendsLeaderboard" style={{ width: (this.returnFriendOffsetWidth(friend.publicId === this.state.user.publicId ? this.returnUserOffsetsLeaderboard() : friend.points) * 15) + 'vw'}}><div className="leaderboard__mainCO2Emissions"><Icon icon={seedlingIcon} className="leaderboard__pointsIcon" />{this.returnNumberWithCommas(this.returnLeaderboardOffsets(friend.publicId === this.state.user.publicId ? this.returnUserOffsetsLeaderboard() : friend.points))}</div></div></div>


                      {/*  <div className="leaderboard__individualLineMargins">
                            <Line
                              data={ { labels: [],
                                        datasets: [{
                                        data: [(Math.random() * (1000 - 0)),(Math.random() * (1000 - 0)), (Math.random() * (1000 - 0))],
                                        label: "Ranking",
                                        borderColor: this.returnRanColor(),
                                        fill: false
                                      }] } }
                              options={this.state.lineOptions}
                            />
                          </div> */}

                        </div>
                      )



                    })}

                    </div>

                    }

                    </div>


                  </Row>
                </Form>
                <div className="leaderboard__leaderboardBottomCardSpacing"></div>

              </CardHeader>
                <span className="leaderboard__middleCardExplanations"><span className="analytics__positionDescriptionCheck"><Icon icon={checkCircle} /></span>{this.state.global ? <span><span className="analytics__descriptionText">Carbonly's Global Leaderboard</span> &nbsp;🏆</span> : <span><span className="analytics__descriptionText">Your Friend Leaderboard</span> &nbsp;🍻</span>}</span>
            </Card>
          </Col>

          <Col lg="6">
          <Card className="card-chart" data-tut="tour__budget">
            <CardHeader>
            <Link to="/analytics" className="home__pageLabel"><span className="home__pageLabelText">Analytics</span> <span className="home__pageLabelIcon"><Icon style={{"font-size": "1.27em"}} icon={graphPie} /></span></Link>
              <h5 className="card-category">Carbon Budget</h5>
              <CardTitle tag="h3">
                <i className="tim-icons icon-bag-16 text-primary" id="analytics__destinationIconColour" />{" "}
                {this.getBudgetPercent()}%
              </CardTitle>
            </CardHeader>
            <CardBody>
              <div className="chart-area" id="analytics__middleCharts">
                <Line
                  data={chartExample3.data}
                  options={chartExample3.options}
                />
              </div>
            </CardBody>
            <span className="analytics__middleCardExplanations"><span className="analytics__positionDescriptionCheck"><Icon icon={checkCircle} /></span><span className="analytics__descriptionText">Set Personal Carbon Goals!</span> &nbsp;⛳️</span>
          </Card>
        </Col>

          </Row>

          {/*     SECOND ROW HOME    */}

            <Row>



          <Col md="6">
            <Card data-tut="tour__recentOrders">
              <CardHeader>

              <Link to="/offsets" className="home__pageLabel"><span className="home__pageLabelText">Offsets</span> <span className="home__pageLabelIcon"><Icon icon={seedlingIcon} /></span></Link>

              <div className="home__offsetsMainTitle">Recent Orders <div className="leaderboard__sideIcon"><Icon icon={boxOpen} /></div> </div>

                <Form>
                  <Row>

                  <div className="offsets__leftTopDiv">

                  {/* this.state.period === 'custom' ? <div className="offsets__orderTitle">Custom <span className="offsets__orderTitleIcon"><Icon icon={gumtreeIcon} /></span></div> : <div className="offsets__orderTitle">Orders <span className="offsets__orderTitleIcon"><Icon icon={boxOpen} /></span></div> */}

                  {this.state.period === 'custom' ? <div className="offsets__customSection">

                  <div className="offsets__customInputTopDecription">Enter an Amount:</div>

                  <span className="offsets__currency"><select className="offsets__currencySelect" value={this.state.cur} onChange={(e) => this.changeCurrency(e)}>
                  <option value="$">$</option>
                  <option value="€">€</option>
                  <option value="£">£</option>
                  <option value="kg CO2">kg CO&#x2082;</option>
                  </select></span><input value={this.state.offAmount} onChange={(e) => this.updateOffAmount(e)} className="offsets__customInput"/>

                  {this.state.offAmount ? <div className="offsets__customInputOffsetCalc">{this.getTimeSizeOfEmissions(this.state.offAmount)}</div> : undefined}

                  <div className="offsets__customSpacing"></div>

                  </div>


                  : <div className="offsets__makeNewMainDiv">

                    <div className="offsets__mainOrdersDiv">

                    <div className="offsets__centerOrders">

                    {this.state.period === 'weekly' ? this.returnWeeklyOrders().length > 0 ? this.returnWeeklyOrders().map((order) => {

                      return (<tr id="offsets__mainOrderDiv">
                        <td id="analytics__recentOrdersImageWidth">
                        {this.returnOrderImage(order.website)}
                        </td>
                        <td id="offsets__recentOrdersTextSize">
                          <p className="title" id="offsets__orderTitle">{this.returnUpperCase(order.website)}</p>
                          <p id="offsets__orderDescription" className="text-muted">
                            {order.name.length > 32 ? order.name.slice(0, 32) + ' ...' : order.name}
                          </p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip636901683"
                            title=""
                            type="button"
                          >
                            <p id="analytics__mainTextSideOrders">{this.roundCarbon(order.carbon)}kg CO<span id="analytics__ordersSmall2">2</span></p>
                          </Button>
                        </td>
                      </tr>);


                    }) : <div><div className="offsets__notOrdersFoundIcon"><Icon icon={searchIcon} /></div> <div className="offsets__notOrdersFoundTitle">No Orders to Found</div><div className="offsets__notOrdersFound">You're All Set! </div></div> : undefined}

                    </div>

                    <div className="offsets__centerOrders">

                    {this.state.period === 'monthly' ? this.returnMonthlyOrders().length > 0 ? this.returnMonthlyOrders().map((order) => {

                      return (<div id="offsets__mainOrderDiv"><tr>
                        <td id="analytics__recentOrdersImageWidth">
                        {this.returnOrderImage(order.website)}
                        </td>
                        <td id="offsets__recentOrdersTextSize">
                          <p className="title" id="offsets__orderTitle">{this.returnUpperCase(order.website)}</p>
                          <p className="text-muted" id="offsets__orderDescription">
                            {order.name.length > 32 ? order.name.slice(0, 32) + ' ...' : order.name}
                          </p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip636901683"
                            title=""
                            type="button"
                          >
                            <p id="analytics__mainTextSideOrders">{this.roundCarbon(order.carbon)}kg CO<span id="analytics__ordersSmall2">2</span></p>
                          </Button>
                        </td>
                      </tr></div>);

                    }) : <div><div className="offsets__notOrdersFoundIcon"><Icon icon={searchIcon} /></div> <div className="offsets__notOrdersFoundTitle">No Orders to Found</div><div className="offsets__notOrdersFound">You're All Set! </div></div> : undefined}

                    </div>

                    <div className="offsets__centerOrders">
                    {this.state.period === 'yearly' ? this.returnYearlyOrders().length > 0 ? this.returnYearlyOrders().map((order) => {

                      return (<div id="offsets__mainOrderDiv"><tr>
                        <td id="analytics__recentOrdersImageWidth">
                        {this.returnOrderImage(order.website)}
                        </td>
                        <td id="offsets__recentOrdersTextSize">
                          <p className="title" id="offsets__orderTitle">{this.returnUpperCase(order.website)}</p>
                          <p id="offsets__orderDescription" className="text-muted">
                            {order.name.length > 32 ? order.name.slice(0, 32) + ' ...' : order.name}
                          </p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip636901683"
                            title=""
                            type="button"
                          >
                            <p id="analytics__mainTextSideOrders">{this.roundCarbon(order.carbon)}kg CO<span id="analytics__ordersSmall2">2</span></p>
                          </Button>
                        </td>
                      </tr></div>);

                    }) : <div><div className="offsets__notOrdersFoundIcon"><Icon icon={searchIcon} /></div> <div className="offsets__notOrdersFoundTitle">No Orders to Found</div><div className="offsets__notOrdersFound">You're All Set! </div></div> : undefined}

                    </div>

                    </div>

                    <div className="offsets__totalSection">

                    <div className="offsets__totalText"><Icon icon={cloudIcon} /> &nbsp;Total Emissions</div><div className="offsets__totalNum">{this.state.period === 'weekly' ? this.returnTotalWeek() : this.state.period === 'monthly' ? this.returnTotalMonth() : this.returnTotalYear()}<span id="offsets__subScript2">2</span></div>

                    <div className="offsets__clearBoth"></div>

                    <div className="offsets__totalText"><Icon icon={moneyBillWave} />&nbsp; Total Offset</div><div className="offsets__totalNum">{this.state.cur}{this.state.period === 'weekly' ? this.returnTotalWeekCost() : this.state.period === 'monthly' ? this.returnTotalMonthCost() : this.returnTotalYearCost()}</div>

                    </div>

                    </div>}

                  {/*  <div id="offsets__mainTextSideOrders"><a className="offsets__goToButton">Go to Offsets &nbsp;🎉</a></div> */}


                    <div className="offsets__subDescription"></div>
                  </div>


                  {/*  <div className="offsets__subscriptionDiv">

                    <div className="offsets__subDescription"></div>

                      <div className="offsets__monthlySubscriptionButton">Enable Carbonly Subscription</div>

                    </div> */}

                  </Row>
                </Form>

                <div className="leaderboard__leaderboardBottomCardSpacing"></div>
                <span className="analytics__middleCardExplanations"><span className="analytics__positionDescriptionCheck"><Icon icon={checkCircle} /></span><span className="analytics__descriptionText">Orders You Have Not Yet Offset!</span> &nbsp;🌿</span>
              </CardHeader>

            </Card>
          </Col>


          <Col lg="6">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">{this.state.shoppingList.length} {this.state.shoppingList.length === 1 ? 'Item' : 'Items'}</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-basket-simple text-success" id="analytics__destinationIconColour" /> Shopping List


                </CardTitle>

              </CardHeader>
              <CardBody>

              <div id="savedList__mainContainer">

              <ReactSortable
     list={this.state.shoppingList}
     setList={newState => this.setShoppingList(newState)}
     handle={"#drag2"}
     group={'shared'}
     animation={200}
    delayOnTouchStart={true}
    delay={2}
   >
     {this.state.shoppingList.map(item => (
       <div key={item.id}>

       <div className="home__listCheckboxes">

       <FormGroup check>
             <Label check>
               <Input defaultValue="" type="checkbox" />
               <span className="form-check-sign home__listsCheckboxColour">
                 <span className="check" />
               </span>
             </Label>
         </FormGroup>

       </div>

          <div className="home__topListsRightEl">
           <input className="title home__topInputLists" id="home__inputListsHover" placeholder="Super Greens 🥕" onChange={(e) => this.updateTitleShopping(e, item.id)} defaultValue={item.title} />
           <textarea defaultValue={item.description} placeholder="At least 5 a Day Right?" id="home__textAreaPlaceholderStyling" onChange={(e) => this.updateDescriptionShopping(e, item.id)} className="text-muted home__smallerTextInput"/>
           </div>

           <div className="home__topListsIconRight">

           <div className="home__topListsDragSide" id="drag2"><i className="tim-icons icon-align-center" /></div>

           <div className="home__topListsXSide" onClick={() => this.deleteItemShoppingList(item.id)}><i className="tim-icons icon-trash-simple" /></div>
           </div>

           <div className="home__betweenListsSpacing"></div>

           </div>
     ))}
   </ReactSortable>

                              <div className="home__betweenListsSpacing"></div>

                              <div className="home__addListButtonPositioning">
                             {this.state.saved === 't' ? <div>Saving...</div> : this.state.saved === 'saved' ? <div>Saved</div> : undefined}
                              <div onClick={() => { this.createNewItemShoppingList() }} className="home__newItemButton"><div>New Item &nbsp;</div></div>
                              </div>


                    </div>

                      <span className="home__shoppingListExplanation"><span className="analytics__positionDescriptionCheck"><Icon icon={checkCircle} /></span><span className="analytics__descriptionText">This is the List on Your Extension</span> 🗒️</span>
              </CardBody>
            </Card>
          </Col>
          </Row>

          <span className="" style={{ "display": this.state.notificationDisplay }}>

          <NotificationAlert ref="notificationAlert"  />
          </span>

          <Button
            block
            color="primary"
            style={{"display":"none"}}
          >
            Bottom Right
          </Button>

          { this.callFeebackNotification() }

          {!this.state.taskList ? <div id="home__taskListHidden" onClick={() => this.setState({ taskList: true })}>
            <div className={`home__taskListTitleHidden ${this.returnTaskCompletion()[3] > 60 ? 'home__green' : ''}`}>Your Tasks &nbsp;🛠️</div>
            <div className="home__taskListHiddenNumberDone">({this.returnTaskCompletion()[3] > 60 ? '3' : this.returnTaskCompletion()[3] > 30 ? '1' : '0'}/3)</div>
            <div className="home__taskListOpenIcon"><Icon icon={roundOpenInFull} /></div>

          </div> : undefined}

          {this.state.taskList ? <div id="home__taskList">

            <div className="home__taskListHeader">
            <div className="home__taskListTitle">Your Tasks &nbsp;🛠️</div>
            <div className="home__taskListCloseIcon" onClick={() => this.setState({ taskList: false })}><Icon icon={closeCircleO} /></div>
            </div>

            <div className="home__taskListMargins">

            <div className="home__taskListIndividualItem">
            <div className={`home__taskListNumber ${this.returnTaskCompletion()[0] ? 'home__green' : ''}`}>1</div>
            <div className="home__taskListImageContainer">
            <img src={require("../assets/img/home/order.png")} className="home__taskListImage"/>
            </div>
            <div className="home__taskListTextContainer">
            <div className={`home__taskListIndTitle1 ${this.returnTaskCompletion()[0] ? 'home__green' : ''}`}>Track an Order! <span className={this.returnTaskCompletion()[0] ? "home__taskListOutOfThreeStrike" : "home__taskListOutOfThree"}>{this.returnTaskCompletion()[0] ? '(1/1)' : '(0/1)'}</span></div>
            <div className='home__taskListIndDes'>Go To The Carbonly Extension or Watch <Link to="/instructions">This</Link> Tutorial</div>
            </div>
            </div>

            <hr className="home__taskListHr"/>

            <div className="home__taskListIndividualItem">
            <div className={`home__taskListNumber ${this.returnTaskCompletion()[1] ? 'home__green' : ''}`}>2</div>
            <div className="home__taskListImageContainer">
            <img src={require("../assets/img/home/offset.png")} className="home__taskListImage"/>
            </div>
            <div className="home__taskListTextContainer">
            <Link to="/offsets" className={`home__taskListIndTitle ${this.returnTaskCompletion()[1] ? 'home__green' : ''}`}>Offset! <span className={this.returnTaskCompletion()[1] ? "home__taskListOutOfThreeStrike" : "home__taskListOutOfThree"}>{this.returnTaskCompletion()[0] && this.returnTaskCompletion()[1] ? '(2/2)' : this.returnTaskCompletion()[0] || this.returnTaskCompletion()[1] ? '(1/2)' : '(0/2)'}</span></Link>
            <div className={this.returnTaskCompletion()[1] ? 'home__taskListIndDes' : 'home__taskListIndDes'}>Go To Your <Link to="/offsets">Offset Page</Link> Once You've Ordered!</div>
            </div>
            </div>

            <hr className="home__taskListHr"/>

            <div className="home__taskListIndividualItem">
            <div className={`home__taskListNumber ${this.returnTaskCompletion()[2] ? 'home__green' : ''}`}>3</div>
            <div className="home__taskListImageContainer">
            <img src={require("../assets/img/home/refer.png")} className="home__taskListImage"/>
            </div>
            <div className="home__taskListTextContainer">
            <Link to="/profile" className={`home__taskListIndTitle ${this.returnTaskCompletion()[2] ? 'home__green' : ''}`}>Refer a Friend! <span className={this.returnTaskCompletion()[2] ? "home__taskListOutOfThreeStrike" : "home__taskListOutOfThree"}>{this.returnTaskCompletion()[3] > 64 ? '(3/3)' : this.returnTaskCompletion()[3] > 34 ? '(2/3)' : this.returnTaskCompletion()[3] > 0 ? '(1/3)' : '(0/3)'}</span></Link>
            <div className={this.returnTaskCompletion()[2] ? 'home__taskListIndDes' : 'home__taskListIndDes'}>Copy Your Referral Code From Your <Link to="/profile">Profile</Link>!</div>
            </div>
            </div>

            </div>

            <div className="home__taskListReward">Reward 	&nbsp;<Icon icon={awardIcon} /></div>
            <div className={this.returnTaskCompletion()[3] > 60 ? 'home__taskListPointsGained' : 'home__taskListPoints'}>2500+ Offset Points</div>

            <div className={`home__taskListBottomHeader ${this.returnTaskCompletion()[3] > 64 ? 'home__taskListBottomHeaderSelected' : undefined}`}>
            <div className="home__taskListPerComplete">{this.returnTaskCompletion()[3]}% Complete ({this.returnTaskCompletion()[3] > 64 ? '3' : this.returnTaskCompletion()[3] > 34 ? '1' : '0'}/3)</div>
            </div>

          </div> : undefined}


      {!this.state.user.hasDoneTour? <Tour
      steps={steps}
      {...props}
      onAfterOpen={this.disableBody}
      onBeforeClose={this.enableBody}
      badgeContent={(curr, tot) => `${curr}/${tot}`}
      maskClassName=""
      className="home__tourClass"
      rounded={5}
      isOpen={this.state.isTourOpen}
      onRequestClose={this.closeTour} /> : undefined}

          </div> : <div className="home__positionLoadingIcon"><BeatLoader
            css={override}
            size={30}
            color={'rgba(157, 209, 183, 0.5)'}
            loading={true}
          /></div> }

        {/*

          <Loader
             type="Grid"
             color="rgba(159, 201, 180, 0.4)"
             height={125}
             width={125}
             timeout={0} //3 secs


          />

        */}


        </div>
      </>
    );
  }
}

Home.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({

});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Home);
