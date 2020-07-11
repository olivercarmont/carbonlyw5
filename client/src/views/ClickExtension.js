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
import { Link } from "react-router-dom";



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
import smCursorClick from '@iconify/icons-heroicons/sm-cursor-click';


import '../OwnCSS/settings.css';

// const nodemailer = require("nodemailer");

class ClickExtension extends React.Component {
  componentWillMount() {

    axios.post('https://carbonly.org/users/return-leaderboard', { jwt: localStorage.jwtToken }, {
      'jwt': localStorage.jwtToken,
    })
  .then(response => {


    this.setState({ user: response.data.info[0] });

    let localUser = response.data.info[0];

    if (localUser.hasLoggedIn === 't' || localUser.hasLoggedIn === 'true') {
      window.location.href = 'https://www.carbonly.org/home';
    } else {
      // async function main() {
      //
      //   let testAccount = await nodemailer.createTestAccount();
      //
      //   // create reusable transporter object using the default SMTP transport
      //   let transporter = nodemailer.createTransport({
      //     host: "smtp.ethereal.email",
      //     port: 587,
      //     secure: false, // true for 465, false for other ports
      //     auth: {
      //       user: testAccount.user, // generated ethereal user
      //       pass: testAccount.pass, // generated ethereal password
      //     },
      //   });
      //
      //   // send mail with defined transport object
      //   let info = await transporter.sendMail({
      //     from: '"Oliver at Carbonly 🌿" <olcarmontzaragoza@gmail.com>', // sender address
      //     to: `${localUser.email}`, // list of receivers
      //     subject: "Welcome to Carbonly! 🌿", // Subject line
      //     text: "This is the text", // plain text body
      //     html: "This is the  html", // html body
      //   });
      //
      //   console.log("Message sent: %s", info.messageId);
      //
      //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      //
      // }
      //
      // main().catch(console.error);
    }

  })
  .catch((error) => {
    console.log(error);
  })
  }
render() {
    return (
      <>
        <div className="content">
        <img className="click__topArrow" src={require('../assets/img/landing/clickArrow.png')} />
          <Row>
          <div className="profile__centeringMainCard">
            <Col md="9">
              <Card className="card-user">
                <CardHeader>

                </CardHeader>
                <CardBody>

                <div className="settings__centerContent">

                <div className="settings__cogsIcon"><Icon icon={smCursorClick} /></div>

                <div className="settings__constructionTitle">Click The Extension to Get Started! 🖱️</div>

                <div className="settings__constructionMessage">(It should be on the right-hand corner!)</div>

                <div className="clickExtension__haventInstalledExtension">Haven't Installed The Extension? <a className="clickExtension__chromeLink" href="https://chrome.google.com/webstore/detail/carbonly/anipbbamcfddggbegnjdmphhajmgclpn/related" target="_blank">Click Here!</a></div>

                <div className="notFound__positionButtonClick">

                <Link to="/instructions" className="click__doneButton">I've Done it! &nbsp; ✔️</Link>

                </div>

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

export default ClickExtension;
