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
import roundGroupAdd from '@iconify/icons-ic/round-group-add';
import accountSearch from '@iconify/icons-mdi/account-search';
import seedlingIcon from '@iconify/icons-fa-solid/seedling';
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
      friendsMove: 1,
      userFound: true,
    };
}
setProfilePage(page) {
  this.setState({ page });
}
componentWillMount() {

  let pusername = window.location.href.split('/')[4];

  pusername = pusername.slice(1, pusername.length);

  console.log('username', pusername);

  axios.post('http://carbonly.org/users/return-leaderboard', { jwt: localStorage.jwtToken }, {
    'jwt': localStorage.jwtToken,
  })
.then(response => {

    // console.log('response', response.data);

     this.setState({ user: response.data.info[0] });
     this.setState({ friends: response.data.info[1] });
     this.setState({ allUsers: response.data.info[4] });

     let allUsers = response.data.info[4];
     let puser, pfriends = [];

     allUsers.map((us) => {
       if (us.username === pusername) {
         puser = us;
       }
     });

     if (!puser) {
       this.setState({ userFound: false });
     } else {

     puser.friends.map((fri) => {
       allUsers.map((us) => {
         if (us.publicId === fri) {
           pfriends.push(us);
         }
       });
     });

     console.log('actual friend', pfriends[0]);

     let isFriend = false;
     let uFriends = response.data.info[0].friends;

     uFriends.map((fri) => {

       console.log('fri', fri);
       console.log('puser', puser.publicId);

       if (fri === puser.publicId) {
         isFriend = true;
       }

     })

     this.setState({ isFriend });

     this.setState({ pfriends: pfriends });
     this.setState({ puser: puser });

     console.log('puser', puser);
     console.log('pfriends', pfriends);

    }

})
.catch((error) => {
  console.log(error);
})
}
returnOffsets(amount) {

let calcData;

  if (amount === 0) {

    return `${amount}`;

  } else if (amount > 999) {

    calcData = amount / 1000;

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




returnFriends() {

  console.log('friends', this.state.pfriends)

  let friend1 = this.state.friendsMove - 1;

    return (<Col md="4">
    <Card>
    <CardBody>

    <a href={`/user/@${this.state.pfriends[friend1].username}`} className="leaderboard__bottomXPositioning"><Icon icon={accountArrowRight} /></a>
    {this.state.friendsMove > 1 ? <div className="leaderboard__bottomLeftArrow" onClick={() => this.shiftFriendsLeft()}><Icon icon={outlineKeyboardArrowLeft} /></div> : undefined }

    <a href={`/user/@${this.state.pfriends[friend1].username}`} className="leaderboard__bottomCenterImage">
    <img src={require(`../assets/img/${this.state.pfriends[friend1].avatar}`)} className="leaderboard__friendsImg" />
    </a>

    <div className="leaderboard__nameAndUsernamContainerBottom">
    <a href={`/user/@${this.state.pfriends[friend1].username}`} className="title" id="leaderboard__sideNameBottom">{this.state.pfriends[friend1].name}</a>
  <a href={`/user/@${this.state.pfriends[friend1].username}`} className="description" id="leaderabord__sideUsernameBottom">@{this.state.pfriends[friend1].username}</a>
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
returnFriendsTwo() {

  let friend2 = this.state.friendsMove;
  let checkFLength = friend2 + 1;

  if (this.state.friends.length >= checkFLength) {

    return (<Col md="4">
    <Card>
    <CardBody>

    <a href={`/user/@${this.state.pfriends[friend2].username}`} className="leaderboard__bottomXPositioning"><Icon icon={accountArrowRight} /></a>
    {this.state.friends.length > checkFLength ? <div className="leaderboard__bottomRightArrow" onClick={() => this.shiftFriendsRight()}><Icon icon={outlineKeyboardArrowRight} /></div> : undefined}

    <a href={`/user/@${this.state.pfriends[friend2].username}`} className="leaderboard__bottomCenterImage">
    <img src={require(`../assets/img/${this.state.pfriends[friend2].avatar}`)} className="leaderboard__friendsImg" />
    </a>

    <div className="leaderboard__nameAndUsernamContainerBottom">
    <a href={`/user/@${this.state.pfriends[friend2].username}`} className="title" id="leaderboard__sideNameBottom">{this.state.friends[friend2].name}</a>
    <a href={`/user/@${this.state.pfriends[friend2].username}`} className="description" id="leaderabord__sideUsernameBottom">@{this.state.friends[friend2].username}</a>
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
addUser(id) {

  let newFriends = this.state.friends.map((fri) => { return fri });

  let user;

  this.state.allUsers.map((us) => {
    if (us.publicId === id) {
      user = us;
    }
  })

  newFriends.unshift(user);

  let newFriendsDB = this.state.user.friends.map((fri) => { return fri });

  newFriendsDB.unshift(id);

  this.setState({ friends: newFriends });

  axios.post('http://carbonly.org/users/update', { jwt: localStorage.jwtToken, prop: 'friends', value: newFriendsDB, }, {
      prop: 'friends', value: newFriendsDB, 'jwt': localStorage.jwtToken,
    })
  .then(response => {

    console.log('UPDATED');

  })
  .catch((error) => {
    console.log(error);
  })

  this.setState({ isFriend: true });

}
removeUser(id) {

  let user;

  this.state.allUsers.map((us) => {
    if (us.publicId === id) {
      user = us;
    }
  })

  let newFriends = this.state.friends.map((fri) => { return fri });

  let nFI = newFriends.indexOf(user);
  newFriends.splice(nFI, 1);

  let newFriendsDB = this.state.user.friends.map((fri) => { return fri });

  let nFDBI = newFriendsDB.indexOf(id);
  newFriendsDB.splice(nFDBI, 1);

  this.setState({ friends: newFriends });

  axios.post('http://carbonly.org/users/update', { jwt: localStorage.jwtToken, prop: 'friends', value: newFriendsDB, }, {
      prop: 'friends', value: newFriendsDB, 'jwt': localStorage.jwtToken,
    })
  .then(response => {

    console.log('UPDATED');

  })
  .catch((error) => {
    console.log(error);
  })

  this.setState({ isFriend: false });

}
render() {
    return (
      <>
      <div className="content">
      {console.log('stateChecks', `1 ${!!this.state.user} 2 ${!!this.state.friends} 3 ${!!this.state.allUsers} 4 ${!!this.state.puser} 5 ${!!this.state.pfriernds}`)}
      {this.state.user && this.state.friends && this.state.allUsers && this.state.puser ? <div>
      <Row>
      <div className="profile__centeringMainCard">
        <Col md="8">
          <Card className="card-user">
            <CardHeader>

            </CardHeader>
            <CardBody>

            <div className="author">
              <div className="blockProfile block-one" />
              <div className="blockProfile block-two" />
              <div className="blockProfile block-three" />
              <div className="blockProfile block-four" />

                <img
                  alt="..."
                  className="avatar"
                  id="profile__mainImage"
                  src={require(`../assets/img/${this.state.puser.avatar}`)}
                />

                <h5 className="title" id="profile__mainName">{this.state.puser.name}</h5>

              <p className="description" id="profile__mainUsername">@{this.state.puser.username}</p>
            </div>

            {this.state.puser.publicId !== this.state.user.publicId ? this.state.isFriend ? <div onClick={() => this.removeUser(this.state.puser.publicId)} className="userProfile__addButton">Remove &nbsp; 🙅</div> : <div onClick={() => this.addUser(this.state.puser.publicId)} className="userProfile__addButton">Add &nbsp; 🎉</div> : undefined}

            <div className="profile__statsMargins">

            <div className="leaderboard__profileBelow">

            <div className="leaderboard__doughnutMargins">

            <div className="leaderboard__pieSize">
            <Doughnut
              data={ {  datasets: [{
  data: [this.state.puser.rank - 1, this.state.allUsers.length - this.state.puser.rank], backgroundColor: [ 'rgba(203, 203, 203, 0.39)', 'rgba(156, 204, 179, 0.39)'], borderColor: [ '#cbcbcb', "rgba(156, 204, 179, 0.98)" ], hoverBorderColor: ['#d9d9d9', 'rgba(156, 204, 179, 0.8)'], hoverBackgroundColor: ['transparent', 'transparent'], borderWidth: '2'
}], labels: [
  'Ranking',
  'Blue'
] } }
              options={ { cutoutPercentage: 72, color: [ '#333', 'blue'], legend: false, tooltips: { enabled: false },  padding: { left:50, bottom: 15 } }}
            /></div>

            <div className="profile__profileRanking"><h5 className="title" id="leaderboard__rankNumber">{this.state.puser.rank}<div className="leaderboard__profileRankingSmallText"></div></h5></div>



            </div>

              <div className="leaderboard__profileProgressMargins">

              <div className="leaderboard__progressbarProfile"><div id="leaderBoard__progressBarContainerProfile" style={{ width: '60%', margin: 'auto' }}><div className="leaderboard__carbonProfileMargins"><Icon icon={seedlingIcon} className="leaderboard__pointsIcon" />{this.state.puser.points}</div></div></div>
              </div>

              </div>
              </div>

                <div className="profile__profileBottomSpacing"></div>

                </CardBody>


          </Card>
        </Col>

        </div>
        </Row>

      {this.state.page === 'home' ? <div>

      {this.state.pfriends.length > 0 ? <Row id="profile__friendsCentering">{this.returnFriends()}{this.returnFriendsTwo()}</Row> :


      <Row id="profile__friendsCentering"><Col md="8">
        <Card>
          <CardHeader>
          <div className="leaderboard__mainTitleNotFound">No Friends to Show &nbsp;<Icon icon={sadTear} /></div>

          <div className="userProfile__noFriendsRightPointer">
          <Icon icon={roundGroupAdd} />
          </div>

          <div className="leaderboard__noFriendsDescription">Why Not be Their First ?</div>

          <div className="notFound__positionButton2">

          {this.state.isFriend ? <div className="userProfile__submitButton" onClick={() => this.removeUser(this.state.puser.publicId)}>Remove &nbsp; 🙅</div> : <div className="userProfile__submitButton" onClick={() => this.addUser(this.state.puser.publicId)}>Add &nbsp; 🏂</div>}

          </div>


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

    </div> : undefined}

        {!this.state.userFound ? <Row>
          <div className="profile__centeringMainCard">
            <Col md="8">
              <Card className="card-user">
                <CardHeader>

                </CardHeader>
                <CardBody>

                <div className="settings__centerContent">

                <div className="settings__cogsIcon"><Icon icon={accountSearch} /></div>

                <div className="settings__constructionTitle">Sorry, We Couldn't Find This User</div>

                <div className="settings__constructionMessage">Want to Search Something Else?</div>

                <div className="notFound__positionButton">

                <Link to="/leaderboard" className="userProfile__submitButton">Leaderboard &nbsp; 📊</Link>

                </div>

                </div>

                </CardBody>

                </Card>
                </Col>
                </div>
                </Row> : undefined}

            </div>
      </>
    );
  }
}

export default Profile;
