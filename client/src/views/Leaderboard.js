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

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      global: true,
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

       this.setState({ user: response.data.info[0] });
       this.setState({ allUsers: response.data.info[4] });
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
  returnOffsetWidth(num) {

    if (this.state.allUsers[num].offsets === 0) {
      return 0.3;
    } else {

    let ratio = this.state.allUsers[num].offsets / this.state.allUsers[0].offsets;

    if (ratio > 0.3) {

      return 0.3;

    } else {

      return ratio;

    }
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
returnAddFriendsContainerNum() {
  if (this.state.user.friends.length < 2) {
    return 4;
  }
}
  render() {
    return (
      <>
        <div className="content">
        {this.state.user && this.state.allUsers && this.state.userRank ? <div>
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                <div className="leaderboard__mainTitle">Leaderboard <div className="leaderboard__sideIcon"><i className="tim-icons icon-chart-bar-32" /></div> </div>

                <div className="leaderboard__topSelections"><div onClick={() => this.changeGlobal(true)} className={this.state.global ? 'leaderboard__topSelectFirst leaderboard__topSelected' : 'leaderboard__topSelectFirst leaderboard__topSelect'}>Global</div><div onClick={() => this.changeGlobal(false)} className={!this.state.global ? 'leaderboard__topSelected' : 'leaderboard__topSelect'}>Friends</div></div>


                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="5">

                      <div className="leaderboard__mainContentMargins">

                      <div className="leaderboard__mainRow">
                      <div className="leaderboard__mainNumber">&nbsp;1</div>
                      <img src={require(`../assets/img/${this.state.allUsers[0].avatar}`)} className="leaderboard__mainImage"/>
                      <div className="leaderboard__rowFirstSection"><div className="leaderboard__mainName">{this.state.allUsers[0].name}</div><div className="leaderboard__mainDate">@{this.state.allUsers[0].username}</div></div>  <div className="leaderboard__progressbar"><div id="leaderBoard__progressBarContainer" style={{ width: 15 + 'vw'}}><div className="leaderboard__mainCO2Emissions">{this.returnOffsets(this.state.allUsers[0].offsets)}</div></div></div>

                      <div className="leaderboard__individualLineMargins">
                          <Line
                            data={ { labels: [1750,1800,1850,1900,1950,1999,2050],
                                      datasets: [{
                                      data: [106,107,111,50,20,10,4],
                                      label: "Ranking",
                                      borderColor: "#a9dbc0",
                                      fill: false
                                    }] } }
                            options={this.state.lineOptions}
                          />
                        </div>

                      </div>

                      <div className="leaderboard__mainRow">
                      <div className="leaderboard__mainNumber">2</div>
                      <img src={require(`../assets/img/${this.state.allUsers[1].avatar}`)} className="leaderboard__mainImage"/>
                      <div className="leaderboard__rowFirstSection"><div className="leaderboard__mainName">{this.state.allUsers[1].name}</div><div className="leaderboard__mainDate">@{this.state.allUsers[1].username}</div></div>
                      <div className="leaderboard__progressbar"><div id="leaderBoard__progressBarContainer" style={{ width: (this.returnOffsetWidth(1) * 15) + 'vw'}}><div className="leaderboard__mainCO2Emissions">{this.returnOffsets(this.state.allUsers[1].offsets)}</div></div></div>

                      <div className="leaderboard__individualLineMargins">
                          <Line
                            data={ { labels: [1750,1800,1850,1900,1950,1999,2050],
                                      datasets: [{
                                      data: [5,5,4,6,7,5,4],
                                      label: "Ranking",
                                      borderColor: "#a9dbc0",
                                      fill: false
                                    }] } }
                            options={this.state.lineOptions}
                          />
                        </div>

                      </div>

                      <div className="leaderboard__mainRow">
                      <div className="leaderboard__mainNumber">3</div>
                      <img src={require(`../assets/img/${this.state.allUsers[2].avatar}`)} className="leaderboard__mainImage"/>
                      <div className="leaderboard__rowFirstSection"><div className="leaderboard__mainName">{this.state.allUsers[2].name}</div><div className="leaderboard__mainDate">@{this.state.allUsers[2].username}</div></div>
                      <div className="leaderboard__progressbar"><div id="leaderBoard__progressBarContainer" style={{ width: (this.returnOffsetWidth(2) * 15) + 'vw'}}><div className="leaderboard__mainCO2Emissions">{this.returnOffsets(this.state.allUsers[2].offsets)}</div></div></div>

                      <div className="leaderboard__individualLineMargins">
                          <Line
                            data={ { labels: [1750,1800,1850,1900,1950,1999,2050],
                                      datasets: [{
                                      data: [30,10,16,12,9,9,8],
                                      label: "Ranking",
                                      borderColor: "#a9dbc0",
                                      fill: false
                                    }] } }
                            options={this.state.lineOptions}
                          />
                        </div>

                      </div>

                      <div className="leaderboard__mainRow">
                      <div className="leaderboard__mainNumber">4</div>
                      <img src={require(`../assets/img/${this.state.allUsers[3].avatar}`)} className="leaderboard__mainImage"/>
                      <div className="leaderboard__rowFirstSection"><div className="leaderboard__mainName">{this.state.allUsers[3].name}</div><div className="leaderboard__mainDate">@{this.state.allUsers[3].username}</div></div>
                      <div className="leaderboard__progressbar"><div id="leaderBoard__progressBarContainer" style={{ width: (this.returnOffsetWidth(3) * 15) + 'vw'}}><div className="leaderboard__mainCO2Emissions">{this.returnOffsets(this.state.allUsers[3].offsets)}</div></div></div>

                      <div className="leaderboard__individualLineMargins">
                          <Line
                            data={ { labels: [1750,1800,1850,1900,1950,1999,2050],
                                      datasets: [{
                                      data: [5,4,6,4,7,8,9],
                                      label: "Ranking",
                                      borderColor: "#e07073",
                                      fill: false
                                    }] } }
                            options={this.state.lineOptions}
                          />
                        </div>

                      </div>

                      </div>

                      </Col>
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
                        src={require("../assets/img/avatars/mainProfileImage.png")}
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
        data: [this.state.userRank, this.state.allUsers.length], backgroundColor: [ 'rgba(203, 203, 203, 0.39)', 'rgba(156, 204, 179, 0.39)'], borderColor: [ '#cbcbcb', "rgba(156, 204, 179, 0.98)" ], hoverBorderColor: ['#d9d9d9', 'rgba(156, 204, 179, 0.8)'], hoverBackgroundColor: ['transparent', 'transparent'], borderWidth: '2'
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

            {this.state.user.friends.length > 2 ? <div>

            <Col md="4">
            <Card>
            <CardBody>

                <div className="leaderboard__bottomXPositioning"><Icon icon={accountArrowRight} /></div>
                <div className="leaderboard__bottomLeftArrow"><Icon icon={outlineKeyboardArrowLeft} /></div>

                <div className="leaderboard__bottomCenterImage">
                <img src={require("../assets/img/avatars/mainProfileImage-4.png")} className="leaderboard__friendsImg" />
                </div>

                <div className="leaderboard__nameAndUsernamContainerBottom">
                <h5 className="title" id="leaderboard__sideNameBottom">Laurence Holmes</h5>
              <p className="description" id="leaderabord__sideUsernameBottom">@{'lholmes'}</p>
              </div>

              <div className="leaderboard__bottomComparisonAndCarbonContainer">

              <div className="leaderboard__graphsLagerContainer">
              <div className="leaderboard__bottomComparisonGraphsMargins">

              <Line
                data={ { labels: [1750,1800,1850,1900,1950,1999,2050],
                          datasets: [{
                          data: [5,4,6,4,7,8,9],
                          label: "Ranking",
                          borderColor: "#e07073",
                          fill: false
                        }, { data: [10,5,6,6,2,5,3],
                        label: "Ranking",
                        borderColor: "#a9dbc0",
                        fill: false }] } }
                options={this.state.lineOptions}
              />

            </div></div>

            <div className="leaderboard__progressbarBottomPositioning"><div id="leaderBoard__progressBarContainerBottom"><div className="leaderboard__mainCO2EmissionsAddFriends">15kg</div></div></div>

            </div>

            </CardBody>

            </Card>
            </Col>

            <Col md="4">
            <Card>
            <CardBody>

            <div className="leaderboard__bottomXPositioning"><Icon icon={accountArrowRight} /></div>
            <div className="leaderboard__bottomRightArrow"><Icon icon={outlineKeyboardArrowRight} /></div>

            <div className="leaderboard__bottomCenterImage">
            <img src={require("../assets/img/avatars/mainProfileImage-3.png")} className="leaderboard__friendsImg" />
            </div>

            <div className="leaderboard__nameAndUsernamContainerBottom">
            <h5 className="title" id="leaderboard__sideNameBottom">Matilde Woods</h5>
          <p className="description" id="leaderabord__sideUsernameBottom">@{'mwoods01'}</p>
          </div>

          <div className="leaderboard__bottomComparisonAndCarbonContainer">

          <div className="leaderboard__graphsLagerContainer">
          <div className="leaderboard__bottomComparisonGraphsMargins">

          <Line
            data={ { labels: [1750,1800,1850,1900,1950,1999,2050],
                      datasets: [{
                      data: [55,40,35,25,18,5,2],
                      label: "Ranking",
                      borderColor: "#e07073",
                      fill: false
                    }, { data: [10,5,6,6,2,5,3],
                    label: "Ranking",
                    borderColor: "#a9dbc0",
                    fill: false }] } }
            options={this.state.lineOptions}
          />

        </div></div>

        <div className="leaderboard__progressbarBottomPositioning"><div id="leaderBoard__progressBarContainerBottom"><div className="leaderboard__mainCO2EmissionsAddFriends">14kg</div></div></div>

        </div>

            </CardBody>

            </Card>
            </Col>
            </div> :

            <Col md="8">
              <Card>
                <CardHeader>
                <div className="leaderboard__mainTitle">No Friends to Show <Icon icon={sadTear} /></div> </div>

                <div className="leaderboard__noFriendsRightPointer">
                <Icon icon={handPointRight} /></div>


                <div className="leaderboard__noFriendsDescription">Use The Card to The Right to Add Your First Friends!</div>

                <div className="leaderboard__leaderboardBottomCardSpacing"></div>
                </CardHeader>

              </Card>
            </Col>}

            <Col md={this.returnAddFriendsContainerNum()}>
            <Card>

            <CardHeader>

            <div className="leaderboard__addFriendsTitle">Add Friends <div className="leaderboard__sideIcon"><i className="tim-icons icon-chat-33" /></div> </div>

            <div className="leaderboard__searchMargins"><input id="leaderboard__addFriendsSearch" placeholder="Search" /><div className="leaderboard__addFriendsPositionSearch"><i className="tim-icons icon-zoom-split" /></div></div>

            <div className="leaderboard__addFriendsScrollableContainer">

            <div className="leaderboard__addFriendsMainRow">

            <img src={require("../assets/img/avatars/mainProfileImage.png")} className="leaderboard__addFriendsImg"/>
            <div className="leaderboard__nameAndUsernamContainer"><div className="leaderboard__addFriendsName">James Carlson</div><div className="leaderboard__addFriendsUsername">@jamescarlson</div></div>

            <div className="leaderboard__progressbarMainAdd"><div className="leaderboard__submitButton">Add &nbsp; 🏂</div>


            </div>

            </div>

            <div className="leaderboard__addFriendsIndvSpacing"></div>

            <div className="leaderboard__addFriendsMainRow">

            <img src={require("../assets/img/avatars/mainProfileImage4.png")} className="leaderboard__addFriendsImg"/>
            <div className="leaderboard__nameAndUsernamContainer"><div className="leaderboard__addFriendsName">Carl Austin</div><div className="leaderboard__addFriendsUsername">@caustin</div></div>

            <div className="leaderboard__progressbarMainAdd"><div className="leaderboard__submitButton">Add &nbsp; 🏂</div></div>

            </div>

            <div className="leaderboard__addFriendsIndvSpacing"></div>

            <div className="leaderboard__addFriendsMainRow">

            <img src={require("../assets/img/avatars/mainProfileImage4.png")} className="leaderboard__addFriendsImg"/>
            <div className="leaderboard__nameAndUsernamContainer"><div className="leaderboard__addFriendsName">Carl Austin</div><div className="leaderboard__addFriendsUsername">@caustin</div></div>

            <div className="leaderboard__progressbarMainAdd"><div className="leaderboard__submitButton">Add &nbsp; 🏂</div></div>

            </div>

            <div className="leaderboard__addFriendsIndvSpacing"></div>

            <div className="leaderboard__addFriendsMainRow">

            <img src={require("../assets/img/avatars/mainProfileImage4.png")} className="leaderboard__addFriendsImg"/>
            <div className="leaderboard__nameAndUsernamContainer"><div className="leaderboard__addFriendsName">Carl Austin</div><div className="leaderboard__addFriendsUsername">@caustin</div></div>

            <div className="leaderboard__progressbarMainAdd"><div className="leaderboard__submitButton">Add &nbsp; 🏂</div></div>

            </div>

            <div className="leaderboard__addFriendsIndvSpacing"></div>

            </div>

            </CardHeader>
            <CardBody>



            </CardBody>

            </Card>
            </Col>


          </Row></div>: undefined}
        </div>
      </>
    );
  }
}

export default Leaderboard;
