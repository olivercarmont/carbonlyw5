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
import constructionIcon from '@iconify/icons-whh/construction';

import '../OwnCSS/settings.css';

class Settings extends React.Component {
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

                <div className="settings__centerContent">

                <div className="settings__cogsIcon"><Icon icon={constructionIcon} /></div>

                <div className="settings__constructionTitle">Sorry, This Page is Still in Construction</div>

                <div className="settings__constructionMessage">Make sure to check in again sooooon!</div>

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

export default Settings;
