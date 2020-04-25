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

import { logoutUser } from "../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

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

import sadTear from '@iconify/icons-fa-regular/sad-tear';
import handPointRight from '@iconify/icons-fa-regular/hand-point-right';

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

import '../OwnCSS/profile.css';
import { Line, Bar, Doughnut} from "react-chartjs-2";

let rootA = 'avatars/';

class Profile extends React.Component {
constructor(props) {
  super(props);
  this.state = {
      page: 'home',
      avatars: [`${rootA}mainProfileImage-5.png`, `${rootA}mainProfileImage-4.png`, `${rootA}mainProfileImage-3.png`, `${rootA}mainProfileImage-2.png`, `${rootA}mainProfileImage-1.png`, `${rootA}mainProfileImage.png`, `${rootA}mainProfileImage1.png`, `${rootA}mainProfileImage2.png`, `${rootA}mainProfileImage3.png`, `${rootA}mainProfileImage4.png`],
      currentAvatar: 5,
      friendsMove: 1,
      save: '',
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
}
avatarLeft() {
  if (this.state.currentAvatar > 0) {
  let newNum = this.state.currentAvatar - 1;
  /* Update Server */
  this.setState({ currentAvatar: newNum });

  axios.post('http://localhost:5000/users/update', { jwt: localStorage.jwtToken, prop: 'avatar', value: this.state.avatars[newNum], }, {
    prop: 'avatar', value: this.state.avatars[newNum], 'jwt': localStorage.jwtToken,
  })
.then(response => {

  console.log('UPDATED');

})
.catch((error) => {
  console.log(error);
})

  }
}
avatarRight() {
  if (this.state.currentAvatar < 9) {
  let newNum = this.state.currentAvatar + 1;
  /* Update Server */
  this.setState({ currentAvatar: newNum });

  axios.post('http://localhost:5000/users/update', { jwt: localStorage.jwtToken, prop: 'avatar', value: this.state.avatars[newNum], }, {
    prop: 'avatar', value: this.state.avatars[newNum], 'jwt': localStorage.jwtToken,
  })
.then(response => {

  console.log('UPDATED');

})
.catch((error) => {
  console.log(error);
})

  }
}
setProfilePage(page) {

    this.setState({ page });

//   let updateStatus = false;
//
// if (this.state.currentAvatar !== this.state.onum || this.state.user.name !== this.state.name || this.state.user.username !== this.state.username) {
//
//   let avatarChosen = this.state.avatar[this.state.currentAvatar];
//
// } else {
// }


}
componentWillMount() {

  axios.post('http://localhost:5000/users/return-leaderboard', { jwt: localStorage.jwtToken }, {
    'jwt': localStorage.jwtToken,
  })
.then(response => {

    // console.log('response', response.data);

     this.setState({ user: response.data.info[0] });
     this.setState({ userRank: response.data.info[3].usrank });
     this.setState({ friends: response.data.info[1] });
     this.setState({ allUsers: response.data.info[4] });

     this.setState({ name: response.data.info[0].name });
     this.setState({ username: response.data.info[0].username });

     let avatar = response.data.info[0].avatar;

     let av, onum;

     this.state.avatars.map((a) => {
       if (a === avatar) {
        av = a;
       }
     })

     onum = this.state.avatars.indexOf(av);

     console.log('onum', onum);

     this.setState({ onum });

     this.setState({ currentAvatar: onum });

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

  return `${this.returnOffsets(offsetAmount)} CO2`;
}
returnFriends() {
  let friend1 = this.state.friendsMove - 1;

    return (<Col md="4">
    <Card>
    <CardBody>

    <a href={`/user/@${this.state.friends[friend1].username}`} className="leaderboard__bottomXPositioning"><Icon icon={accountArrowRight} /></a>
    {this.state.friendsMove > 1 ? <div className="leaderboard__bottomLeftArrow" onClick={() => this.shiftFriendsLeft()}><Icon icon={outlineKeyboardArrowLeft} /></div> : undefined }

    <a href={`/user/@${this.state.friends[friend1].username}`} className="leaderboard__bottomCenterImage">
    <img src={require(`../assets/img/${this.state.friends[friend1].avatar}`)} className="leaderboard__friendsImg" />
    </a>

    <div className="leaderboard__nameAndUsernamContainerBottom">
    <a href={`/user/@${this.state.friends[friend1].username}`} className="title" id="leaderboard__sideNameBottom">{this.state.friends[friend1].name}</a>
    <a href={`/user/@${this.state.friends[friend1].username}`} className="description" id="leaderabord__sideUsernameBottom">@{this.state.friends[friend1].username}</a>
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

<div className="leaderboard__progressbarBottomPositioning"><div id="leaderBoard__progressBarContainerBottom"><div className="leaderboard__mainCO2EmissionsAddFriends">{this.returnOffsets(parseFloat(this.state.friends[friend1].offsetAmount))}</div></div></div>

</div>

    </CardBody>

    </Card>
    </Col>)

}
shiftFriendsLeft() {
  this.setState({ friendsMove: this.state.friendsMove - 2 });
}
shiftFriendsRight() {
  this.setState({ friendsMove: this.state.friendsMove + 2 });
}
onLogoutClick() {
  // e.preventDefault();
  console.log('should be logged out');
  this.props.logoutUser();
};
returnFriendsTwo() {

  let friend2 = this.state.friendsMove;
  let checkFLength = friend2 + 1;

  if (this.state.friends.length >= checkFLength) {

    return (<Col md="4">
    <Card>
    <CardBody>

    <a href={`/user/@${this.state.friends[friend2].username}`} className="leaderboard__bottomXPositioning"><Icon icon={accountArrowRight} /></a>
    {this.state.friends.length > checkFLength ? <div className="leaderboard__bottomRightArrow" onClick={() => this.shiftFriendsRight()}><Icon icon={outlineKeyboardArrowRight} /></div> : undefined}

    <a href={`/user/@${this.state.friends[friend2].username}`} className="leaderboard__bottomCenterImage">
    <img src={require(`../assets/img/${this.state.friends[friend2].avatar}`)} className="leaderboard__friendsImg" />
    </a>

    <div className="leaderboard__nameAndUsernamContainerBottom">
    <a href={`/user/@${this.state.friends[friend2].username}`} className="title" id="leaderboard__sideNameBottom">{this.state.friends[friend2].name}</a>
    <a href={`/user/@${this.state.friends[friend2].username}`} className="description" id="leaderabord__sideUsernameBottom">@{this.state.friends[friend2].username}</a>
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

<div className="leaderboard__progressbarBottomPositioning"><div id="leaderBoard__progressBarContainerBottom"><div className="leaderboard__mainCO2EmissionsAddFriends">{this.returnOffsets(parseFloat(this.state.friends[friend2].offsetAmount))}</div></div></div>

</div>

    </CardBody>

    </Card>
    </Col>)


  } else {

    return (<Col md="4">
    <Card>
    <CardBody>

  {/*  <hr className="leaderboard__noUserHr1" />

    <hr className="leaderboard__noUserHr2" />

    <hr className="leaderboard__noUserHr3" />

    <hr className="leaderboard__noUserHr4" /> */}

    <div className="leaderboard__noUserMargins">

    <Icon icon={personCircle} className="leaderboard__noUserIcon" />

    <div className="leaderboard__noUserFriendName">Best Friend</div>

    <div className="leaderboard__noUserFriendUsername">@bestFriend</div>

    <div className="leaderboard__bottomComparisonAndCarbonContainer">

    <div className="leaderboard__graphsLagerContainerNoUser">
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

  <div className="leaderboard__progressbarBottomPositioning"><div id="leaderBoard__progressBarContainerBottomNoUser"><div className="leaderboard__mainCO2EmissionsAddFriends">{'5t CO2'}</div></div></div>

  </div>

    <div className="leaderboard__noUserHeight"></div>

    </div>

    </CardBody>

    </Card>
    </Col>)

  }

}
updateName(e) {
 //  username: this.state.username, avatar: avatarChosen
  let input = e.target.value;
  if (String(input).length < 30) {
    this.setState({ name: e.target.value });

    this.setState({ save: 'Saving..' });

      console.log('got to here');

    axios.post('http://localhost:5000/users/update', { jwt: localStorage.jwtToken, prop: 'name', value: String(e.target.value) }, {
      'prop': 'name', 'value': String(e.target.value), 'jwt': localStorage.jwtToken
    })
  .then(response => {

    console.log('saved');

    this.setState({ save: 'Saved' });

  })
  .catch((error) => {
    console.log(error);
    // SHOW ERROR AND DON'T CHANGE PAGE
  })

console.log('got to the end');

}

}
updateUsername(e) {

  console.log('e.target', e.target.value);

  const re = /^\S*$/;

  const ret = /[,.+-:;=~#@`'"{}/\[\]!?\-]/;

  let input = e.target.value.slice(1, e.target.value.length);

  console.log('type', input);

  if ((String(input).length < 20) && (re.test(input)) && !(ret.test(input))) {
    this.setState({ username: e.target.value.slice(1, e.target.value.length) });

    this.setState({ save: 'Saving..' });

    axios.post('http://localhost:5000/users/update', { jwt: localStorage.jwtToken, prop: 'username', value: e.target.value.slice(1, e.target.value.length), }, {
      prop: 'username', value: e.target.value.slice(1, e.target.value.length), 'jwt': localStorage.jwtToken,
    })
  .then(response => {

    this.setState({ save: 'Saved' });

  })
  .catch((error) => {
    console.log(error);
    // SHOW ERROR AND DON'T CHANGE PAGE
  })

  }

}
render() {
    return (
      <>
      <div className="content">
      {this.state.user && this.state.userRank && this.state.friends && this.state.allUsers ? <div>
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
                      src={require(`../assets/img/${this.state.avatars[this.state.currentAvatar]}`)}
                    />

                    <h5 className="title" id="profile__mainName">{this.state.name}</h5>

                    <p className="description" id="profile__mainUsername">{`@` + this.state.username}</p>
                </div>

                <div className="profile__statsMargins">

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

                <div className="profile__profileRanking"><h5 className="title" id="leaderboard__rankNumber">{this.state.userRank}<div className="leaderboard__profileRankingSmallText"></div></h5></div>



                </div>

                  <div className="leaderboard__profileProgressMargins">

                  <div className="leaderboard__progressbarProfile"><div id="leaderBoard__progressBarContainerProfile" style={{ width: '60%', margin: 'auto' }}><div className="leaderboard__carbonProfileMargins">{this.returnUserOffsets()}</div></div></div>
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

                    <input value={this.state.name} onChange={(e) => this.updateName(e)} className="title" id="profile__mainNameInput"/>

                    <input value={`@` + this.state.username} onChange={(e) => this.updateUsername(e)} className="title" id="profile__mainUsernameInput"/>
                    {/* <span className="profile__settingsUnit">@</span> */}
                    {/* <div className="profile__settingsAtIcon">@</div> */}
                  </div>

                  {this.state.save}

                  <div className="profile__positionLogOutButton" onClick={() => this.onLogoutClick()}>
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

          {this.state.page === 'home' ? <div>

          {this.state.friends.length > 0 ? <Row id="profile__friendsCentering">{this.returnFriends()}{this.returnFriendsTwo()}</Row> :


          <Row id="profile__friendsCentering"><Col md="8">
            <Card>
              <CardHeader>
              <div className="leaderboard__mainTitleNotFound">No Friends to Show &nbsp;<Icon icon={sadTear} /></div>

              <div className="leaderboard__noFriendsRightPointer">
              <Icon icon={handPointRight} /></div>


              <div className="leaderboard__noFriendsDescription">Use The Card to The Right to Add Your First Friends!</div>

              </CardHeader>

              <div className="leaderboard__leaderboardBottomCardSpacingNotFound"></div>

            </Card>
          </Col></Row>}


          </div> : undefined}


            {/* <Row className="profile__bottomCenteringRow">

            <Col md="8">
            <Card>
            <CardBody>

              <div className="profile__friendsTitle">Friends <div className="leaderboard__sideIcon"><i className="tim-icons icon-badge" /></div> </div>

            </CardBody>

            </Card>
            </Col>

            </Row> */}

        </div> : undefined}</div>
      </>
    );
  }
}

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Profile);
