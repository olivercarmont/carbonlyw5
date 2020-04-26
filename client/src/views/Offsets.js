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

import { Line, Bar, Doughnut} from "react-chartjs-2";

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

class Offsets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      period: 'monthly',
      cur: '$',
      offAmount: '',
    };
  }
  componentWillMount() {

    axios.post('http://localhost:5000/users/return-leaderboard', { jwt: localStorage.jwtToken }, {
      'jwt': localStorage.jwtToken,
    })
  .then(response => {

       this.setState({ user: response.data.info[0] });

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

  console.log('offsetAmount', offsetAmount)

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

        console.log('time', time);
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
  render() {
    return (
      <>
        <div className="content">
        {this.state.user ? <div>
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
                    <option value="kg CO2">kg CO2</option>
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
                            <img src={require(`../assets/img/companyLogos/${order.website === 'Tesco' || order.website === 'tesco' ? 'tesco.png' : order.website === 'Amazon' || order.website === 'amazon' ? 'amazon.png' : 'skyscanner.png'}`)} id="offsets__ordersImage" />
                          </td>
                          <td id="offsets__recentOrdersTextSize">
                            <p className="title">{this.returnUpperCase(order.website)}</p>
                            <p id="offsets__orderDescription" className="text-muted">
                              {order.name}
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
                            <img src={require(`../assets/img/companyLogos/${order.website === 'Tesco' || order.website === 'tesco' ? 'tesco.png' : order.website === 'Amazon' || order.website === 'amazon' ? 'amazon.png' : 'skyscanner.png'}`)} id="offsets__ordersImage" />
                          </td>
                          <td id="offsets__recentOrdersTextSize">
                            <p className="title">{this.returnUpperCase(order.website)}</p>
                            <p className="text-muted" id="offsets__orderDescription">
                              {order.name}
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
                            <img src={require(`../assets/img/companyLogos/${order.website === 'Tesco' || order.website === 'tesco' ? 'tesco.png' : order.website === 'Amazon' || order.website === 'amazon' ? 'amazon.png' : 'skyscanner.png'}`)} id="offsets__ordersImage" />
                          </td>
                          <td id="offsets__recentOrdersTextSize">
                            <p className="title">{this.returnUpperCase(order.website)}</p>
                            <p id="offsets__orderDescription" className="text-muted">
                              {order.name}
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

                      {/* REMOVE THIS */}

                      <div className="offsets__subscriptionDiv">

                      <div className="offsets__subDescription">Want Seamless {this.state.period.charAt(0).toUpperCase() + this.state.period.slice(1)}-Based Offsets?</div>

                        <div className="offsets__monthlySubscriptionButton">Enable Carbonly Subscription</div>

                      </div>

                      {/* REMOVE */}

                      </div>

                    </Row>
                  </Form>
                  <div className="leaderboard__leaderboardBottomCardSpacing"></div>
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
              </Card>
            </Col>

            </Row>



          </div>: undefined}
        </div>
      </>
    );
  }
}

export default Offsets;
