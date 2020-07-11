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
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import { logoutUser } from "../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/core";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCogs } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import checkCircle from '@iconify/icons-la/check-circle';

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
import seedlingIcon from '@iconify/icons-fa-solid/seedling';
import personCircle from '@iconify/icons-ion/person-circle';
import bxCut from '@iconify/icons-bx/bx-cut';
import outlineGroupAdd from '@iconify/icons-ic/outline-group-add';

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

import Tour from 'reactour';
import Text from "./Text";
import Glitch from "./Glitch";
import Tooltip from "./Tooltip";

const steps = [
  {
    selector: '',
    content: () => (
      <div>
      <Glitch data-glitch="styled" style={{ marginBottom: "1px"}}>Profile 😝</Glitch>
      <Text color="#e5e5e5">
        Your Carbonly Profile
      </Text>
      </div>
    ),
    style: {
      backgroundColor: "#fff",

    }
  },
  {
    selector: '[data-tut="tour__changeProfile"]',
    content: () => (
      <div>
      <Glitch data-glitch="styled" style={{ marginBottom: "3px"}}>Edit Profile 🎛</Glitch>
      <img src={require(`../assets/img/landing/editProfile.png`)} style={{ marginBottom: "10px"}} />
      <Text color="#e5e5e5">
        Use This Feature to Change Your Name & Username
      </Text>
      </div>
    ),
    style: {
      backgroundColor: "#fff",

    }
  },
  {
    selector: '[data-tut="tour__changeBudget"]',
    content: () => (
      <div>
      <Glitch data-glitch="styled" style={{ marginBottom: "3px"}}>Change Budget ✂️</Glitch>
      <img src={require(`../assets/img/landing/profileCarbonBudget.png`)} style={{ marginBottom: "10px"}} />
      <Text color="#e5e5e5">
        Change Your Budget to a Chosen Average or Set Your Own!
      </Text>
      </div>
    ),
    style: {
      backgroundColor: "#fff",

    }
  },
  {
    selector: '[data-tut="tour__referFriends"]',
    content: () => (
      <div>
      <Glitch data-glitch="styled" style={{ marginBottom: "3px"}}>Refer Friends 🗞️</Glitch>
      <img src={require(`../assets/img/landing/referCode.png`)} style={{ marginBottom: "10px"}} />
      <Text color="#e5e5e5">
        Share This Referral Code With Friends to <span style={{ "color": "#8db8a2"}}>Gain 2500 Offset Points!</span>
      </Text>
      </div>
    ),
    style: {
      backgroundColor: "#fff",

    }
  },
  {
    selector: '[data-tut="tour__yourFriends"]',
    content: () => (
      <div>
      <Glitch data-glitch="styled" style={{ marginBottom: "3px"}}>Your Friends 👪</Glitch>
      <img src={require(`../assets/img/landing/profileFriends.png`)} style={{ marginBottom: "10px"}} />
      <Text color="#e5e5e5">
        All Your Closest Friends on Carbonly!
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
      <Glitch data-glitch="styled" style={{ marginBottom: "1px"}}>That's It! 🎉</Glitch>
      <Text color="#e5e5e5">
        We're Now Redirecting You Back Home 🛫
      </Text>
      <div style={{ "color": "#fff"}}>{setTimeout(function() {

        axios.post('https://carbonly.org/users/update', { jwt: localStorage.jwtToken, prop: 'doneTour', value: 't' }, {
           jwt: localStorage.jwtToken, prop: 'doneTour', value: 't'
        })
      .then(response => {

        window.location.href = 'https://carbonly.org/home';

      })
      .catch((error) => {

        console.log('Error', error);
      })

       })}</div>
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

let rootA = 'avatars/';

const override = css`
  display: block;
  margin: 0 auto;
`;

class Profile extends React.Component {
constructor(props) {
  super(props);
  this.state = {
      page: 'home',
      avatars: [`${rootA}mainProfileImage-5.png`, `${rootA}mainProfileImage-4.png`, `${rootA}mainProfileImage-3.png`, `${rootA}mainProfileImage-2.png`, `${rootA}mainProfileImage-1.png`, `${rootA}mainProfileImage.png`, `${rootA}mainProfileImage1.png`, `${rootA}mainProfileImage2.png`, `${rootA}mainProfileImage3.png`, `${rootA}mainProfileImage4.png`],
      currentAvatar: 5,
      carbonBudget: 0,
      averageSelected: 'custom',
      isTourOpen:true,
      budgetSelected: false,
      addedReferralCode: false,
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
    this.closeTour = this.closeTour.bind(this);
}
avatarLeft() {
  if (this.state.currentAvatar > 0) {
  let newNum = this.state.currentAvatar - 1;
  /* Update Server */
  this.setState({ currentAvatar: newNum });

  axios.post('https://carbonly.org/users/update', { jwt: localStorage.jwtToken, prop: 'avatar', value: this.state.avatars[newNum], }, {
    prop: 'avatar', value: this.state.avatars[newNum], 'jwt': localStorage.jwtToken,
  })
.then(response => {

  // console.log('UPDATED');

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

  axios.post('https://carbonly.org/users/update', { jwt: localStorage.jwtToken, prop: 'avatar', value: this.state.avatars[newNum], }, {
    prop: 'avatar', value: this.state.avatars[newNum], 'jwt': localStorage.jwtToken,
  })
.then(response => {

  // console.log('UPDATED');

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

  axios.post('https://carbonly.org/users/return-leaderboard', { jwt: localStorage.jwtToken }, {
    'jwt': localStorage.jwtToken,
  })
.then(response => {

  if (response.data.info[0].hasLoggedIn === 'f') {
    window.location.href="/click";
  }

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
returnNumberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
returnUserPoints() {

  let totPoints = 0;

  this.state.user.offsets.map((off) => {
    totPoints += parseFloat(off.points);
  })

  this.state.user.orders.map((or) => {
    totPoints += parseFloat(or.points);
  })

  totPoints += parseFloat(this.state.user.bonusPoints)

  return `${this.returnOffsets(totPoints)}`;
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

  <div className="profile__bottomComparisonAndCarbonContainer">

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

<div className="leaderboard__progressbarBottomPositioning"><div id="leaderBoard__progressBarContainerBottom"><div className="leaderboard__mainCO2EmissionsAddFriends"><Icon icon={seedlingIcon} className="leaderboard__pointsIcon" />{this.returnOffsets(parseFloat(this.state.friends[friend1].points))}</div></div></div>

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
  // console.log('should be logged out');
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

<div className="leaderboard__progressbarBottomPositioning"><div id="leaderBoard__progressBarContainerBottom"><div className="leaderboard__mainCO2EmissionsAddFriends"><Icon icon={seedlingIcon} className="leaderboard__pointsIcon" />{this.returnOffsets(parseFloat(this.state.friends[friend2].points))}</div></div></div>

</div>

    </CardBody>

    </Card>
    </Col>)


  } else {

    return (<Col md="4">
    <Card>
    <CardBody>

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

  <div className="leaderboard__progressbarBottomPositioning"><div id="leaderBoard__progressBarContainerBottomNoUser"><div className="leaderboard__mainCO2EmissionsAddFriends"><Icon icon={seedlingIcon} className="leaderboard__pointsIcon" />{'5,000'}</div></div></div>

  </div>

    <div className="profile__noUserHeight"></div>

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

      // console.log('got to here');

    axios.post('https://carbonly.org/users/update', { jwt: localStorage.jwtToken, prop: 'name', value: String(e.target.value) }, {
      'prop': 'name', 'value': String(e.target.value), 'jwt': localStorage.jwtToken
    })
  .then(response => {

    // console.log('saved');

    this.setState({ save: 'Saved' });

  })
  .catch((error) => {
    console.log(error);
    // SHOW ERROR AND DON'T CHANGE PAGE
  })

// console.log('got to the end');

}

}
updateUsername(e) {

  // console.log('e.target', e.target.value);

  const re = /^\S*$/;

  const ret = /[,.+-:;=~#@`'"{}/\[\]!?\-]/;

  let input = e.target.value.slice(1, e.target.value.length);

  // console.log('type', input);

  if ((String(input).length < 20) && (re.test(input)) && !(ret.test(input))) {
    this.setState({ username: e.target.value.slice(1, e.target.value.length) });

    this.setState({ save: 'Saving.. 😴' });

    axios.post('https://carbonly.org/users/update', { jwt: localStorage.jwtToken, prop: 'username', value: e.target.value.slice(1, e.target.value.length), }, {
      prop: 'username', value: e.target.value.slice(1, e.target.value.length), 'jwt': localStorage.jwtToken,
    })
  .then(response => {

    this.setState({ save: 'Saved 🎉' });

  })
  .catch((error) => {
    console.log(error);
    // SHOW ERROR AND DON'T CHANGE PAGE
  })

  }

}
changeBudgetAverage(e) {
  this.setState({ budgetSelected: false });
  this.setState({ averageSelected: e.target.value });

  if (e.target.value === 'european') {
    this.setState({ carbonBudget: 800 });
  } else if (e.target.value === 'finnish') {
    this.setState({ carbonBudget: 600 });
  } else if (e.target.value === 'scandinavian') {
    this.setState({ carbonBudget: 700 });
  } else if (e.target.value === 'unitedStates') {
    this.setState({ carbonBudget: 1200 });
  } else if (e.target.value === 'carbonlyAvg') {
    this.setState({ carbonBudget: 900 });
  } else if (e.target.value === 'custom') {
    this.setState({ carbonBudget: 0 });
  }
}
changeBudget(e) {
  this.setState({ budgetSelected: false });
  this.setState({ carbonBudget: e.target.value });
  this.setState({ averageSelected: 'custom' });
}
selectBudget() {

  axios.post('https://carbonly.org/users/update', { jwt: localStorage.jwtToken, prop: 'budget', value: this.state.carbonBudget }, {
    'prop': 'name', 'value': this.state.carbonBudget, 'jwt': localStorage.jwtToken
  })
.then(response => {

  // console.log('saved');

  this.setState({ budgetSelected: true });

})
.catch((error) => {
  console.log(error);
})

}
copyReferral() {

    var input = document.createElement('input');
    input.setAttribute('value', this.state.user.referralCode);
    document.body.appendChild(input);
    input.select();
    var result = document.execCommand('copy');
    document.body.removeChild(input);

  this.setState({ addedReferralCode: true })
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
render() {
    return (
      <>
      <div className="content">

      <Helmet>
        <title>Carbonly | Profile</title>
        <meta name="description" content="View Your Carbonly Social Profile!" />
      </Helmet>

      {this.state.user && this.state.userRank && this.state.friends && this.state.allUsers ? <div>
          <Row>
          <div className="profile__centeringMainCard">
            <Col md="8">
              <Card className="card-user">
                <CardHeader>

                </CardHeader>
                <CardBody>

                { this.state.page === 'home' ? <div data-tut="tour__changeProfile"  onClick={() => this.setProfilePage('settings')} className="proilfe__settingssIconPositioning"><i className="tim-icons icon-settings-gear-63" /></div> : <div onClick={() => this.setProfilePage('home')} className="profile__backIconPositioning"><i className="tim-icons icon-minimal-left" /></div>}


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

                    <h5 className="title" id="profile__mainName">{this.state.name} <div className="tooltipProfile" data-tut="tour__referFriends" onClick={() => this.copyReferral()}><Icon className="profile__referralSharer" icon={outlineGroupAdd} />
                      <span className="tooltiptextProfile">{this.state.addedReferralCode ? <div style={{"width": "90%", "margin-left":"auto", "margin-right": "auto", "font-size": "0.87em", "line-height": "1.35", "padding-top":"6px", "padding-bottom":"6px"}}>Copied &nbsp; 🎉</div> : <div style={{"width": "90%", "margin-left":"auto", "margin-right": "auto", "font-size": "0.87em", "line-height": "1.35", "padding-top":"4px", "padding-bottom":"4px"}}>Copy Referral Code to Share &nbsp;👪</div>}</span></div>

                      </h5>

                    <p className="description" id="profile__mainUsername">{`@` + this.state.username}</p>
                </div>

                <div className="profile__statsMargins">

                <div className="leaderboard__profileBelow">

                <div className="leaderboard__doughnutMargins">

                <div className="leaderboard__pieSize">
                <Doughnut
                  data={ {  datasets: [{
      data: [this.state.userRank - 1, this.state.allUsers.length - this.state.userRank], backgroundColor: [ 'rgba(203, 203, 203, 0.39)', 'rgba(156, 204, 179, 0.39)'], borderColor: [ '#cbcbcb', "rgba(156, 204, 179, 0.98)" ], hoverBorderColor: ['#d9d9d9', 'rgba(156, 204, 179, 0.8)'], hoverBackgroundColor: ['transparent', 'transparent'], borderWidth: '2'
  }], labels: [
      'Ranking',
      'Blue'
  ] } }
                  options={ { cutoutPercentage: 72, color: [ '#333', 'blue'], legend: false, tooltips: { enabled: false },  padding: { left:50, bottom: 15 } }}
                /></div>

                <div className="profile__profileRanking"><h5 className="title" id="leaderboard__rankNumber">{this.state.userRank}<div className="leaderboard__profileRankingSmallText"></div></h5></div>



                </div>

                  <div className="leaderboard__profileProgressMargins">

                  <div className="leaderboard__progressbarProfile"><div id="leaderBoard__progressBarContainerProfile" style={{ width: '60%', margin: 'auto' }}><div className="leaderboard__carbonProfileMargins"><Icon icon={seedlingIcon} className="leaderboard__pointsIcon" />{this.returnUserPoints()}</div></div></div>
                  </div>

                  </div>
                  </div>

                  <div className="profile__carbonBudgetHeader">Carbon Budget <Icon icon={bxCut} className="profile__getPointsLeaf" /></div>

                  <div className="profile__carbonBudegetCentering">

                  <span className="profile__budgetInput"><select className="offsets__currencySelect" value={this.state.averageSelected} onChange={(e) => this.changeBudgetAverage(e)}>
                  <option value="custom">Custom</option>
                  <option value="european">European Avg</option>
                  <option value="finnish">Finnish Avg</option>
                  <option value="scandinavian">Scandinavian Avg</option>
                  <option value="unitedStates">United States Avg</option>
                  <option value="carbonlyAvg">Carbonly Avg</option>
                  </select></span><input data-tut="tour__changeBudget" value={this.state.carbonBudget} maxlength="8" onChange={(e) => this.changeBudget(e)} className="profile__carbonBudgetInput"/>   </div><div onClick={() => { this.selectBudget()}} className={this.state.budgetSelected ? "profile__addBudgetSelected" : "profile__addBudget"}>{this.state.budgetSelected ? 'Selected' : 'Select'}</div>

                    <div className="profile__profileBottomSpacing"></div>

                    <span className="analytics__middleCardExplanations"><span className="analytics__positionDescriptionCheck"><Icon icon={checkCircle} /></span><span className="analytics__descriptionText">Set Your Personal Budget for <Link className="analytics__infoLink" to="/Analytics">Analytics</Link></span> &nbsp;🎯</span>

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

                  <div className="editProfile__positionSave">{this.state.save}</div>

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

          {this.state.friends.length > 0 ? <Row data-tut="tour__yourFriends" id="profile__friendsCentering">{this.returnFriends()}{this.returnFriendsTwo()}</Row> :


          <Row id="profile__friendsCentering"><Col md="8">
            <Card>
              <CardHeader>


              </CardHeader>



              <CardBody>

              <div className="profile__centerContent">

              <div className="leaderboard__mainTitleNotFound">No Friends to Show &nbsp;<Icon icon={sadTear} /></div>

              <div className="leaderboard__noFriendsDescriptionProfile">Go to Leaderboard to Add Your First Friends!</div>

              <div className="notFound__positionButton">

              <Link to="/leaderboard" className="userProfile__submitButton">Leaderboard &nbsp; 📊</Link>

              </div>

              <div className="leaderboard__leaderboardBottomCardSpacingNotFound"></div>

              </div>

              </CardBody>

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


            <Row>
            <div className="profile__centeringMainCard">
              <Col md="8">
                <Card>
                  <CardHeader>

                  </CardHeader>
                  <CardBody>

                      <div className="profile__getPointsHeader">Get Offset Points! <Icon icon={seedlingIcon} className="profile__getPointsLeaf" /></div>

                      <div className="getPoints__centerIndividualOnes">

                      <div className="profile__getPointsInd">
                      <div className="profile__getPointsIndLeft">
                      <div className="profile__getPointsSubtitle">1. Buy Sustainable Goods</div>
                      <div className="profile__getPointsDescription"> > The More Carbon Avoided, The More Points!</div>
                      </div>
                      <div className="profile__getPointsNumber">Up to 1500 Points <br/> <div className="profile__getPointsNumSmaller">Per Product</div></div>
                      </div>

                      <div className="profile__getPointsMiddleDiv"></div>

                      <div className="profile__getPointsInd">
                      <div className="profile__getPointsIndLeft">
                      <div className="profile__getPointsSubtitle">2. Refer New Users</div>
                      <div className="profile__getPointsDescription"> > Referal Code:&nbsp;{this.state.user.referralCode}</div>
                      </div>
                      <div className="profile__getPointsNumber">2500 points <br/><div className="profile__getPointsNumSmaller">Per User</div></div>
                      </div>

                      <div className="profile__getPointsMiddleDiv"></div>

                      <div className="profile__getPointsInd">
                      <div className="profile__getPointsIndLeft">
                      <div className="profile__getPointsSubtitle">3. Offset Your Orders</div>
                      <div className="profile__getPointsDescription"> > Receive 10,000 Per Tonne of CO2 Offset!</div>
                      </div>
                      <div className="profile__getPointsNumber">Up to 10,000 points <br/><div className="profile__getPointsNumSmaller">Per Offset</div></div>
                      </div>

                      </div>

                      <div className="profile__profileBottomSpacing"></div>





                      </CardBody>


                </Card>
              </Col>

              </div>
              </Row>

              {!this.state.user.hasDoneTour ? <Tour
              steps={steps}
              {...props}
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
        /></div> }</div>
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
