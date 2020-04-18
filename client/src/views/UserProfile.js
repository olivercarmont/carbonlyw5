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

class UserProfile extends React.Component {
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
                      src={require("assets/img/avatars/mainProfileImage.png")}
                    />

                    <h5 className="title" id="profile__mainName">Mike Andrew</h5>

                  <p className="description" id="profile__mainUsername">@theMike</p>
                </div>

                <div className="profile__profileBelow">

                <div className="leaderboard__doughnutMargins">

                <Doughnut
                  data={ {  datasets: [{
      data: [10, 90], backgroundColor: [ 'transparent', 'transparent'], borderColor: [ 'transparent', "#b5eccf" ], hoverBorderColor: ['transparent', '#b5eccf'], hoverBackgroundColor: ['rgba(#247EF6,0.6)', 'transparent']
  }], labels: [
      'Ranking',
      'Blue'
  ] } }
                  options={ { cutoutPercentage: 69, backgroundColor: 'red', borderColor: 'red', color: [ '#333', 'blue'], legend: false, tooltips: { enabled: false },  padding: { left:50, bottom: 15 } }}
                />

                <div className="leaderboard__profileRanking"><h5 className="title" id="leaderboard__sideUserName">298<div className="leaderboard__profileRankingSmallText">th</div></h5></div>



                </div>

                  <div className="leaderboard__profileProgressMargins">

                  <div className="leaderboard__progressbarProfile"><div id="leaderBoard__progressBarContainerProfile" style={{ width: '60%', margin: 'auto' }}><div className="leaderboard__carbonProfileMargins">40kg CO2</div></div></div>
                  </div>

                  </div>

                    <div className="profile__friendsTitle">Friends <div className="leaderboard__sideIcon"><i className="tim-icons icon-badge" /></div> </div>

                  <div className="profile__friendMainContainer">

                  <div className="profile__friendCard">

                  <div className="profile__bottomLeftArrowPositioning"><i className="tim-icons icon-minimal-left" /></div>

                  <div className="profile__bottomCenterImage">
                  <img src={require("assets/img/avatars/mainProfileImage-3.png")} className="leaderboard__friendsImg" />
                  </div>

                  <div className="leaderboard__nameAndUsernamContainerBottom">
                  <h5 className="title" id="profile__sideNameBottom">Mike Andrew</h5>
                  <p className="description" id="profile__sideUsernameBottom">@{'mikeAndrew'}</p>
                  </div>

                  <div className="profile__positioningBottomButtons">
                  <a className="profile__bottomProfileButtons">Visit Profile &nbsp; 🛴</a>
                  <a className="profile__bottomProfileButtons profile__bottomProfileButtons2">Unfriend &nbsp;🗑️</a>
                  </div>

                  </div>

                  <div className="profile__friendCardRight">

                  <div className="profile__bottomRightArrowPositioning"><i className="tim-icons icon-minimal-right" /></div>

                  <div className="profile__bottomCenterImage">
                  <img src={require("assets/img/avatars/mainProfileImage-3.png")} className="leaderboard__friendsImg" />
                  </div>

                  <div className="leaderboard__nameAndUsernamContainerBottom">
                  <h5 className="title" id="profile__sideNameBottom">Mike Andrew</h5>
                  <p className="description" id="profile__sideUsernameBottom">@{'mikeAndrew'}</p>
                  </div>

                  <div className="profile__positioningBottomButtons">
                  <a className="profile__bottomProfileButtons">Visit Profile &nbsp; 🛴</a>
                  <a className="profile__bottomProfileButtons profile__bottomProfileButtons2">Unfriend &nbsp;🗑️</a>
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
                          src={require(`assets/img/${this.state.avatars[this.state.currentAvatar]}`)}
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

        </div>
      </>
    );
  }
}

export default UserProfile;
