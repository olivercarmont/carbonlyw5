const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");
var jwtDecode = require('jwt-decode');

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// Load User model
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

// @route POST api/users/register
// @desc Register user
// @access Public

// const router = require('express').Router();
// let User = require('../models/user.model');

// router.route('/').get((req, res) => {
//   User.find()
//     .then(users => res.json(users))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.get("/find-one", (req, res) => {
//
//   let token = req.body.jwt;
//   let decoded = parseJwt(token);
//   let id = decoded.id;
//   id = id.toString();
//   // let tokenObject = { token: token
//   // };
//
//   // return res.json(tokenObject);
//
//   User.findOne({ _id: id }).then(user => {
//     return res.json(user);
//   }).catch(err => res.status(400).json(`Error:` + err));
//
// });

router.route('/add').post((req, res) => {
  const username = req.body.username;

  const newUser = new User({username});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {

  console.log('user found', !!User.findById(req.param.id));

  User.findById(req.param.id)
    .then(user => {

      user.name = req.body.name;
      user.avatar = req.body.avatar;
      // user.email = req.body.email;

      user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post("/return-extension", (req, res) => {

  let token;
  let pathTaken = '';

  if (req.body.jwt || !!req.header('jwt')) {

  if (req.body.jwt) {
  token = req.body.jwt;
} else if (req.header('jwt')) {
  token = req.header('jwt');
}

    let decoded = parseJwt(token);
    let id = decoded.id;
    id = id.toString();
  // let tokenObject = { token: token
  // };

  // return res.json(tokenObject);

  let info, userInfo, userFriends, friendInfo = [], leaderboardInfo, usOffArray = [];

  let done = false, triedInsert = false, rankLoopFinished = false;

  User.findOne({ _id: id }).then(user => {

    userInfo = user;
    userFriends = user.friends;
    let i = 1;

    User.find().then((users) => {

      users.map((us) => {

        let indvOff = 0;

        us.offsets.map((of) => {
          indvOff += parseInt(of.amount);
        });

        usOffArray.push({ publicId: us.publicId, name: us.name, username: us.username, avatar: us.avatar, offsets: indvOff });

      });

      usOffArray.sort((a, b) => (a.offsets < b.offsets) ? 1 : -1)

      leaderboardInfo = usOffArray;

      leaderboardInfo = leaderboardInfo.slice(0, 3);

      console.log('usOffArrayAtFriends (before)', usOffArray);

    });

    console.log('usOffArrayAtFriends', usOffArray);

    if (usOffArray.length < 1) {

    console.log("usOffArray wasn't defined");

    pathTaken += ` usOffArray was not defined `;

    var timer2 = 0;
    var si2 = setInterval(() => {

      timer2++;

      if ((timer1 > 10000) || (!!leaderboardInfo)) {

        console.log('timer', timer2);

        clearInterval(si2);

        userFriends.map((fri) => {

          User.findOne({ publicId: fri }).then(friend => {

        let friendOffset = 0;

        friend.offsets.map((el) => {
          friendOffset += parseFloat(el.amount);
        });

        let ranki = 1;

        for (let loopN = 0; loopN < usOffArray.length; loopN++) {
            pathTaken += ` for loop was started `;
          if (usOffArray[loopN].publicId === friend.publicId) {
            rankLoopFinished = true;
            break;
          } else {
            ranki++
          }
        }

        if (!rankLoopFinished) {

        pathTaken += ` rankLoopFinished was not defined `;

        var timer3 = 0;
        var si3 = setInterval(() => {

          timer3++;

        if (rankLoopFinished) {

        clearInterval(si3);

        pathTaken += ` rankLoopFinished became defined `;

        friendInfo.push({ rank: ranki, name: friend.name, username: friend.username, avatar: friend.avatar, offsetAmount: friendOffset });

        triedInsert = true;

        if (userFriends.length > 0) {

          if (!!triedInsert && rankLoopFinished) {
            done = true;
          }

        } else {
          done = true;
        }

        }

        }, 1);
        } else {

          friendInfo.push({ rank: ranki, name: friend.name, username: friend.username, avatar: friend.avatar, offsetAmount: friendOffset });

          triedInsert = true;

          if (userFriends.length > 0) {

            if (!!triedInsert && rankLoopFinished) {
              done = true;
            }

          } else {
            done = true;
          }

        }

      })

    });

  }
}, 1);

} else {

  pathTaken += ` usOffArray was defined `;

  console.log('usOffArray was defined')

  userFriends.map((fri) => {

    User.findOne({ publicId: fri }).then(friend => {

  let friendOffset = 0;

  friend.offsets.map((el) => {
    friendOffset += parseFloat(el.amount);
  });

  let ranki = 1;

  console.log('usOffArray', usOffArray);

  for (let loopN = 0; loopN < usOffArray.length; loopN++) {

    if (usOffArray[loopN].publicId === friend.publicId) {
      rankLoopFinished = true;

      console.log('rankLoopFinished became true');

      pathTaken += ` rankLoopFinished: ${rankLoopFinished} `

      break;
    } else {
      ranki++
    }
  }

  console.log('rankLoopFinished', rankLoopFinished);

  if (!rankLoopFinished) {

  pathTaken += ` rankLoopFinished wasn't defined `

  var timer4 = 0;
  var si4 = setInterval(() => {

    timer4++;

  if (rankLoopFinished) {

  clearInterval(si4);

  pathTaken += ` rankLoopFinished became defined `

  friendInfo.push({ rank: ranki, name: friend.name, username: friend.username, avatar: friend.avatar, offsetAmount: friendOffset });

  console.log('friend length', userFriends.length);

  triedInsert = true;

  if (userFriends.length > 0) {

    pathTaken += `triedInsert && rankLoop: ${triedInsert}, ${rankLoopFinished}`

    if (!!triedInsert && !!rankLoopFinished) {
      done = true;
    }

  } else {
    done = true;
  }

  }

  }, 1);
  } else {

    friendInfo.push({ rank: ranki, name: friend.name, username: friend.username, avatar: friend.avatar, offsetAmount: friendOffset });

    triedInsert = true;

    if (userFriends.length > 0) {

      if (!!triedInsert && !!rankLoopFinished) {
        done = true;
      }

    } else {
      done = true;
    }

  }

});
});
}

    var timer1 = 0;
    var si1 = setInterval(() => {

      timer1++;

      // console.log('pathTaken', pathTaken);
      // console.log('leaderboardInfo', leaderboardInfo);

      if ((timer1 > 10000) || (!!done && !!leaderboardInfo)) {

        clearInterval(si1);

        console.log('timer', timer1);

        let rankip = 1;
        let personalLoopFinished = false;


        for (let loopN2 = 0; loopN2 < usOffArray.length; loopN2++) {
          if (usOffArray[loopN2].publicId === user.publicId) {
            personalLoopFinished = true;
            break;
          } else {
            rankip++
          }
        }

        if (personalLoopFinished) {

      info = [userInfo, friendInfo, leaderboardInfo, { usrank: rankip }];

      return res.json({ info });

      }

    }
  }, 1);

  }).catch(err => res.status(400).json(`Error:` + err));

} else {
      return res.status(400).json({ jwt: `${res.toString()} + ${req.header('jwt')} + ${req.headers['jwt']}` });
  }

});

router.post("/return-home", (req, res) => {

  let token;

  if (req.body.jwt || !!req.header('jwt')) {

  if (req.body.jwt) {
  token = req.body.jwt;
} else if (req.header('jwt')) {
  token = req.header('jwt');
}

    let decoded = parseJwt(token);
    let id = decoded.id;
    id = id.toString();
  // let tokenObject = { token: token
  // };

  // return res.json(tokenObject);

  User.findOne({ _id: id }).then(user => {
    return res.json(user);
  }).catch(err => res.status(400).json(`Error:` + err));

} else {
      return res.status(400).json({ publicId: `User Not Found` });
  }
});

router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/return-leaderboard", (req, res) => {

  let token;
  let pathTaken = '';

  if (req.body.jwt || !!req.header('jwt')) {

  if (req.body.jwt) {
  token = req.body.jwt;
} else if (req.header('jwt')) {
  token = req.header('jwt');
}

    let decoded = parseJwt(token);
    let id = decoded.id;
    id = id.toString();
  // let tokenObject = { token: token
  // };

  // return res.json(tokenObject);

  let info, userInfo, userFriends, friendInfo = [], leaderboardInfo, usOffArray = [];

  let done = false, triedInsert = false, rankLoopFinished = false;

  User.findOne({ _id: id }).then(user => {

    userInfo = user;
    userFriends = user.friends;
    let i = 1;

    User.find().then((users) => {

      users.map((us) => {

        let indvOff = 0;

        us.offsets.map((of) => {
          indvOff += parseInt(of.amount);
        });

        usOffArray.push({ publicId: us.publicId, name: us.name, username: us.username, avatar: us.avatar, offsets: indvOff });

      });

      usOffArray.sort((a, b) => (a.offsets < b.offsets) ? 1 : -1)

      leaderboardInfo = usOffArray;

      leaderboardInfo = leaderboardInfo.slice(0, 3);

      console.log('usOffArrayAtFriends (before)', usOffArray);

    });

    console.log('usOffArrayAtFriends', usOffArray);

    if (usOffArray.length < 1) {

    console.log("usOffArray wasn't defined");

    pathTaken += ` usOffArray was not defined `;

    var timer2 = 0;
    var si2 = setInterval(() => {

      timer2++;

      if ((timer1 > 10000) || (!!leaderboardInfo)) {

        console.log('timer', timer2);

        clearInterval(si2);

        userFriends.map((fri) => {

          User.findOne({ publicId: fri }).then(friend => {

        let friendOffset = 0;

        friend.offsets.map((el) => {
          friendOffset += parseFloat(el.amount);
        });

        let ranki = 1;

        let firstLoopFinished = false;

        for (let loopN = 0; loopN < usOffArray.length; loopN++) {

          if (usOffArray[loopN].publicId === friend.publicId) {
            rankLoopFinished = true;
            break;
          } else {
            ranki++
          }
        }

        let rankus = 1;

        usOffArray = usOffArray.map((ur) => {

          let newOb = ur;
          newOb['rank'] = rankus;

          rankus++;

          return newOb;

        });

        if (rankus === usOffArray.length && firstLoopFinished) {
          rankLoopFinished = true;
        }

        if (!rankLoopFinished) {

        pathTaken += ` rankLoopFinished was not defined `;

        var timer3 = 0;
        var si3 = setInterval(() => {

          timer3++;

        if (rankLoopFinished) {

        clearInterval(si3);

        pathTaken += ` rankLoopFinished became defined `;

        friendInfo.push({ rank: ranki, name: friend.name, username: friend.username, avatar: friend.avatar, offsetAmount: friendOffset });

        triedInsert = true;

        if (userFriends.length > 0) {

          if (!!triedInsert && rankLoopFinished) {
            done = true;
          }

        } else {
          done = true;
        }

        }

        }, 1);
        } else {

          friendInfo.push({ rank: ranki, name: friend.name, username: friend.username, avatar: friend.avatar, offsetAmount: friendOffset });

          triedInsert = true;

          if (userFriends.length > 0) {

            if (!!triedInsert && rankLoopFinished) {
              done = true;
            }

          } else {
            done = true;
          }

        }

      })

    });

  }
}, 1);

} else {

  pathTaken += ` usOffArray was defined `;

  console.log('usOffArray was defined')

  userFriends.map((fri) => {

    User.findOne({ publicId: fri }).then(friend => {

  let friendOffset = 0;

  friend.offsets.map((el) => {
    friendOffset += parseFloat(el.amount);
  });

  let ranki = 1;

  let firstLoopFinished = false;

  for (let loopN = 0; loopN < usOffArray.length; loopN++) {

    if (usOffArray[loopN].publicId === friend.publicId) {
      rankLoopFinished = true;

      console.log('rankLoopFinished became true');

      pathTaken += ` rankLoopFinished: ${rankLoopFinished} `

      break;
    } else {
      ranki++
    }
  }

  let rankus = 1;

  usOffArray = usOffArray.map((ur) => {

    let newOb = ur;
    newOb['rank'] = rankus;

    rankus++;

    return newOb;

  });

  if (rankus === usOffArray.length && firstLoopFinished) {
    rankLoopFinished = true;
  }

  console.log('rankLoopFinished', rankLoopFinished);

  if (!rankLoopFinished) {

  pathTaken += ` rankLoopFinished wasn't defined `

  var timer4 = 0;
  var si4 = setInterval(() => {

    timer4++;

  if (rankLoopFinished) {

  clearInterval(si4);

  pathTaken += ` rankLoopFinished became defined `

  friendInfo.push({ rank: ranki, name: friend.name, username: friend.username, avatar: friend.avatar, offsetAmount: friendOffset });

  console.log('friend length', userFriends.length);

  triedInsert = true;

  if (userFriends.length > 0) {

    pathTaken += `triedInsert && rankLoop: ${triedInsert}, ${rankLoopFinished}`

    if (!!triedInsert && !!rankLoopFinished) {
      done = true;
    }

  } else {
    done = true;
  }

  }

  }, 1);
  } else {

    friendInfo.push({ rank: ranki, name: friend.name, username: friend.username, avatar: friend.avatar, offsetAmount: friendOffset });

    triedInsert = true;

    if (userFriends.length > 0) {

      if (!!triedInsert && !!rankLoopFinished) {
        done = true;
      }

    } else {
      done = true;
    }

  }

});
});
}

    var timer1 = 0;
    var si1 = setInterval(() => {

      timer1++;

      // console.log('pathTaken', pathTaken);
      // console.log('leaderboardInfo', leaderboardInfo);

      if ((timer1 > 10000) || (!!done && !!leaderboardInfo)) {

        clearInterval(si1);

        console.log('timer', timer1);

        let rankip = 1;
        let personalLoopFinished = false;


        for (let loopN2 = 0; loopN2 < usOffArray.length; loopN2++) {
          if (usOffArray[loopN2].publicId === user.publicId) {
            personalLoopFinished = true;
            break;
          } else {
            rankip++
          }
        }

        if (personalLoopFinished) {

      info = [userInfo, friendInfo, leaderboardInfo, { usrank: rankip }, usOffArray];

      return res.json({ info });

      }

    }
  }, 1);

  }).catch(err => res.status(400).json(`Error:` + err));

} else {
      return res.status(400).json({ jwt: `${res.toString()} + ${req.header('jwt')} + ${req.headers['jwt']}` });
  }

});

router.post("/update", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  console.log('errors', errors);
  alert('errors', errors);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      User.findOneAndUpdate({ _id: user._id }, { $set: {
        ...req
      }
    })
    }
}).catch((e) => {
  console.log('err', e);
  return res.status(400);
});

});


// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
