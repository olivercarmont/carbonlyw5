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

class ClickExtension extends React.Component {
  render() {
    return (
      <>
        <div className="content">
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

                <Link to="/home" className="userProfile__submitButton">Done &nbsp; ✔️</Link>

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
