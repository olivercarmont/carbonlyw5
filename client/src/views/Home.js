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
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

import '../OwnCSS/home.css';
import { ReactSortable } from "react-sortablejs";

import NotificationAlert from "react-notification-alert";

import axios from 'axios';

import { Icon, InlineIcon } from '@iconify/react';
import storeIcon from '@iconify/icons-fa-solid/store';

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
  Alert,
  UncontrolledAlert,
} from "reactstrap";




// let moment = require('moment');
 // const moment = require('moment');

// import moment from 'moment';
// let date = moment();


let amazonImg = require("../assets/img/companyLogos/amazon.png");
let bookingImg = require("../assets/img/companyLogos/booking.png");
let expediaImg = require("../assets/img/companyLogos/expedia.png");
let kayakImg = require("../assets/img/companyLogos/kayak.png");
let googleFlightsImg = require("../assets/img/companyLogos/googleFlights.png");
let klmImg = require("../assets/img/companyLogos/klm.png");
let momondoImg = require("../assets/img/companyLogos/momondo.png");
let skyscannerImg = require("../assets/img/companyLogos/skyscanner.png");
let tescoImg = require("../assets/img/companyLogos/tesco.png");
let tripAdvisorImg = require("../assets/img/companyLogos/tripAdvisor.png");
let uberEatsImg = require("../assets/img/companyLogos/ubereats.png");

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      bigChartData: "data1",
      savedList: [],
      shoppingList: [],
      search: [{ name: 'Amazon US', image: amazonImg, link: "https://www.amazon.com", description: 'All Products'}, { name: 'Amazon UK', image: amazonImg, link: "https://www.amazon.co.uk", description: 'All Products'}, { name: 'Booking.com', image: bookingImg, link: "https://flights.booking.com/", description: 'All Flights'}, { name: 'Expedia', image: expediaImg, link: "https://www.expedia.com/", description: 'All Flights'}, { name: 'Google Flights', image: googleFlightsImg, link: "https://www.google.com/flights", description: 'All Flights'}, { name: 'Kayak', image: kayakImg, link: "https://www.kayak.com/", description: 'All Flights'}, { name: 'KLM', image: klmImg, link: "https://www.klm.com", description: 'All Flights'},  { name: 'Momondo', image: momondoImg, link: "https://www.momondo.com/", description: 'All Flights'}, { name: 'Skyscanner', image: skyscannerImg, link: "https://www.skyscanner.com", description: 'All Flights'}, { name: 'Tesco', image: tescoImg, link: "https://www.tesco.com", description: 'All Flights'}, { name: 'Trip Advisor', image: tripAdvisorImg, link: "https://www.tripadvisor.com/CheapFlightsHome", description: 'All Flights'}, { name: 'Uber Eats', image: uberEatsImg, link: "https://www.ubereats.com", description: 'All Products'}],
      compatibleMarketplaces: [{ name: 'Amazon US', image: amazonImg, link: "https://www.amazon.com", description: 'All Products'}, { name: 'Amazon UK', image: amazonImg, link: "https://www.amazon.co.uk", description: 'All Products'}, { name: 'Booking.com', image: bookingImg, link: "https://flights.booking.com/", description: 'All Flights'}, { name: 'Expedia', image: expediaImg, link: "https://www.expedia.com/", description: 'All Flights'}, { name: 'Google Flights', image: googleFlightsImg, link: "https://www.google.com/flights", description: 'All Flights'}, { name: 'Kayak', image: kayakImg, link: "https://www.kayak.com/", description: 'All Flights'}, { name: 'KLM', image: klmImg, link: "https://www.klm.com", description: 'All Flights'},  { name: 'Momondo', image: momondoImg, link: "https://www.momondo.com/", description: 'All Flights'}, { name: 'Skyscanner', image: skyscannerImg, link: "https://www.skyscanner.com", description: 'All Flights'}, { name: 'Tesco', image: tescoImg, link: "https://www.tesco.com", description: 'All Flights'}, { name: 'Trip Advisor', image: tripAdvisorImg, link: "https://www.tripadvisor.com/CheapFlightsHome", description: 'All Flights'}, { name: 'Uber Eats', image: uberEatsImg, link: "https://www.ubereats.com", description: 'All Products'}],
  };
}
  componentWillMount() {

    axios.post('http://localhost:5000/users/return-home', { jwt: localStorage.jwtToken }, {
      'jwt': localStorage.jwtToken,
    })
  .then(response => {
      // this.setState({
      //   users: response.data.map(user => user.username),
      //   name: response.data[0].name
      // });

      console.log('response', response.data);

      // response.data.map((findUser) => {
      //   if (findUser._id === this.props.auth.user.id) {
      //     user = findUser;
      //   }
      // })

      this.setState({ shoppingList: response.data.shoppingList });
      this.setState({ savedList: response.data.savedList });

       this.setState({ user: response.data });



  })
  .catch((error) => {
    console.log(error);
  })
  }
  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };
  preventDrag(e) {
    e.preventDefault();
  }
  allowDrop(ev) {
  ev.preventDefault();
}

  drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}
updateSearchValue(e) {
  this.setState({ searchValue: e.target.value });
  this.updateSearchFunction(e.target.value);
}
updateSearchFunction(searchValue) {

var search = [];

console.log('val', searchValue);

this.state.compatibleMarketplaces.map((marketplace) => {

  if (this.state.searchValue.length > 0) {
    if (marketplace.name.toLowerCase().includes(searchValue.toLowerCase())) {
      search.push(marketplace);
    }
  } else {
    search = this.state.compatibleMarketplaces;
  }

})

this.setState({ search });

}
createNewItemSaved() {
  let newId;

  let newArray = this.state.savedList;

  let newSortList = this.state.savedList.map((el) => { return el });

  newSortList.sort((a, b) => (a.id < b.id) ? 1 : -1)

  if (newSortList.length > 0) {
    newId = parseFloat(newSortList[0].id) + 1;
  } else {
    newId = 1;
  }

  newArray.push({ id: newId, title: '', description: ''})

  /* update the server here */
  this.setState({ saved: newArray });

  axios.post('http://localhost:5000/users/update', { jwt: localStorage.jwtToken, prop: 'savedList', value: newArray, }, {
      prop: 'savedList', value: newArray, 'jwt': localStorage.jwtToken,
    })
  .then(response => {

    console.log('UPDATED');

  })
  .catch((error) => {
    console.log(error);
  })

}
createNewItemShoppingList() {

  let newId;

  let newArray = this.state.shoppingList;

  let newSortList = this.state.shoppingList.map((el) => { return el });

  newSortList.sort((a, b) => (a.id < b.id) ? 1 : -1)

  if (newSortList.length > 0) {
    newId = parseFloat(newSortList[0].id) + 1;
  } else {
    newId = 1;
  }

  newArray.push({ id: newId, title: '', description: ''})

  /* update the server here */
  this.setState({ shoppingList: newArray });

  axios.post('http://localhost:5000/users/update', { jwt: localStorage.jwtToken, prop: 'shoppingList', value: newArray, }, {
      prop: 'shoppingList', value: newArray, 'jwt': localStorage.jwtToken,
    })
  .then(response => {

    console.log('UPDATED');

  })
  .catch((error) => {
    console.log(error);
  })

}
deleteItemSaved(id) {
  let newArray = this.state.savedList;
  let index;

  newArray.map((el) => {
    if (el.id == id) {
      index = newArray.indexOf(el);
    }
  });

  newArray.splice(index, 1);

  /* update the server here */
  this.setState({ saved: newArray });

  axios.post('http://localhost:5000/users/update', { jwt: localStorage.jwtToken, prop: 'savedList', value: newArray, }, {
      prop: 'savedList', value: newArray, 'jwt': localStorage.jwtToken,
    })
  .then(response => {

    console.log('UPDATED');

  })
  .catch((error) => {
    console.log(error);
  })

}
deleteItemShoppingList(id) {
  let newArray = this.state.shoppingList;
  let index;

  newArray.map((el) => {
    if (el.id == id) {
      index = newArray.indexOf(el);
    }
  });

  newArray.splice(index, 1);

  /* update the server here */
  this.setState({ shoppingList: newArray });

  axios.post('http://localhost:5000/users/update', { jwt: localStorage.jwtToken, prop: 'shoppingList', value: newArray, }, {
      prop: 'shoppingList', value: newArray, 'jwt': localStorage.jwtToken,
    })
  .then(response => {

    console.log('UPDATED');

  })
  .catch((error) => {
    console.log(error);
  })
}
setSavedList(newState) {
  /* update the server here */
  this.setState({ saved: newState })
}
setShoppingList(newState) {
  /* update the server here */
  this.setState({ shoppingList: newState })
}
updateDescriptionSaved(e, id) {

  console.log('event', e.target.value);

  let newArray = this.state.savedList;
  let index;

  newArray = newArray.map((el) => {
    if (el.id === id) {
      console.log('id is the same', id);
      index = newArray.indexOf(el);
      return { id: el.id, title: el.title, description: e.target.value }
    } else {
      return el;
    }

  });

  console.log('newArray', newArray);
  /* update the server here */
  this.setState({ saved: newArray });

  axios.post('http://localhost:5000/users/update', { jwt: localStorage.jwtToken, prop: 'savedList', value: newArray, }, {
    prop: 'savedList', value: newArray, 'jwt': localStorage.jwtToken,
  })
.then(response => {

  console.log('UPDATED');

})
.catch((error) => {
  console.log(error);
})

}
updateDescriptionShopping(e, id) {

  console.log('event', e.target.value);

  let newArray = this.state.shoppingList;
  let index;

  newArray = newArray.map((el) => {
    if (el.id === id) {
      console.log('id is the same', id);
      index = newArray.indexOf(el);
      return { id: el.id, title: el.title, description: e.target.value }
    } else {
      return el;
    }

  });

  console.log('newArray', newArray);
  /* update the server here */
  this.setState({ shoppingList: newArray });

axios.post('http://localhost:5000/users/update', { jwt: localStorage.jwtToken, prop: 'shoppingList', value: newArray, }, {
    prop: 'shoppingList', value: newArray, 'jwt': localStorage.jwtToken,
  })
.then(response => {

  console.log('UPDATED');

})
.catch((error) => {
  console.log(error);
})

}
updateTitleSaved(e, id) {

  let newArray = this.state.savedList;
  let index;

  newArray = newArray.map((el) => {
    if (el.id === id) {
      console.log('id is the same', id);
      index = newArray.indexOf(el);
      return { id: el.id, title: e.target.value, description: el.description  }
    } else {
      return el;
    }

  });

  console.log('newArray', newArray);
  /* update the server here */
  this.setState({ saved: newArray });

  axios.post('http://localhost:5000/users/update', { jwt: localStorage.jwtToken, prop: 'savedList', value: newArray, }, {
      prop: 'savedList', value: newArray, 'jwt': localStorage.jwtToken,
    })
  .then(response => {

    console.log('UPDATED');

  })
  .catch((error) => {
    console.log(error);
  })

}
updateTitleShopping(e, id) {

  let newArray = this.state.shoppingList;
  let index;

  newArray = newArray.map((el) => {
    if (el.id === id) {
      console.log('id is the same', id);
      index = newArray.indexOf(el);
      return { id: el.id, title: e.target.value, description: el.description  }
    } else {
      return el;
    }

  });

  console.log('newArray', newArray);
  /* update the server here */
  this.setState({ shoppingList: newArray });

  axios.post('http://localhost:5000/users/update', { jwt: localStorage.jwtToken, prop: 'shoppingList', value: newArray, }, {
      prop: 'shoppingList', value: newArray, 'jwt': localStorage.jwtToken,
    })
  .then(response => {

    console.log('UPDATED');

  })
  .catch((error) => {
    console.log(error);
  })

}
  render() {

    let newDateHome = new Date();
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return (
      <>
        <div className="content">

        {this.state.user ?
          <div>
          <Row>
          <Col lg="4">
            <Card className="card-chart homepage__firstBasicHeight">
              <CardHeader>
                <h5 className="card-category">{`${newDateHome.getDate()}${newDateHome.getDate() === 1 ? 'st' : newDateHome.getDate() === 2 ? 'nd' : newDateHome.getDate() === 3 ? 'rd' : 'th'} ${months[newDateHome.getMonth()]} ${newDateHome.getFullYear()}`}</h5>
                <CardTitle tag="h3">
                  {/* <i className="tim-icons icon-minimal-down text-info" />{" "} */}
                Hey {this.state.user.name.split(' ')[0]} 👋
                </CardTitle>

                <div className="homepage__firstSectionMargins">

                <div className="homepage__firstBoxSecondTitle">
                Here's What's New:
                </div>

                <UncontrolledAlert id="home__notification">
                  <span>
                    <b>Friends</b><br/>
                    James Carlson Offset 40kg!
                  </span>
                </UncontrolledAlert>
                {/* <div id="home__notification">
                  <span>
                    <b>Ranking</b><br/>
                    Rank Decreased From 500 to 515!
                  </span>
                </div> */}
                <UncontrolledAlert id="home__notification">
                  <span>
                    <b>Footprint</b><br/>
                    Increased by 8kg Today!
                  </span>
                </UncontrolledAlert>

                <div className="homepage__firstSectionSuggestion">

                </div>

                </div>
              </CardHeader>
              <CardBody>
              </CardBody>
            </Card>
          </Col>

            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">{this.state.savedList.length} {this.state.savedList.length === 1 ? 'Item' : 'Items'}</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-paper text-primary" />{" "}
                    Saved List
                  </CardTitle>
                  </CardHeader>
                  <CardBody>


                <div id="savedList__mainContainer">

                <ReactSortable
       list={this.state.savedList}
       setList={newState => this.setSavedList(newState)}
       handle={"#drag1"}
       group={'shared'}
       animation={200}
      delayOnTouchStart={true}
      delay={2}
     >
       {this.state.savedList.map(item => (
         <div key={item.id}>

         <div className="home__listCheckboxes">

         <FormGroup check>
               <Label check>
                 <Input defaultValue="" type="checkbox" />
                 <span className="form-check-sign home__listsCheckboxColour">
                   <span className="check" />
                 </span>
               </Label>
           </FormGroup>

         </div>

            <div className="home__topListsRightEl">
             <input className="home__topInputLists" id="home__inputListsHover" placeholder="Super Greens 🥕" onChange={(e) => this.updateTitleSaved(e, item.id)} defaultValue={item.title} />
             <textarea defaultValue={item.description} placeholder="At least 5 a Day Right?" id="home__textAreaPlaceholderStyling" onChange={(e) => this.updateDescriptionSaved(e, item.id)} className="text-muted home__smallerTextInput"/>
             </div>

             <div className="home__topListsIconRight">

             <div className="home__topListsDragSide" id="drag1"><i className="tim-icons icon-align-center" /></div>

             <div className="home__topListsXSide" onClick={() => this.deleteItemSaved(item.id)}><i className="tim-icons icon-trash-simple" /></div>
             </div>

             <div className="home__betweenListsSpacing"></div>

             </div>
       ))}
     </ReactSortable>

     <div className="home__betweenListsSpacing"></div>

     <div className="home__addListButtonPositioning">
     <a onClick={() => { this.createNewItemSaved() }} className="home__newItemButton">New Item &nbsp; 🛒</a>
     </div>

                  </div>

                </CardBody>
              </Card>
            </Col>

            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">{this.state.shoppingList.length} {this.state.shoppingList.length === 1 ? 'Item' : 'Items'}</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-basket-simple text-success" id="analytics__destinationIconColour" /> Shopping List
                  </CardTitle>
                </CardHeader>
                <CardBody>

                <div id="savedList__mainContainer">

                <ReactSortable
       list={this.state.shoppingList}
       setList={newState => this.setShoppingList(newState)}
       handle={"#drag2"}
       group={'shared'}
       animation={200}
      delayOnTouchStart={true}
      delay={2}
     >
       {this.state.shoppingList.map(item => (
         <div key={item.id}>

         <div className="home__listCheckboxes">

         <FormGroup check>
               <Label check>
                 <Input defaultValue="" type="checkbox" />
                 <span className="form-check-sign home__listsCheckboxColour">
                   <span className="check" />
                 </span>
               </Label>
           </FormGroup>

         </div>

            <div className="home__topListsRightEl">
             <input className="title home__topInputLists" id="home__inputListsHover" placeholder="Super Greens 🥕" onChange={(e) => this.updateTitleShopping(e, item.id)} defaultValue={item.title} />
             <textarea defaultValue={item.description} placeholder="At least 5 a Day Right?" id="home__textAreaPlaceholderStyling" onChange={(e) => this.updateDescriptionShopping(e, item.id)} className="text-muted home__smallerTextInput"/>
             </div>

             <div className="home__topListsIconRight">

             <div className="home__topListsDragSide" id="drag2"><i className="tim-icons icon-align-center" /></div>

             <div className="home__topListsXSide" onClick={() => this.deleteItemShoppingList(item.id)}><i className="tim-icons icon-trash-simple" /></div>
             </div>

             <div className="home__betweenListsSpacing"></div>

             </div>
       ))}
     </ReactSortable>

                                <div className="home__betweenListsSpacing"></div>

                                <div className="home__addListButtonPositioning">
                                <a onClick={() => { this.createNewItemShoppingList() }} className="home__newItemButton">New Item &nbsp; 🛒</a>
                                </div>


                      </div>


                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>


            <Col lg="6" md="12">
              <Card className="card-tasks">
                <CardHeader>

                {/*  <UncontrolledDropdown>
                    <DropdownToggle
                      caret
                      className="btn-icon"
                      color="link"
                      data-toggle="dropdown"
                      type="button"
                    >
                      <i className="tim-icons icon-settings-gear-63" />
                    </DropdownToggle>
                    <DropdownMenu aria-labelledby="dropdownMenuLink" right>
                      <DropdownItem
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        Action
                      </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        Another action
                      </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        Something else
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown> */}

                    <h6 id="home__recentOrdersTitle" className="title d-inline">🛍️ Compatible Marketplaces</h6>
                    <div className="home__topTitleSpacing"></div>
                </CardHeader>
                <CardBody>

                <div className="home__compatSearchBarDiv">
                <input className="home__compatSearchBar" placeholder="Find Marketplace" value={this.state.searchValue} onChange={(e) => this.updateSearchValue(e)} />
                </div>

                <div id="home__compatScroll" className="table-full-width table-responsive">

              {this.state.search.map((marketplace) => {

                return (<div className="home__indvCompat">

                    <a href={marketplace.link}><img src={marketplace.image} id="home__ordersImage" /></a>

                        <div className="home__compatText">
                            <a href={marketplace.link} className="title home__compatTitle">{marketplace.name}</a>

                            <p className="text-muted home__compatAllProd">
                              {marketplace.description}
                            </p>
                        </div>

                        <div className="home__compatButton">

                            <Button
                              color="link"
                              id="tooltip636901683"
                              title=""
                              type="button"
                            >
                              <p id="analytics__mainTextSideOrders"><a href={marketplace.link} className="home__goToButton">Go to &nbsp; ✈️</a></p>
                            </Button>

                            </div>
                            </div>)
              })}


                  </div>
                  <div className="home__compatibleMarketplacesNum">{this.state.search.length} {this.state.search.length === 1 ? 'Marketplace' : 'Marketplaces'} &nbsp;<Icon icon={storeIcon} /></div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6" md="12">
              <Card>
                <CardHeader>
                <h6 id="home__recentOrdersTitleSide" className="title d-inline">🌳 Top Ranked Goods <span className="home__topRankedKG">(kg / km)</span></h6>
                <div className="home__topTitleSpacing"></div>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>By Category &nbsp;&nbsp;🗂️</th>
                        <th></th>
                        <th>By Product &nbsp;&nbsp;📦</th>
                        <th className="text-center"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>

                      </tbody></Table>

                      <div className="home__reduceSpacingTopRanked"></div>

                      <div className="topRanked__mainContainer">

                      <div className="topRanked__leftContainer">

                          <img src={require("../assets/img/topRankedImages/category/tomato.png")} id="home__rankedImage" />

                          <div className="home__topRankedGoodTitleLeft">
                          <p className="title">Tomatoes</p>
                          <p className="text-muted home__topRankedSmallerText">
                            0.15kg CO2e
                          </p>
                          </div>

                          <div className="home__betweenRanksSpacing"></div>

                          <img src={require("../assets/img/topRankedImages/category/onion.png")} id="home__rankedImage" />

                          <div className="home__topRankedGoodTitleLeft">
                          <p className="title">Onions</p>
                          <p className="text-muted home__topRankedSmallerText">
                            0.18kg CO2e
                          </p>
                          </div>

                          <div className="home__betweenRanksSpacing"></div>

                          <img src={require("../assets/img/topRankedImages/category/blueberry.png")} id="home__rankedImage" />

                          <div className="home__topRankedGoodTitleLeft">
                          <p className="title">Blueberries</p>
                          <p className="text-muted home__topRankedSmallerText">
                            0.19kg CO2e
                          </p>
                          </div>

                          <div className="home__betweenRanksSpacing"></div>

                          <img src={require("../assets/img/topRankedImages/category/potato.png")} id="home__rankedImage" />

                          <div className="home__topRankedGoodTitleLeft">
                          <p className="title">Potatoes</p>
                          <p className="text-muted home__topRankedSmallerText">
                            0.2kg CO2
                          </p>
                          </div>

                          <div className="home__betweenRanksSpacing"></div>

                          <img src={require("../assets/img/topRankedImages/category/sweetPotato.png")} id="home__rankedImage" />
                          <div className="home__topRankedGoodTitleLeft">
                          <p className="title">Sweet Potato</p>
                          <p className="text-muted home__topRankedSmallerText">
                            0.27kg CO2e
                          </p>
                          </div>

                          <div className="home__betweenRanksSpacing"></div>

                          <img src={require("../assets/img/topRankedImages/category/apple.png")} id="home__rankedImage" />
                          <div className="home__topRankedGoodTitleLeft">
                          <p className="title">Apples</p>
                          <p className="text-muted home__topRankedSmallerText">
                            0.29kg CO2e
                          </p>
                          </div>

                          <div className="home__betweenRanksSpacing"></div>

                        </div>

                        <div className="topRanked__rightContainer">

                            <div className="home__betweenRanksSpacing"></div>

                            <img src={require("../assets/img/topRankedImages/company/eurostar.png")} id="home__rankedImage" />
                            <div className="home__topRankedGoodTitleLeft">
                            <p className="title">Eurostar</p>
                            <p className="text-muted home__topRankedSmallerText">
                              0.006kg CO2e
                            </p>
                            </div>

                            <div className="home__betweenRanksSpacing"></div>

                            <img src={require("../assets/img/topRankedImages/company/carlsberg.png")} id="home__rankedImage" />
                            <div className="home__topRankedGoodTitleLeft">
                            <p className="title">Carlsberg Beer</p>
                            <p className="text-muted home__topRankedSmallerText">
                              0.18kg CO2e
                            </p>
                            </div>

                            <div className="home__betweenRanksSpacing"></div>

                            <img src={require("../assets/img/topRankedImages/company/cocacola.png")} id="home__rankedImage" />
                            <div className="home__topRankedGoodTitleLeft">
                            <p className="title">Coke Zero 2L Plastic</p>
                            <p className="text-muted home__topRankedSmallerText">
                              0.2kg CO2e
                            </p>
                            </div>

                            <div className="home__betweenRanksSpacing"></div>

                            <img src={require("../assets/img/topRankedImages/company/oatly.png")} id="home__rankedImage" />

                          <div className="home__topRankedGoodTitleLeft">
                          <p className="title">Oatly Original 330ml</p>
                          <p className="text-muted home__topRankedSmallerText">
                            0.4kg CO2e
                          </p>
                          </div>

                          <div className="home__betweenRanksSpacing"></div>

                          <img src={require("../assets/img/topRankedImages/company/quorn.png")} id="home__rankedImage" />
                          <div className="home__topRankedGoodTitleLeft">
                          <p className="title">6 Pack Quorn Nuggets</p>
                          <p className="text-muted home__topRankedSmallerText">
                            0.58kg CO2e
                          </p>
                          </div>

                            <div className="home__betweenRanksSpacing"></div>

                            <img src={require("../assets/img/topRankedImages/company/barilla.png")} id="home__rankedImage" />
                            <div className="home__topRankedGoodTitleLeft">
                            <p className="title">Barilla Basilico Sauce</p>
                            <p className="text-muted home__topRankedSmallerText">
                              1.31kg CO2e
                            </p>
                            </div>

                            <div className="home__betweenRanksSpacing"></div>

                        </div>

                        </div>

                        <div className="home__dataWarning">*Disclaimer: This ranking is solely based on data obtained by Carbonly. Click <a className="home__dataWarningLink" href="">here</a> to learn more about our data.</div>

                        <div className="topRanked__bottomCardHeight"></div>



                </CardBody>
              </Card>
            </Col>
          </Row></div> : undefined }
        </div>
      </>
    );
  }
}

export default Home;
