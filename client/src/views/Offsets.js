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
import '../OwnCSS/leaderboard.css';
import '../OwnCSS/offsets.css';
import '../OwnCSS/checkbox.css';
import { Helmet } from "react-helmet";

import { Line, Bar, Doughnut} from "react-chartjs-2";

import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/core";

import { Icon, InlineIcon } from '@iconify/react';
import externalLinkAlt from '@iconify/icons-fa-solid/external-link-alt';
import accountMusic from '@iconify/icons-mdi/account-music';
import accountArrowRight from '@iconify/icons-mdi/account-arrow-right';
import sadTear from '@iconify/icons-fa-regular/sad-tear';
import handPointRight from '@iconify/icons-fa-regular/hand-point-right';

import outlineKeyboardArrowLeft from '@iconify/icons-ic/outline-keyboard-arrow-left';
import outlineKeyboardArrowRight from '@iconify/icons-ic/outline-keyboard-arrow-right';

import personCircle from '@iconify/icons-ion/person-circle';

import leafIcon from '@iconify/icons-entypo/leaf';
import treesIcon from '@iconify/icons-foundation/trees';
import boxOpen from '@iconify/icons-fa-solid/box-open';
import searchIcon from '@iconify/icons-fa-solid/search';
import cloudIcon from '@iconify/icons-subway/cloud';
import moneyBillWave from '@iconify/icons-fa-solid/money-bill-wave';
import checkCircle from '@iconify/icons-la/check-circle';
import gumtreeIcon from '@iconify/icons-simple-icons/gumtree';

import axios from 'axios';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

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

const override = css`
  display: block;
  margin: 0 auto;
`;

class Offsets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      period: 'monthly',
      cur: '$',
      offAmount: '',
      changeQuestion: '',
      hasAnswered: '',
    };
  }
  componentWillMount() {

  axios.post('https://carbonly.org/users/return-leaderboard', { jwt: localStorage.jwtToken }, {
      'jwt': localStorage.jwtToken,
    })
  .then(response => {

      if (response.data.info[0].hasLoggedIn === 'f') {
        window.location.href="/click";
      }

       this.setState({ user: response.data.info[0] });

       let cur_user = response.data.info[0];

       axios.post('https://carbonly.org/form/has-submitted-form', { formId: "JR74HA0", email: cur_user.email }, {
         formId: "JR74HA0", email: this.state.user.email
         })
       .then(response => {

           // console.log('RESPPPPPP', response.data.hasAnswered)

            this.setState({ hasAnswered: response.data.hasAnswered });

            // if (hasAnswered === )
            //
            // hasAnswered

       })
       .catch((error) => {
         console.log(error);
       })

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
  returnOffsets(amount) {

  let calcData;

    if (amount === 0) {

      return `${amount}kg`;

    } else if (amount > 999) {

      calcData = amount / 1000;

      calcData = Math.round(calcData);

      return `${calcData}t CO`

    } else if (amount >= 10000000) {

      calcData = amount / 10000000;

      calcData = Math.round(calcData);

      return `${calcData}Mt`

    } else {
      let calcData = Math.round(amount);
      return `${calcData}kg`;
    }
  }
returnUserOffsets() {

  let offsetAmount = 0;

  this.state.user.offsets.map((off) => {
    offsetAmount += parseFloat(off.amount);
  })

  // console.log('offsetAmount', offsetAmount)

  return `${this.returnOffsets(offsetAmount)} CO`;
}
setPeriod(period) {




this.setState({ period });

}
updateOffAmount(e) {

let input = e.target.value;

let can =  /[0-9]*\.?[0-9]*/;

if (can.test(input)) {
  this.setState({ offAmount: input });
} else if (input === '') {
  this.setState({ offAmount: '' });
}

}
returnWeeklyOrders() {

  let totalEmissions = 0;
  let date = new Date()

  let start_of_week = new Date(date.getTime() - (6) * 24*60*60*1000 )
  start_of_week.setHours(0)
  start_of_week.setMinutes(0)
  start_of_week.setSeconds(0)

  let weekOrders = [];

  this.state.user.orders.map((or) => {

    let time = new Date(Date.parse(or.time));

    if (( time <= date && time >= start_of_week) && !or.offset) {
          weekOrders.push(or);
   }

  });

  weekOrders.sort((a, b) => (Date.parse(a.time) < Date.parse(b.time)) ? 1 : -1)

  return weekOrders;

}
returnMonthlyOrders() {

  let date = new Date();
  let cur_month = date.getMonth() + 1;
  let monthOrders = [];

  this.state.user.orders.map((or) => {

    let time = new Date(Date.parse(or.time));
    let orderMonth = time.getMonth() + 1;

    if ((orderMonth === cur_month) && !or.offset) {
        monthOrders.push(or);
    }

  });

  monthOrders.sort((a, b) => (Date.parse(a.time) < Date.parse(b.time)) ? 1 : -1)

  return monthOrders;

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
returnWebsiteImage(website) {
  return 'tesco.png';
}
returnUpperCase(string) {
return string.charAt(0).toUpperCase() + string.slice(1);
}
roundNumber(num) {
  return Math.round(num * 10) / 10;
}
changeCurrency(e) {
  let input = e.target.value;

  this.setState({ cur: input });
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
getTimeSizeOfEmissions(num) {

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

  if (parseFloat(num)) {

    let cost = parseFloat(num);

    let totalEm = 0;

    let time;

    for(let r = 0; r < this.state.user.orders.length; r++) {

      let em = parseFloat(this.state.user.orders[r].carbon);

      if (!((cost/3) > (totalEm + (em/1000)))) {
        time = new Date(Date.parse(this.state.user.orders[r].time));

        // console.log('time', time);
      } else {
        totalEm += (em/1000);
      }
      r++;
    }

    if (!time) {
      return 'Offsets All Emissions!'

    } else {
      let month = monthNames[time.getMonth()];
      let day = time.getDate();

      return `Offsets Back to ${day} ${month}`;
    }

  } else {
    return 'Not a Valid Number';
  }

}
roundCarbon(amt) {
  if (amt >= 100) {
    return Math.round(amt);
  } else {
    return parseFloat(amt).toFixed(1);
  }
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
changeQuestion(select) {

  console.log('TRYING')

let newMessage = '', answerType;

if (select === 'f') {
  newMessage = "Question: Would You Use Carbonly Subscritption? : No, I Wouldn't... 😒";
  answerType = false;

} else if (select === 't') {
  newMessage = "Question: Would You Use Carbonly Subscritption? : Sure, I'd Love to! 😝";
  answerType = true;
}

// let totMessage = {
//   email: this.state.user.email,
//   message: newMessage
// }

let time = new Date();
let minutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();

time = time.getDate()  + "/" + (time.getMonth()+1) + "/" + time.getFullYear() + " " +
time.getHours() + ":" + minutes;

    axios.post('https://carbonly.org/form/submit-question', { formId: "JR74HA0", "email": this.state.user.email, "details": newMessage, time, answerType }, {
      formId: "JR74HA0", "email": this.state.user.email, "details": newMessage, time, answerType
    })
  .then(response => {

  if (this.state.hasAnswered === 'f') {

  axios.post('https://carbonly.org/users/update', { prop: "bonusPoints", value: 250, jwt: localStorage.jwtToken }, {
    prop: "bonusPoints", value: 250, jwt: localStorage.jwtToken
   })
   .then(response2 => {

      this.setState({ question: select });

   }).catch((err) => {
     console.log(err);
   });

 }

}).catch((err) => {
  console.log(err);
});
}
  render() {
    return (
      <>
        <div className="content">
        {this.state.user && this.state.hasAnswered ? <div>

       <Helmet>
          <title>Carbonly | Carbon Offsets</title>
          <meta name="description" content="Use Our Monthly Subscription Service to Seamlessly Offset Your Footprint!" />
        </Helmet>

          <Row>
            <Col md="6">
              <Card>
                <CardHeader>
                <div className="offsets__mainTitle">New Offset <div className="leaderboard__sideIcon"><Icon icon={leafIcon} /></div> </div>

                <div className="offsets__topSelections"><div onClick={() => this.setPeriod('weekly')} className={this.state.period === 'weekly' ? 'offsets__topSelectFirst leaderboard__topSelected' : 'offsets__topSelectFirst leaderboard__topSelect'}>Weekly</div><div onClick={() => this.setPeriod('monthly')} className={this.state.period === 'monthly' ? 'offsets__topSelectFirst leaderboard__topSelected' : 'offsets__topSelectFirst leaderboard__topSelect'}>Monthly</div><div onClick={() => this.setPeriod('yearly')} className={this.state.period === 'yearly' ? 'offsets__topSelectFirst leaderboard__topSelected' : 'offsets__topSelectFirst leaderboard__topSelect'}>Yearly</div><div onClick={() => this.setPeriod('custom')} className={this.state.period === 'custom' ? 'leaderboard__topSelected' : 'leaderboard__topSelect'}>Custom</div></div>
                  <Form>
                    <Row>

                    <div className="offsets__leftTopDiv">

                    {this.state.period === 'custom' ? <div className="offsets__orderTitle">Custom <span className="offsets__orderTitleIcon"><Icon icon={gumtreeIcon} /></span></div> : <div className="offsets__orderTitle">Orders <span className="offsets__orderTitleIcon"><Icon icon={boxOpen} /></span></div>}

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

                      <div id="offsets__mainTextSideOrders"><a className="offsets__goToButton">Offset &nbsp;🎉</a></div>

                      <div className="offsets__subscriptionDiv">

                    {this.state.question || (this.state.hasAnswered === 't') ? <div className="offsets__aboveQuestion">Received 250 Points &nbsp;🎉</div> : <div className="offsets__aboveQuestion">Earn 250 Points! 😝</div>}

                      <div className="offsets__lowerQuestion">We Haven't Yet Released Our Subscription Offsets. <br/>Would You Use it?</div>

                      <div className="offsets__positionCheckboxes">



                      <div class="grid" style={{ "float": "left" }}>

                      <label class="checkbox bounce">
                      <input type="checkbox"  onChange={() => this.changeQuestion('t')} checked={this.state.question === 't'} />
                      <svg viewBox="0 0 21 21">
                      <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                      </svg>
                        <div className={'offsets__questionText'}>Sure, I'd Love to! 😝</div>
                      </label>
                      </div>


                      <div class="grid" style={{ "float": "left"}}>

                      <label class="checkbox bounce">
                      <input type="checkbox" onChange={() => this.changeQuestion('f')} checked={this.state.question === 'f'} />
                      <svg viewBox="0 0 21 21">
                      <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                      </svg>
                        <div className={'offsets__questionText'}>No, I Wouldn't... 😒</div>
                      </label>
                      </div>

                      </div>



                      <div className="offsets__subDescription"></div>
                    </div>


                    {/*  <div className="offsets__subscriptionDiv">

                      <div className="offsets__subDescription"></div>

                        <div className="offsets__monthlySubscriptionButton">Enable Carbonly Subscription</div>

                      </div> */}

                      </div>

                    </Row>
                  </Form>

                  <div className="leaderboard__leaderboardBottomCardSpacing"></div>
                  <span className="analytics__middleCardExplanations"><span className="analytics__positionDescriptionCheck"><Icon icon={checkCircle} /></span><span className="analytics__descriptionText">Select a Time or Amount to Start an Offset!</span> &nbsp;🕰</span>
                </CardHeader>

              </Card>
            </Col>

            <Col md="6">
              <Card className="card-user">
                <CardBody>
                  <CardText />

                    <div className="leaderboard__mainTitle">Offset History <div className="leaderboard__sideIcon"><Icon icon={treesIcon} /></div></div>

                    <div className="offsetsHistory__offsetsContainer">
                    {this.state.user.offsets.length > 0 ? this.state.user.offsets.map((off) => {

                      return (
                        <div className="offsets__indvOffset">Offset</div>
                      )



                    }) : <div><div className="offsets__notOrdersFoundIcon"><Icon icon={searchIcon} /></div> <div className="offsets__notOrdersFoundTitle">No Offsets to Found</div><div className="offsets__notOrdersFound">Why Not Start Now? </div></div>}
                    </div>

                    <div className="offsets__bottomSpacing"></div>

                </CardBody>
                <span className="analytics__middleCardExplanations"><span className="analytics__positionDescriptionCheck"><Icon icon={checkCircle} /></span><span className="analytics__descriptionText">All Your Recent Offsets!</span> &nbsp;🌳</span>
              </Card>
            </Col>

            </Row>



          </div>: <div className="home__positionLoadingIcon"><BeatLoader
            css={override}
            size={30}
            color={'rgba(157, 209, 183, 0.5)'}
            loading={true}
          /></div> }
        </div>
      </>
    );
  }
}

export default Offsets;
