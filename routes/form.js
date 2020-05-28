const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");
var jwtDecode = require('jwt-decode');

// Load User model
const Form = require("../models/Form");

const User = require("../models/User");

global.atob = require("atob");

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

router.post("/add-submission", (req, res) => {

  let type, data;

  if (req.body.type) {
    type = req.body.type;
    data = req.body.data;
  } else if (req.header('type')) {
    type = req.header('type');
    data = req.header('data');
  }

  if (!req.body.type && !req.header('type')) {
    return res.status(400).json(`Input: Not Found`);
  }

  if (req.header("link")) {
    let link = req.header("link");
    let prod = req.header("product");
    let prodCat = req.header("prodCategory");
    let emissions = req.header("emissions");

    const newForm = new Form({ type, data, link, prod, prodCat, emissions });

    newForm.save()
      .then(() => res.json('Submission added!'))
      .catch(err => res.status(400).json('Error: ' + err));

  } else {
    const newForm = new Form({ type, data });

    newForm.save()
      .then(() => res.json('Submission added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  }


});

module.exports = router;
