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
  returnOffsetWidth(offsets) {

    let comparison;

    if (this.returnAllUsersLeaderboard()[0].publicId === this.state.user.publicId) {
      comparison = this.returnUserOffsetsLeaderboard();
    } else {
      comparison = parseFloat(this.returnAllUsersLeaderboard()[0].offsetAmount);
    }

    console.log('comp', comparison)

    if (offsets === 0) {
      return 0.2;
    } else {

    let ratio = offsets / comparison;

    console.log('ratio', ratio);

    if (ratio < 0.45) {

      return 0.45;

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
updateSearchFunction() {

var search = [];

// let searchStrings = this.state.searchValue.match(/.{1,3}/g);
//
// console.log('searchStrings', searchStrings);

this.state.allUsers.map((user) => {

  if (user.name.toLowerCase().includes(this.state.searchValue.toLowerCase())) {
    search.push(user);
  } else if (user.username.toLowerCase().includes(this.state.searchValue.toLowerCase())) {
    search.push(user);
  }


})

this.setState({ search });

}
updateSearchValue(e) {
  this.setState({ searchValue: e.target.value });
  this.updateSearchFunction();
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

  axios.post('http://localhost:5000/users/update', { jwt: localStorage.jwtToken, prop: 'friends', value: newFriendsDB, }, {
      prop: 'friends', value: newFriendsDB, 'jwt': localStorage.jwtToken,
    })
  .then(response => {

    console.log('UPDATED');

  })
  .catch((error) => {
    console.log(error);
  })

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

  axios.post('http://localhost:5000/users/update', { jwt: localStorage.jwtToken, prop: 'friends', value: newFriendsDB, }, {
      prop: 'friends', value: newFriendsDB, 'jwt': localStorage.jwtToken,
    })
  .then(response => {

    console.log('UPDATED');

  })
  .catch((error) => {
    console.log(error);
  })

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

  console.log('updated', this.state.searchValue);

  console.log('updated', this.state.search);



  return (<Col md="4">
  <Card>

  <CardHeader>

  <div className="leaderboard__addFriendsTitle">Add Friends <div className="leaderboard__sideIcon"><i className="tim-icons icon-chat-33" /></div> </div>

  <div className="leaderboard__searchMargins"><input id="leaderboard__addFriendsSearch" value={this.state.searchValue} onChange={(e) => this.updateSearchValue(e)} placeholder="Search" /><div className="leaderboard__addFriendsPositionSearch"><i className="tim-icons icon-zoom-split" /></div></div>

  <div className="leaderboard__addFriendsScrollableContainer">

  {console.log('search', this.state.search)}

  {this.state.search.map((userf) => {

    return(<div>
  <div className="leaderboard__addFriendsMainRow">

  <img src={require(`../assets/img/${userf.avatar}`)} className="leaderboard__addFriendsImg"/>
  <div className="leaderboard__nameAndUsernamContainer"><div className="leaderboard__addFriendsName">{userf.name}</div><div className="leaderboard__addFriendsUsername">@{userf.username}</div></div>

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
    <Card>
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
returnFriendsRanks() {

  let newFriends = this.state.friends.map((friend) => { return friend });

  let insertUser = this.state.user;

  insertUser['rank'] = this.state.userRank;

  let userOffsets = 0;

  insertUser.offsets.map((off) => {
    userOffsets += parseFloat(off.amount);
  });

  insertUser['offsetAmount'] = userOffsets;

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
returnFriendOffsetWidth(offsets) {

  let comparison = this.returnFriendsRanks()[0].offsetAmount;

  if (offsets === 0) {
    return 0.2;
  } else {

  let ratio = offsets / comparison;

  if (ratio < 0.3) {

    return 0.3;

  } else {

    return ratio;

  }
}

}
returnUserOffsetsLeaderboard() {

  let totOffsets = 0;
  this.state.user.offsets.map((off) => {
    totOffsets += parseFloat(off.amount);
  })

  return totOffsets;
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
                <div className="leaderboard__mainTitle">Leaderboard <div className="leaderboard__sideIcon"><i className="tim-icons icon-chart-bar-32" /></div> </div>

                <div className="leaderboard__topSelections"><div onClick={() => this.changeGlobal(true)} className={this.state.global ? 'leaderboard__topSelectFirst leaderboard__topSelected' : 'leaderboard__topSelectFirst leaderboard__topSelect'}>Global</div><div onClick={() => this.changeGlobal(false)} className={!this.state.global ? 'leaderboard__topSelected' : 'leaderboard__topSelect'}>Friends</div></div>
                  <Form>
                    <Row>

                      <div className="leaderboard__mainContentMargins">

                      {this.state.global ? <div>

                      {this.returnAllUsersLeaderboard().map((user) => {

                        return (<div className="leaderboard__mainRow">
                        <div className={user.rank === 1 ? 'leaderboard__mainNumberOne' : 'leaderboard__mainNumber'}>{user.rank}</div>
                        <img src={require(`../assets/img/${user.avatar}`)} className="leaderboard__mainImage"/>
                        <div className="leaderboard__rowFirstSection"><div className="leaderboard__mainName">{user.name}</div><div className="leaderboard__mainDate">@{user.username}</div></div>  <div className="leaderboard__progressbar"><div id="leaderBoard__progressBarContainerFriendsLeaderboard" style={{ width: (this.returnOffsetWidth(user.publicId === this.state.user.publicId ? this.returnUserOffsetsLeaderboard() : user.offsetAmount) * 15) + 'vw'}}><div className="leaderboard__mainCO2Emissions">{this.returnOffsets(user.publicId === this.state.user.publicId ? this.returnUserOffsetsLeaderboard() : user.offsetAmount)}</div></div></div>

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

                        </div>)


                      })}</div> :

                      <div className="leaderboard__friendRightShift">{this.returnFriendsRanks().map((friend) => {

                        return (
                          <div className="leaderboard__mainRow">
                          <div className="leaderboard__mainNumber">&nbsp; {friend.rank}</div>
                          <img src={require(`../assets/img/${friend.avatar}`)} className="leaderboard__mainImage"/>
                          <div className="leaderboard__rowFirstSection"><div className="leaderboard__mainName">{friend.publicId === this.state.user.publicId ? 'You' : friend.name}</div><div className="leaderboard__mainDate">@{friend.username}</div></div>  <div className="leaderboard__progressbar"><div id="leaderBoard__progressBarContainerFriendsLeaderboard" style={{ width: (this.returnFriendOffsetWidth(friend.offsetAmount) * 15) + 'vw'}}><div className="leaderboard__mainCO2Emissions">{this.returnOffsets(friend.offsetAmount)}</div></div></div>

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
                        )



                      })}</div>


                      }

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
