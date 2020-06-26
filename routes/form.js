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

  let type, data, time;

  if (req.body.type) {
    type = req.body.type;
    data = req.body.data;
    time = req.body.time;
  } else if (req.header('type')) {
    type = req.header('type');
    data = req.header('data');
    time = req.header('time');
  }

  if (!req.body.type && !req.header('type')) {
    return res.status(400).json(`Input: Not Found`);
  }

  if (req.header("link")) {
    let link = req.header("link");
    let product = decodeURI(req.header("product"));
    let productCategory = req.header("prodCategory");
    let emissions = req.header("emissions");

    const newForm = new Form({ type, data, link, product, productCategory, emissions, time });

    newForm.save()
      .then(() => res.json('Submission added!'))
      .catch(err => res.status(400).json('Error: ' + err));

  } else {
    const newForm = new Form({ type, data, time });

    newForm.save()
      .then(() => res.json('Submission added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  }

});

router.post("/has-submitted-form", (req, res) => {

  let formId, userE;

  if (req.body.formId) {
    formId = req.body.formId;
    userE = req.body.email;
  } else if (req.header('formId')) {
    formId = req.header('formId');
    userE = req.header('email');
  }

  if (!req.body.formId && !req.header('formId')) {
    return res.status(400).json(`FormId: Not Found`);
  }

  if (!req.body.email && !req.header('email')) {
    return res.status(400).json(`Email: Not Found`);
  }

  Form.findOne({ formId }).then(form => {

    let hasAnswered = 'f', answerType = '';

    console.log(form)

    form.usersAnswered.map((frm) => {
      if (frm.email === userE) {
        hasAnswered = 't';
        answerType = frm.answerType;
      }
    })

    return res.json({ hasAnswered, answerType });

  });
});

router.post("/submit-question", (req, res) => {

  let formId, userE, details;

  if (req.body.formId) {
    formId = req.body.formId;
    userE = req.body.email;
    details = req.body.details;
    time = req.body.time;
  } else if (req.header('formId')) {
    formId = req.header('formId');
    userE = req.header('email');
    details = req.header('details');
    time = req.header('time');
  }

  if (!req.body.formId && !req.header('formId')) {
    return res.status(400).json(`FormId: Not Found`);
  }

  if (!req.body.email && !req.header('email')) {
    return res.status(400).json(`Email: Not Found`);
  }

  if (!req.body.details && !req.header('details')) {
    return res.status(400).json(`Details: Not Found`);
  }

  if (!req.body.answerType && !req.header('answerType')) {
    return res.status(400).json(`answerType: Not Found`);
  }

  Form.findOne({ formId }).then(form => {

  let newUserList = form.usersAnswered.filter(frm => !(frm.email === userE));

    newUserList.push({
    email: userE,
    details,
    time,
    answerType
  })

  Form.findOneAndUpdate({ formId }, { $set: {
        usersAnswered: newUserList
    }
  }).then(user => {
    return res.json({ newUserList: 'Worked' });
  })

});

});

router.post("/return-faq", (req, res) => {

  let formId, userE;

  if (req.body.formId) {
    formId = req.body.formId;
  } else if (req.header('formId')) {
    formId = req.header('formId');
  }

  if (!req.body.formId && !req.header('formId')) {
    return res.status(400).json(`FormId: Not Found`);
  }

  Form.findOne({ formId }).then(form => {

    return res.json({ questions: form.faqQuestions });

  });
});

router.post("/update-faq", (req, res) => {

  let questionId, cur_question;

  if (req.body.useful) {
    useful = req.body.useful;
  } else if (req.header('useful')) {
    useful = req.header('useful');
  }

  if (req.body.cur_question) {
    cur_question = req.body.cur_question;
  } else if (req.header('cur_question')) {
    cur_question = req.header('cur_question');
  }

  questionId = cur_question.questionId;

  if (useful === 'useful') {

    Form.findOne({ formId: '4JF931' }).then(form => {

    let newQuestionList = form.faqQuestions.filter(frm => !(frm.questionId === questionId));

    cur_question.foundUseful = cur_question.foundUseful + 1;

    newQuestionList.push(cur_question)

    Form.findOneAndUpdate({ formId: '4JF931' }, { $set: {
      faqQuestions: newQuestionList,
      }
    }).then(user => {
      return res.json({ updated: 'True!' });
    })

  });

  } else {

    Form.findOne({ formId: '4JF931' }).then(form => {

    let newQuestionList = form.faqQuestions.filter(frm => !(frm.questionId === questionId));

    cur_question.foundNotUseful = cur_question.foundNotUseful + 1;

    newQuestionList.push(cur_question)

    Form.findOneAndUpdate({ formId: '4JF931' }, { $set: {
      faqQuestions: newQuestionList,
      }
    }).then(user => {
      return res.json({ updated: 'True!' });
    })

    });

  }

});

module.exports = router;
