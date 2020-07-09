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
import axios from 'axios';
import { Helmet } from "react-helmet";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";

import { Icon, InlineIcon } from '@iconify/react';
import toolsIcon from '@iconify/icons-fa-solid/tools';
import chevronCircleRight from '@iconify/icons-fa-solid/chevron-circle-right';
import chevronCircleRightAlt from '@iconify/icons-cil/chevron-circle-right-alt';
import chevronCircleLeftAlt from '@iconify/icons-cil/chevron-circle-left-alt';

import '../OwnCSS/settings.css';

class InstructionManual extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slide: 0,
    }
}
componentWillMount() {

    axios.post('https://carbonly.org/users/return-leaderboard', { jwt: localStorage.jwtToken }, {
      'jwt': localStorage.jwtToken,
    })
  .then(response => {

      if (response.data.info[0].hasLoggedIn === 'f') {
        window.location.href="/click";
      }

  })
  .catch((error) => {
    console.log(error);
  })
}
slide(num) {

  if (num > 0) {

    if (this.state.slide < 5) {
      this.setState({ slide: this.state.slide+1 })
    }

  } else {

    if (this.state.slide > 0) {
      this.setState({ slide: this.state.slide-1 })
    }

  }

}
changePage(num) {

  let time = 7000;
  if (num === 2) {
    time = 7000;
  } else if (num === 3) {
    time = 7700;
  } else if (num === 4) {
    time = 5000;
  } else if (num === 5) {
    time = 7700;
  }

    //   setTimeout(
    //     function() {
    //             this.setState({ hasChanged: false });
    //     }
    //     .bind(this),
    //     10
    // );

  setTimeout(
    function() {
        // if (!this.state.hasChanged) {
        this.setState({ slide: num });
      // }
    }
    .bind(this),
    time
);
}
render() {
    return (
      <>
    {/*   <Helmet>
        <title>Carbonly | Instructions Manual</title>
        <meta name="description" content="While Not Exactly Hands On, This Tutorial Will Help You Get Started on Carbonly!" />
      </Helmet>  */}

        <div className="content">
          <Row>
          <div className="profile__centeringMainCard">
            <Col md="9">
              <Card className="card-user">
                <CardHeader>

                </CardHeader>
                <CardBody>

                <div className="instructions__centerContent">

                <div className="settings__cogsIcon"><Icon icon={toolsIcon} /></div>

                {this.state.slide === 0  ? <div className="settings__constructionTitle">Instructions Manual</div> : undefined}

                { this.state.slide === 0 ? <Icon className="instructionsRightArrow" onClick={() => this.slide(1)} icon={chevronCircleRightAlt} /> : undefined }

                {this.state.slide === 0 ?

                 <div>
                 <div className="instructions__mainListItemFirst">Learn How Carbonly Works in 5 Quick Steps!&nbsp;</div>

                 <img src={require('../assets/img/landing/instructionsFirstImage.png')} style={{ "width": "60%", "margin-top":"3%", "margin-bottom":"-22%" }} className="instructions__imageFirst"/>

                  <div className="instructions__mainDescriptionFirst">Hit The Arrow to The Right to Get Started!</div>

                 </div>

                : undefined}

               {this.state.slide === 1 ?

                <div>
                <div className="instructions__mainListItem slide-in">#1 &nbsp;Go to a Compatible Marketplace&nbsp; 🛒</div>

                <div className="instructions__imageContainer"><img src={require('../assets/img/landing/compatibleImages.gif')} style={{ "width": "200%" }} className="instructions__image slide-in"/></div>

                 <div className="instructions__mainDescription slide-in">See All Of Our Compatible Marketplaces on Our Extension's Home Screen!</div>

                 {this.changePage(2)}

                </div>

               : undefined}

               {this.state.slide === 2 ?

                 <div>
                   <div className="instructions__mainListItem slide-in">2. &nbsp;See The Carbon Labels of Everyday Products!&nbsp;🎁</div>
                   <div className="instructions__imageContainer"><img src={require('../assets/img/landing/carbonLabels.gif')} style={{ "width": "200%" }} className="instructions__image slide-in"/></div>

                   <div className="instructions__mainDescription slide-in">Scroll Through Any Product Page And See All The Product Emissions</div>

                   {this.changePage(3)}

                 </div>

               : undefined}

               {this.state.slide === 3 ?

                 <div>
                   <div className="instructions__mainListItem slide-in">3. &nbsp;Add to Your Basket And Click "Add" or Simply "Buy"!&nbsp;🛍️</div>

                   <div className="instructions__imageContainer"><img src={require('../assets/img/landing/addToBasket.gif')} style={{ "width": "200%" }} className="instructions__image slide-in"/></div>

                   <div className="instructions__mainDescription slide-in">Either Click on Our Extension And Click 'Add' or Simply The Page's Buy Button</div>

                   {this.changePage(4)}

                 </div>

               : undefined}

               {this.state.slide === 4 ?

                 <div>

                   <div className="instructions__mainListItem slide-in">4. &nbsp;See The Emissions of Your Purchases Over Time! 📈</div>

                   <div className="instructions__imageContainer"><img src={require('../assets/img/landing/trackEmissions.gif')} style={{ "width": "200%" }} className="instructions__image slide-in"/></div>

                   <div className="instructions__mainDescription slide-in">Go to Your Analytics Page to See Your Footprint at Any Time!</div>

                   {this.changePage(5)}

                 </div>

               : undefined}

               {this.state.slide === 5 ?

                 <div>

                   <div className="instructions__mainListItemFirst">That's it!&nbsp;</div>

                   <img src={require('../assets/img/landing/instructionsFirstImage.png')} style={{ "width": "60%", "margin-top":"3%", "margin-bottom":"-22%" }} className="instructions__imageFirst slide-in"/>

                    <div className="instructions__mainDescriptionFirst">Hit Button Below to Get Right In!</div>

                   </div>

               : undefined}

             {this.state.slide === 5 ? <div className="notFound__positionButtonClick">

                <Link to="/home" className="click__doneButton">Let Me In! &nbsp; 😝</Link>

                </div>: undefined }

                </div>

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

export default InstructionManual;
