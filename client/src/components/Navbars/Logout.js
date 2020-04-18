import React, { Component } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import '../../OwnCSS/all.css';

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
          <p id="navbar__logoutText" onClick={() => this.onLogoutClick()}>Log out</p>
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
