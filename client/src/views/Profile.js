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

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCogs } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";

import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { faBookmark} from "@fortawesome/free-solid-svg-icons";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { faUserMd } from "@fortawesome/free-solid-svg-icons";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faMousePointer } from "@fortawesome/free-solid-svg-icons";

import { Icon, InlineIcon } from '@iconify/react';
import externalLinkAlt from '@iconify/icons-fa-solid/external-link-alt';
import accountMusic from '@iconify/icons-mdi/account-music';
import accountArrowRight from '@iconify/icons-mdi/account-arrow-right';

import outlineKeyboardArrowLeft from '@iconify/icons-ic/outline-keyboard-arrow-left';
import outlineKeyboardArrowRight from '@iconify/icons-ic/outline-keyboard-arrow-right';

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

import '../OwnCSS/profile.css';
import { Line, Bar, Doughnut} from "react-chartjs-2";

let rootA = 'avatars/';

class Profile extends React.Component {
constructor(props) {
  super(props);
  this.state = {
      page: 'home',
      avatars: [`${rootA}mainProfileImage-2.png`, `${rootA}mainProfileImage-1.png`, `${rootA}mainProfileImage.png`, `${rootA}mainProfileImage1.png`, `${rootA}mainProfileImage2.png`],
      currentAvatar: 2,
    };
}
avatarLeft() {
  if (this.state.currentAvatar > 0) {
  let newNum = this.state.currentAvatar - 1;
  /* Update Server */
  this.setState({ currentAvatar: newNum });
  }
}
avatarRight() {
  if (this.state.currentAvatar < 4) {
  let newNum = this.state.currentAvatar + 1;
  /* Update Server */
  this.setState({ currentAvatar: newNum });
  }
}
setProfilePage(page) {
  this.setState({ page });
}
render() {
    return (
      <>
        <div className="content">
          <Row>
          <div className="profile__centeringMainCard">
            <Col md="8">
              <Card className="card-user">
                <CardHeader>

                </CardHeader>
                <CardBody>

                { this.state.page === 'home' ? <div onClick={() => this.setProfilePage('settings')} className="proilfe__settingssIconPositioning"><i className="tim-icons icon-settings-gear-63" /></div> : <div onClick={() => this.setProfilePage('home')} className="profile__backIconPositioning"><i className="tim-icons icon-minimal-left" /></div>}


                {this.state.page === 'home' ? <div>
                <div className="author">
                  <div className="blockProfile block-one" />
                  <div className="blockProfile block-two" />
                  <div className="blockProfile block-three" />
                  <div className="blockProfile block-four" />

                    <img
                      alt="..."
                      className="avatar"
                      id="profile__mainImage"
                      src={require("../assets/img/avatars/mainProfileImage.png")}
                    />

                    <h5 className="title" id="profile__mainName">Oliver Carmont</h5>

                  <p className="description" id="profile__mainUsername">@olivercarmont</p>
                </div>

                <div className="profile__statsMargins">

                <div className="leaderboard__profileBelow">

                <div className="leaderboard__doughnutMargins">

                <div className="leaderboard__pieSize">
                <Doughnut
                  data={ {  datasets: [{
      data: [10, 90], backgroundColor: [ 'rgba(203, 203, 203, 0.39)', 'rgba(156, 204, 179, 0.39)'], borderColor: [ '#cbcbcb', "rgba(156, 204, 179, 0.98)" ], hoverBorderColor: ['#d9d9d9', 'rgba(156, 204, 179, 0.8)'], hoverBackgroundColor: ['transparent', 'transparent'], borderWidth: '2'
  }], labels: [
      'Ranking',
      'Blue'
  ] } }
                  options={ { cutoutPercentage: 72, color: [ '#333', 'blue'], legend: false, tooltips: { enabled: false },  padding: { left:50, bottom: 15 } }}
                /></div>

                <div className="profile__profileRanking"><h5 className="title" id="leaderboard__rankNumber">298<div className="leaderboard__profileRankingSmallText"></div></h5></div>



                </div>

                  <div className="leaderboard__profileProgressMargins">

                  <div className="leaderboard__progressbarProfile"><div id="leaderBoard__progressBarContainerProfile" style={{ width: '60%', margin: 'auto' }}><div className="leaderboard__carbonProfileMargins">40kg CO2</div></div></div>
                  </div>

                  </div>
                  </div>





                    <div className="profile__profileBottomSpacing"></div>

                    </div> :

                    <div><div className="author">
                      <div className="blockProfile block-one" />
                      <div className="blockProfile block-two" />
                      <div className="blockProfile block-three" />
                      <div className="blockProfile block-four" />

                        <img
                          alt="..."
                          className="avatar"
                          id="profile__mainImage"
                          src={require(`../assets/img/${this.state.avatars[this.state.currentAvatar]}`)}
                        />

                        <div className="settings__positionArrowsContainer">
                        <div className="settings__positionArrows">
                        <div id="settings__leftArrow" onClick={() => this.avatarLeft()}>
                        <FontAwesomeIcon icon={faArrowCircleLeft} id="leftProfileIcon" />
                        </div>

                        <div id="settings__rightArrow" onClick={() => this.avatarRight()}>
                        <FontAwesomeIcon icon={faArrowCircleRight} id="rightProfileIcon" />
                        </div></div>

                        </div>
                    </div>

                    <div className="profile__settingsTopEditContainer">

                    <input defaultValue="Mike Andrew" className="title" id="profile__mainNameInput"/>

                    <input defaultValue="theMike" className="title" id="profile__mainUsernameInput"/>
                    <span className="profile__settingsUnit">@</span>
                    {/* <div className="profile__settingsAtIcon">@</div> */}
                  </div>

                  <div className="profile__positionLogOutButton">
                  <a className="profile__logOutButton">Logout &nbsp;👋️</a>
                  </div>


                    <div className="profile__profileBelow">

                      <div className="leaderboard__profileProgressMargins">



                      </div>

                      </div>
                        <div className="leaderboard__profileBottomSpacing"></div>

                        </div>}



                    </CardBody>


              </Card>
            </Col>

            </div>
            </Row>

            {/* <Row className="profile__bottomCenteringRow">

            <Col md="8">
            <Card>
            <CardBody>

              <div className="profile__friendsTitle">Friends <div className="leaderboard__sideIcon"><i className="tim-icons icon-badge" /></div> </div>

            </CardBody>

            </Card>
            </Col>

            </Row> */}


            <Row className="profile__bottomCenteringRow">

            <Col md="4">
            <Card>
            <CardBody>

            <div className="leaderboard__bottomXPositioning"><Icon icon={accountArrowRight} /></div>
            <div className="leaderboard__bottomLeftArrow"><Icon icon={outlineKeyboardArrowLeft} /></div>

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

            </Row>

        </div>
      </>
    );
  }
}

export default Profile;
