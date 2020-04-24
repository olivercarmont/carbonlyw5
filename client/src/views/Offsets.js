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
      global: true,
      friendsMove: 1,
      searchValue: '',
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
      }
    };
  }
  componentWillMount() {

    axios.post('http://localhost:5000/users/return-leaderboard', { jwt: localStorage.jwtToken }, {
      'jwt': localStorage.jwtToken,
    })
  .then(response => {

      // console.log('response', response.data);
       this.setState({ friends: response.data.info[1] });

       this.setState({ user: response.data.info[0] });
       this.setState({ allUsers: response.data.info[4] });


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
  changeGlobal(bool) {
    this.setState({ global: bool });
    console.log('changed');
  }
  returnOffsets(amount) {

  let calcData;

    if (amount === 0) {

      return `${amount}kg`;

    } else if (amount > 9999) {

      calcData = amount / 1000;

      calcData = Math.round(calcData);

      return `${calcData}t CO`

    } else if (amount > 10000000) {

      calcData = amount / 1000;

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

  return `${this.returnOffsets(offsetAmount)} CO2`;
}
  render() {
    return (
      <>
        <div className="content">
        {this.state.user && this.state.allUsers && this.state.userRank && this.state.search && this.state.friends ? <div>
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                <div className="leaderboard__mainTitle">New Offset <div className="leaderboard__sideIcon"><i className="tim-icons icon-chart-bar-32" /></div> </div>

                <div className="leaderboard__topSelections"><div onClick={() => this.changeGlobal(true)} className={this.state.global ? 'leaderboard__topSelectFirst leaderboard__topSelected' : 'leaderboard__topSelectFirst leaderboard__topSelect'}>Global</div><div onClick={() => this.changeGlobal(false)} className={!this.state.global ? 'leaderboard__topSelected' : 'leaderboard__topSelect'}>Friends</div></div>
                  <Form>
                    <Row>

                      <div className="leaderboard__mainContentMargins">




                      </div>

                    </Row>
                  </Form>
                  <div className="leaderboard__leaderboardBottomCardSpacing"></div>
                </CardHeader>

              </Card>
            </Col>




            <Col md="4">
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar"
                        src={require(`../assets/img/${this.state.user.avatar}`)}
                      />
                      <h5 className="title" id="leaderboard__sideUserName">{this.state.user.name}</h5>
                    </a>
                    <p className="description" id="leaderabord__sideUserDate">@{this.state.user.username}</p>
                  </div>

                  <div className="leaderboard__profileBelow">

                  <div className="leaderboard__doughnutMargins">

                  <div className="leaderboard__pieSize">
                  <Doughnut
                    data={ {  datasets: [{
        data: [this.state.allUsers.length - this.state.userRank, this.state.userRank], backgroundColor: [ 'rgba(203, 203, 203, 0.39)', 'rgba(156, 204, 179, 0.39)'], borderColor: [ '#cbcbcb', "rgba(156, 204, 179, 0.98)" ], hoverBorderColor: ['#d9d9d9', 'rgba(156, 204, 179, 0.8)'], hoverBackgroundColor: ['transparent', 'transparent'], borderWidth: '2'
    }], labels: [
        'Ranking',
        'Blue'
    ] } }
                    options={ { cutoutPercentage: 72, color: [ '#333', 'blue'], legend: false, tooltips: { enabled: false },  padding: { left:50, bottom: 15 } }}
                  /></div>

                  <div className="leaderboard__profileRanking"><h5 className="title" id="leaderboard__rankNumber">{this.state.userRank}<div className="leaderboard__profileRankingSmallText"></div></h5></div>



                  </div>

                    <div className="leaderboard__profileProgressMargins">

                    <div className="leaderboard__progressbarProfile"><div id="leaderBoard__progressBarContainerProfile" style={{ width: '60%', margin: 'auto' }}><div className="leaderboard__carbonProfileMargins">{this.returnUserOffsets()}</div></div></div>
                    </div>

                    </div>
                      <div className="leaderboard__profileBottomSpacing"></div>

                </CardBody>
              </Card>
            </Col>

          </Row>

          {this.state.friends.length > 0 ? <Row>{this.returnFriends()}{this.returnFriendsTwo()}{this.insertAddFriendsContainer()}</Row>


           :

          <Row><Col md="8">
            <Card>
              <CardHeader>
              <div className="leaderboard__mainTitleNotFound">No Friends to Show &nbsp;<Icon icon={sadTear} /></div>

              <div className="leaderboard__noFriendsRightPointer">
              <Icon icon={handPointRight} /></div>


              <div className="leaderboard__noFriendsDescription">Use The Card to The Right to Add Your First Friends!</div>

              </CardHeader>

              <div className="leaderboard__leaderboardBottomCardSpacingNotFound"></div>

            </Card>
          </Col>

          {this.insertAddFriendsContainer()}

          </Row>}


          </div>: undefined}
        </div>
      </>
    );
  }
}

export default Offsets;
