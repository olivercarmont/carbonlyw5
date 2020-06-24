import React, { Component } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import '../../OwnCSS/all.css';

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

class Logout extends Component {
constructor(props) {
super(props);
    this.state = {

}
}
onLogoutClick() {
  // e.preventDefault();
  this.props.logoutUser();
};
  render() {
    const { user } = this.props.auth;
    return (
      <NavLink tag="li" onClick={() => this.onLogoutClick()}>
        <DropdownItem className="nav-item"><p id="navbar__logoutText">Log out</p></DropdownItem>
      </NavLink>
    );
  }
}

Logout.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Logout);
