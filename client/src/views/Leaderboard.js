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
import axios from 'axios';
import '../OwnCSS/leaderboard.css';
import { Helmet } from "react-helmet";

import { Line, Bar, Doughnut} from "react-chartjs-2";

import { Icon, InlineIcon } from '@iconify/react';
import externalLinkAlt from '@iconify/icons-fa-solid/external-link-alt';
import accountMusic from '@iconify/icons-mdi/account-music';
import accountArrowRight from '@iconify/icons-mdi/account-arrow-right';
import sadTear from '@iconify/icons-fa-regular/sad-tear';
import handPointRight from '@iconify/icons-fa-regular/hand-point-right';

import outlineKeyboardArrowLeft from '@iconify/icons-ic/outline-keyboard-arrow-left';
import outlineKeyboardArrowRight from '@iconify/icons-ic/outline-keyboard-arrow-right';
import seedlingIcon from '@iconify/icons-fa-solid/seedling';
import personCircle from '@iconify/icons-ion/person-circle';
import checkCircle from '@iconify/icons-la/check-circle';

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

import LeaderboardModal from './LeaderboardModal.js';
import Tour from 'reactour';
import Text from "./Text";
import Glitch from "./Glitch";
import Tooltip from "./Tooltip";

const steps = [
  {
    selector: '',
    content: () => (
      <div>
      <Glitch data-glitch="styled" style={{ marginBottom: "1px"}}>Leaderboard 📊</Glitch>
      <Text color="#e5e5e5">
      Compete on Carbonly's Global Leaderboard!
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
      <Glitch data-glitch="styled" style={{ marginBottom: "3px", fontSize: '1.52em'}}>Carbonly Leaderboard 🏆</Glitch>
      <img src={require(`../assets/img/landing/tourLeaderboard.jpg`)} style={{ marginBottom: "10px"}} />
      <Text color="#e5e5e5">
          Carbonly's Global Leaderboard Based Upon Our <span style={{ "color": "#8db8a2"}}>Offset Points</span>
      </Text>
      </div>
    ),
    style: {
      backgroundColor: "#fff",

    }
  },
  {
    selector: '[data-tut="tour__friendLeaderboard"]',
    content: () => (
      <div>
      <Glitch data-glitch="styled" style={{ marginBottom: "3px", fontSize: '1.52em'}}>Friend Leaderboard 👪</Glitch>
      <img src={require(`../assets/img/landing/friendLeaderboard.png`)} style={{ marginBottom: "10px"}} />
      <Text color="#e5e5e5">
          Your Cosy Friend Leaderboard!
      </Text>
      </div>
    ),
    style: {
      backgroundColor: "#fff",

    }
  },
  {
    selector: '[data-tut="tour__profile"]',
    content: () => (
      <div>
      <Glitch data-glitch="styled" style={{ marginBottom: "3px"}}>Your Stats 📈</Glitch>
      <img src={require(`../assets/img/landing/leaderboardProfileStats.png`)} style={{ marginBottom: "10px"}} />
      <Text color="#e5e5e5">
        See Your Rank And <span style={{ "color": "#8db8a2"}}>Offset Points!</span>
      </Text>
      </div>
    ),
    style: {
      backgroundColor: "#fff",

    }
  },
  {
    selector: '[data-tut="tour__friends"]',
    content: () => (
      <div>
      <Glitch data-glitch="styled" style={{ marginBottom: "3px"}}>Your Friends 👪</Glitch>
      <img src={require(`../assets/img/landing/friendImage.png`)} style={{ marginBottom: "10px"}} />
      <Text color="#e5e5e5">
        All Your Friends on Carbonly!
      </Text>
      </div>
    ),
    style: {
      backgroundColor: "#fff",

    }
  },
  {
    selector: '[data-tut="tour__addFriends"]',
    content: () => (
      <div>
      <Glitch data-glitch="styled" style={{ marginBottom: "3px"}}>Add Friends 🎉</Glitch>
      <img src={require(`../assets/img/landing/addFriends.png`)} style={{ marginBottom: "10px"}} />
      <Text color="#e5e5e5">
        Use This Card to Add New Friends to Your Circle!
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
      <Glitch data-glitch="styled" style={{ marginBottom: "3px"}}>Profile 😝</Glitch>
      <img src={require(`../assets/img/landing/profileImage.png`)} style={{ marginBottom: "10px"}} />
       <Text color="#e5e5e5">
        We're Now Redirecting You to Your Profile 🛫
      </Text>
      <div style={{ "color": "#fff"}}>{setTimeout(function() { window.location.href = 'https://carbonly.org/profile' }, 1000)}</div>
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

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      global: true,
      friendsMove: 1,
      isTourOpen: true,
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

    axios.post('https://carbonly.org/users/return-leaderboard', { jwt: localStorage.jwtToken }, {
      'jwt': localStorage.jwtToken,
    })
  .then(response => {

      if (response.data.info[0].hasLoggedIn === 'f') {
          window.location.href="/click";
      }

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
    // console.log('changed');
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
updateSearchFunction(searchValue) {

var search = [];

/* let searchStrings = this.state.searchValue.match(/.{1,3}/g); */
//
// console.log('searchStrings', searchStrings);

this.state.allUsers.map((user) => {

  if (user.name.toLowerCase().includes(searchValue.toLowerCase())) {
    search.push(user);
  } else if (user.username.toLowerCase().includes(this.state.searchValue.toLowerCase())) {
    search.push(user);
  }


})

this.setState({ search });

}
updateSearchValue(e) {
  this.setState({ searchValue: e.target.value });
  this.updateSearchFunction(e.target.value);
}
addUser(id) {

  let newFriends = this.state.friends.map((fri) => { return fri });

  let user, alreadyContains = false;

  this.state.allUsers.map((us) => {
    if (us.publicId === id) {
      user = us;
    }
  })
  this.state.friends.map((us) => {
    if (us.publicId === id) {
      alreadyContains = true;
    }
  })


  if (user && !alreadyContains) {

  newFriends.unshift(user);

  let newFriendsDB = this.state.friends.map((fri) => { return fri.publicId });

  // console.log('NEWFDB BEFORE', newFriendsDB)

  newFriendsDB.unshift(id);

  this.setState({ friends: newFriends });

  // console.log('NEWF', newFriends)

  // console.log('NEWFDB', newFriendsDB)

  axios.post('https://carbonly.org/users/update', { jwt: localStorage.jwtToken, prop: 'friends', value: newFriendsDB, }, {
      prop: 'friends', value: newFriendsDB, 'jwt': localStorage.jwtToken,
    })
  .then(response => {

    // console.log('UPDATED', response.data.friends);

  })
  .catch((error) => {
    // console.log(error);
  })

}

}
removeUser(id) {

  let user;

  this.state.friends.map((us) => {
    if (us.publicId === id) {
      user = us;
    }
  })

  if (user) {

  let newFriends = this.state.friends.map((fri) => { return fri });

  let nFI = newFriends.indexOf(user);
  newFriends.splice(nFI, 1);

    // console.log('NEWFDB BEFORE', newFriendsDB)

  let newFriendsDB = this.state.friends.map((fri) => { return fri.publicId });

  let nFDBI = newFriendsDB.indexOf(id);
  newFriendsDB.splice(nFDBI, 1);

  this.setState({ friends: newFriends });

  axios.post('https://carbonly.org/users/update', { jwt: localStorage.jwtToken, prop: 'friends', value: newFriendsDB, }, {
      prop: 'friends', value: newFriendsDB, 'jwt': localStorage.jwtToken,
    })
  .then(response => {

  // console.log('UPDATED', response.data.friends);

  })
  .catch((error) => {
    // console.log(error);
  })

  }

}
isUserFriend(id) {
  let isFriend = false;

  this.state.friends.map((fri) => {
    if (id === fri.publicId) {
      isFriend = true;
    }
  })
  return isFriend;
}
insertAddFriendsContainer() {

  let shuffledUsers = this.state.search;

  // console.log('updated', this.state.searchValue);
  //
  // console.log('updated', this.state.search);



  return (<Col md="4">
  <Card data-tut="tour__addFriends">

  <CardHeader>

  <div className="leaderboard__addFriendsTitle">Add Friends <div className="leaderboard__sideIcon"><i className="tim-icons icon-chat-33" /></div> </div>

  <div className="leaderboard__searchMargins"><input id="leaderboard__addFriendsSearch" value={this.state.searchValue} onChange={(e) => this.updateSearchValue(e)} placeholder="Search" /><div className="leaderboard__addFriendsPositionSearch"><i className="tim-icons icon-zoom-split" /></div></div>

  <div className="leaderboard__addFriendsScrollableContainer">

  {this.state.search.map((userf) => {

    return(<div>
  <div className="leaderboard__addFriendsMainRow">

  <a href={`/user/@${userf.username}`}><img src={require(`../assets/img/${userf.avatar}`)} className="leaderboard__addFriendsImg"/></a>
  <a href={`/user/@${userf.username}`} className="leaderboard__nameAndUsernamContainer"><div id="leaderboard__mainLeaderboardTextColour" className="leaderboard__addFriendsName">{userf.name.length > 14 ? userf.name.slice(0, 14) + '..' : userf.name}</div><div id="leaderabord__mainLeaderboardUsernameColour" className="leaderboard__addFriendsUsername">@{userf.username}</div></a>

  {userf.publicId !== this.state.user.publicId ? <div className="leaderboard__progressbarMainAdd">{this.isUserFriend(userf.publicId) ? <div className="leaderboard__submitButtonRemove" onClick={() => this.removeUser(userf.publicId)}>Remove &nbsp; 🙅</div> : <div className="leaderboard__submitButton" onClick={() => this.addUser(userf.publicId)}>Add &nbsp; 🏂</div>}</div> : undefined}

  </div>

  <div className="leaderboard__addFriendsIndvSpacing"></div>


  </div>)

  })}

  </div>


  </CardHeader>
  <CardBody>



  </CardBody>

  </Card>
  </Col>);
}
returnFriends() {
  let friend1 = this.state.friendsMove - 1;

    return (<Col md="4">
    <Card data-tut="tour__friends">
    <CardBody>

    <a href={`/user/@${this.state.friends[friend1].username}`} className="leaderboard__bottomXPositioning"><Icon icon={accountArrowRight} /></a>
    {this.state.friendsMove > 1 ? <div className="leaderboard__bottomLeftArrow" onClick={() => this.shiftFriendsLeft()}><Icon icon={outlineKeyboardArrowLeft} /></div> : undefined }

    <a href={`/user/@${this.state.friends[friend1].username}`} className="leaderboard__bottomCenterImage">
    <img src={require(`../assets/img/${this.state.friends[friend1].avatar}`)} className="leaderboard__friendsImg" />
    </a>

    <div className="leaderboard__nameAndUsernamContainerBottom">
    <a href={`/user/@${this.state.friends[friend1].username}`} className="" id="leaderboard__sideNameBottom">{this.state.friends[friend1].name}</a>
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

<div className="leaderboard__progressbarBottomPositioning"><div id="leaderBoard__progressBarContainerBottom"><div className="leaderboard__mainCO2EmissionsAddFriends"><Icon icon={seedlingIcon} className="leaderboard__pointsIcon" />{this.returnOffsets(parseFloat(this.state.friends[friend1].points))}</div></div></div>

<div className="leaderboard__friendsBottomSpacing"></div>

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

<div className="leaderboard__friendsBottomSpacing"></div>

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

  <div className="leaderboard__progressbarBottomPositioning"><div id="leaderBoard__progressBarContainerBottomNoUser"><div className="leaderboard__mainCO2EmissionsAddFriends"><Icon icon={seedlingIcon} className="leaderboard__pointsIcon" />{'5,000'}</div></div></div>

  </div>

    <div className="leaderboard__noUserHeight"></div>

    </div>

    </CardBody>

    </Card>
    </Col>)

  }

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
closeTour() {

}
  render() {
    return (
      <>
        <div className="content">
      {/*  <Helmet>
          <title>Carbonly | Analytics</title>
          <meta name="description" content="Track Your Carbon Footprint Overtime And See Your Overall Progress!" />
        </Helmet> */}
        {this.state.user && this.state.allUsers && this.state.userRank && this.state.search && this.state.friends ? <div>
          <Row>
            <Col md="8">
              <Card data-tut="tour__leaderboard">
                <CardHeader>
                <div className="leaderboard__mainTitle">Leaderboard <div className="leaderboard__sideIcon"><i className="tim-icons icon-chart-bar-32" /></div> </div>

                <div className="leaderboard__topSelections"><div onClick={() => this.changeGlobal(true)} className={this.state.global ? 'leaderboard__topSelectFirst leaderboard__topSelected' : 'leaderboard__topSelectFirst leaderboard__topSelect'}>Global</div><div onClick={() => this.changeGlobal(false)} data-tut="tour__friendLeaderboard" className={!this.state.global ? 'leaderboard__topSelected' : 'leaderboard__topSelect'}>Friends</div></div>
                  <Form>
                    <Row>

                      <div className="leaderboard__mainContentMargins">

                      {this.state.global ? <div>

                      {this.returnAllUsersLeaderboard().map((user) => {

                        return (<div className="leaderboard__mainRow">
                        <div className={user.rank === 1 ? 'leaderboard__mainNumberOne' : 'leaderboard__mainNumber'}>{user.rank}</div>
                        <a href={`/user/@${user.username}`}><img src={require(`../assets/img/${user.avatar}`)} className="leaderboard__mainImage"/></a>
                        <a href={`/user/@${user.username}`} className="leaderboard__rowFirstSection"><div id="leaderboard__mainLeaderboardTextColour" className="leaderboard__mainName">{user.name}</div><div id="leaderabord__mainLeaderboardUsernameColour" className="leaderboard__mainDate">@{user.username}</div></a>  <div className="leaderboard__progressbar"><div id="leaderBoard__progressBarContainerFriendsLeaderboard" style={{ width: (this.returnOffsetWidth(user.publicId === this.state.user.publicId ? this.returnUserOffsetsLeaderboard() : user.points) * 15) + 'vw'}}><div className="leaderboard__mainCO2Emissions"><Icon icon={seedlingIcon} className="leaderboard__pointsIcon" />{this.returnNumberWithCommas(this.returnLeaderboardOffsets(user.publicId === this.state.user.publicId ? this.returnUserOffsetsLeaderboard() : user.points))}</div></div></div>

                        <div className="leaderboard__individualLineMargins">
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
                          </div>

                        </div>)


                      })}</div> :

                      <div className="leaderboard__friendRightShift">{this.returnFriendsRanks().map((friend) => {

                        return (
                          <div className="leaderboard__mainRow">

                          <div className="leaderboard__mainNumber">&nbsp; {friend.rank}</div>
                          <a href={`/user/@${friend.username}`}><img src={require(`../assets/img/${friend.avatar}`)} className="leaderboard__mainImage"/></a>
                          <a href={`/user/@${friend.username}`} className="leaderboard__rowFirstSection"><div id="leaderboard__mainLeaderboardTextColour" className="leaderboard__mainName">{friend.publicId === this.state.user.publicId ? 'You' : friend.name}</div><div id="leaderabord__mainLeaderboardUsernameColour" className="leaderboard__mainDate">@{friend.username}</div></a>  <div className="leaderboard__progressbar"><div id="leaderBoard__progressBarContainerFriendsLeaderboard" style={{ width: (this.returnFriendOffsetWidth(friend.publicId === this.state.user.publicId ? this.returnUserOffsetsLeaderboard() : friend.points) * 15) + 'vw'}}><div className="leaderboard__mainCO2Emissions"><Icon icon={seedlingIcon} className="leaderboard__pointsIcon" />{this.returnNumberWithCommas(this.returnLeaderboardOffsets(friend.publicId === this.state.user.publicId ? this.returnUserOffsetsLeaderboard() : friend.points))}</div></div></div>


                          <div className="leaderboard__individualLineMargins">
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
                            </div>

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




            <Col md="4">
              <Card className="card-user" data-tut="tour__profile">
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
        data: [this.state.userRank - 1, this.state.allUsers.length - this.state.userRank], backgroundColor: [ 'rgba(203, 203, 203, 0.39)', 'rgba(156, 204, 179, 0.39)'], borderColor: [ '#cbcbcb', "rgba(156, 204, 179, 0.98)" ], hoverBorderColor: ['#d9d9d9', 'rgba(156, 204, 179, 0.8)'], hoverBackgroundColor: ['transparent', 'transparent'], borderWidth: '2'
    }], labels: [
        'Ranking',
        'Blue'
    ] } }
                    options={ { cutoutPercentage: 72, color: [ '#333', 'blue'], legend: false, tooltips: { enabled: false },  padding: { left:50, bottom: 15 } }}
                  /></div>

                  <div className="leaderboard__profileRanking"><h5 className="title" id="leaderboard__rankNumber">{this.state.userRank}<div className="leaderboard__profileRankingSmallText"></div></h5></div>



                  </div>

                    <div className="leaderboard__profileProgressMargins">

                    <div className="leaderboard__progressbarProfile"><div id="leaderBoard__progressBarContainerProfile" style={{ width: '60%', margin: 'auto' }}><div className="leaderboard__carbonProfileMargins"><Icon icon={seedlingIcon} className="leaderboard__pointsIcon" />{this.returnUserOffsets()}</div></div></div>
                    </div>

                    </div>

                    <div className="leaderboard__offsetPointDescription">1 Offset Point = 0.1kg CO&#x2082;</div>
                      <div className="leaderboard__profileBottomSpacing"></div>
                    <div onClick={() => this.setState({ hideArrow: true })}>  <LeaderboardModal/></div>


                </CardBody>
              </Card>
                  {!this.state.hideArrow && !this.state.isTourOpen ? <img className="leaderboard__bottomArrow" src={require('../assets/img/landing/leaderboardArrow.png')} /> : undefined}
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

          {/* !this.state.user.hasDoneTour ? <Tour
          steps={steps}
          {...props}
          badgeContent={(curr, tot) => `${curr}/${tot}`}
          maskClassName=""
          className="home__tourClass"
          rounded={5}
          isOpen={this.state.isTourOpen}
          onRequestClose={(e) => this.closeTour()} /> : undefined */}


          </div>: undefined}
        </div>
      </>
    );
  }
}

export default Leaderboard;
