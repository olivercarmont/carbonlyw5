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

import '../../OwnCSS/all.css';

import Logout from './Logout.js';

import axios from 'axios';

// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input,
  InputGroup,
  NavbarBrand,
  Navbar,
  Nav,
  NavLink,
  Container,
  Modal
} from "reactstrap";

import { Link } from "react-router-dom";

class AdminNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      modalSearch: false,
      color: "navbar-transparent"
    };
  }
  componentDidMount() {

      axios.post('https://carbonly.org/users/return-home', { jwt: localStorage.jwtToken }, {
        'jwt': localStorage.jwtToken,
      })
    .then(response => {

        console.log('response', response.data);

         this.setState({ user: response.data });

    })
    .catch((error) => {
      console.log(error);
    })

    window.addEventListener("resize", this.updateColor);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateColor);
  }
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    if (window.innerWidth < 993 && this.state.collapseOpen) {
      this.setState({
        color: "bg-white"
      });
    } else {
      this.setState({
        color: "navbar-transparent"
      });
    }
  };
  // this function opens and closes the collapse on small devices
  toggleCollapse = () => {
    if (this.state.collapseOpen) {
      this.setState({
        color: "navbar-transparent"
      });
    } else {
      this.setState({
        color: "bg-white"
      });
    }
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  // this function is to open the Search modal
  toggleModalSearch = () => {
    this.setState({
      modalSearch: !this.state.modalSearch
    });
  };
  render() {
    return (
      <>
      {this.state.user ? <div>
        <Navbar
          className={classNames("navbar-absolute", this.state.color)}
          expand="lg"
        >
          <Container fluid>
            <div className="navbar-wrapper">
              <div
                className={classNames("navbar-toggle d-inline", {
                  toggled: this.props.sidebarOpened
                })}
              >
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={this.props.toggleSidebar}
                >
                  <span className="navbar-toggler-bar bar1" />
                  <span className="navbar-toggler-bar bar2" />
                  <span className="navbar-toggler-bar bar3" />
                </button>
              </div>
              <NavbarBrand id="topNav__brandText" href="#pablo" onClick={e => e.preventDefault()}>
                {this.props.brandText} &nbsp; {this.props.brandEmoji}
              </NavbarBrand>
            </div>
            <button
              aria-expanded={false}
              aria-label="Toggle navigation"
              className="navbar-toggler"
              data-target="#navigation"
              data-toggle="collapse"
              id="navigation"
              type="button"
              onClick={this.toggleCollapse}
            >
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
            </button>
            <Collapse navbar isOpen={this.state.collapseOpen}>
              <Nav className="ml-auto" navbar>

                <UncontrolledDropdown nav>
                  <DropdownToggle
                    caret
                    color="default"
                    data-toggle="dropdown"
                    nav
                  >
                    <div className="notification d-none d-lg-block d-xl-block" />
                    <i className="tim-icons icon-bell-55" />
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-navbar" id="nav__notificationsContainer" right tag="ul">
                  <p id="navbar__notificationsTitle">Notifications ⏰ &nbsp;</p>
                    <NavLink tag="li">
                      <DropdownItem className="nav-item">
                        <div id="nav__notificationsIndividualItem"> We'll Still Busy Adding This Feature. Check Again 🔜!</div>
                      </DropdownItem>
                    </NavLink>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav>
                  <DropdownToggle
                    caret
                    color="default"
                    data-toggle="dropdown"
                    nav
                  >
                    <div className="notification d-none" />
                    <i className="tim-icons icon-globe-2" />
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-navbar" id="nav__notificationsContainer" right tag="ul">
                  <p id="navbar__notificationsTitle">Language &nbsp;㊙️</p>
                    <NavLink tag="li">
                      <DropdownItem className="nav-item">
                        <div id="nav__notificationsIndividualItem"> We'll Still Busy Adding This Feature. Check Again 🔜!</div>
                      </DropdownItem>
                    </NavLink>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav>
                  <DropdownToggle
                    caret
                    color="default"
                    data-toggle="dropdown"
                    nav
                    onClick={e => e.preventDefault()}
                  >
                    <div className="photo nav__positionProfilePhoto">
                      <img alt="..." src={require(`../../assets/img/${this.state.user.avatar}`)} />
                    </div>
                    {/* <b className="caret d-none d-lg-block d-xl-block" /> */}
                    <p className="d-lg-none">Log out</p>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-navbar" right tag="ul">


                {/*  <Link
                    to="/profile"
                    className="nav-link"
                    activeClassName="active"
                  >
                    <DropdownItem className="nav-item">Profile</DropdownItem> */}



                    <NavLink tag="li"><Link to="/profile">
                    <DropdownItem className="nav-item">Profile</DropdownItem>
                    </Link>
                    </NavLink>
                    <NavLink tag="li"><Link to="/settings">
                    <DropdownItem className="nav-item">Settings</DropdownItem>
                    </Link>
                    </NavLink>
                    <DropdownItem divider tag="li" />
                    <NavLink tag="li">
                      <DropdownItem className="nav-item"><Logout/></DropdownItem>
                    </NavLink>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <li className="separator d-lg-none" />
              </Nav>
            </Collapse>
          </Container>
        </Navbar></div> : undefined}

      </>
    );
  }
}

export default AdminNavbar;
