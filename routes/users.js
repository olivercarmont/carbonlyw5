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

// router.route('/update/:id').post((req, res) => {
//
//   console.log('user found', !!User.findById(req.param.id));
//
//   User.findById(req.param.id)
//     .then(user => {
//
//       if (req.body.name) {
//
//       } else if (re)
//
//       user.name = req.body.name;
//       user.avatar = req.body.avatar;
//       // user.email = req.body.email;
//
//       user.save()
//         .then(() => res.json('User updated!'))
//         .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// });

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

        let points = 0;

        us.offsets.map((of) => {
          points += parseFloat(of.points);
        });

        us.orders.map((or) => {
          points += parseFloat(or.points);
        });

        points += parseFloat(us.bonusPoints);

        usOffArray.push({ publicId: us.publicId, name: us.name, username: us.username, avatar: us.avatar, friends: us.friends, points: points });

      });

      usOffArray.sort((a, b) => (a.points < b.points) ? 1 : -1)

      let incr = 0;

      usOffArray = usOffArray.map((us) => {

        incr++
        return { ...us, "rank": incr }

      });

      leaderboardInfo = usOffArray.slice(0, 3);

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

        console.log('user friends', userFriends);

        userFriends.map((fri) => {

        User.findOne({ publicId: fri }).then(friend => {

        let friendPoints = 0;

        friend.offsets.map((el) => {
          friendPoints += parseFloat(el.points);
        });

        friend.orders.map((orf) => {
          friendPoints += parseFloat(orf.points);
        });

        friendPoints += parseFloat(friend.bonusPoints)

        let ranki = 1;

        let firstLoopFinished = false;

        for (let loopN = 0; loopN < usOffArray.length; loopN++) {

          if (usOffArray[loopN].publicId === friend.publicId) {

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

        friendInfo.push({ rank: ranki, publicId: friend.publicId, name: friend.name, username: friend.username, avatar: friend.avatar, points: friendPoints });

        console.log('this pushed', friendInfo.length);

      });
    });

    if (userFriends.length > 0) {

      console.log('two lengths', `${friendInfo.length} ${userInfo.friends.length}`);

      if (friendInfo.length === userInfo.friends.length) {
        done = true;
      } else {

        var timer5 = 0;
        var si5 = setInterval(() => {

          timer5++;

          if ((timer5 > 10000) || (!!leaderboardInfo)) {

            if (friendInfo.length === userInfo.friends.length) {
              clearInterval(si5);
              done = true;


            }

        }

      });
    }

    } else {
      done = true;
    }



    }
  }, 1);

  } else {

  pathTaken += ` usOffArray was defined `;

  console.log('usOffArray was defined')

  userFriends.map((fri) => {

    User.findOne({ publicId: fri }).then(friend => {

  let friendPoints = 0;

  friend.offset.map((el) => {
    friendPoints += parseFloat(el.points);
  });

  friend.orders.map((or) => {
    friendPoints += parseFloat(or.points);
  });

  friendPoints += parseFloat(friend.bonusPoints);

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

  friendInfo.push({ rank: ranki, name: friend.name, username: friend.username, avatar: friend.avatar, points: friendPoints });

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

    friendInfo.push({ rank: ranki, name: friend.name, username: friend.username, avatar: friend.avatar, points: friendPoints });

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

        console.log('user friends2', userFriends);

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
      return res.status(400).json({ id: `User Not Found` });
  }
});

router.post("/return-register", (req, res) => {

  let usersArray = [];

  User.find().then((users) => {

    users.map((us) => {

      usersArray.push({ publicId: us.publicId, email: us.email, username: us.username, referralCode: us.referralCode, socialLogin: us.socialLogin });

    });

    return res.json({ usersArray });

  });

});

router.post("/return-landing", (req, res) => {

  let emTracked = 0, totUsers = 0;

  User.find().then((users) => {

    users.map((us) => {

      totUsers++;

      us.orders.map((or) => {
        emTracked += parseFloat(or.carbon);
      })

    });

    return res.json({ emTracked: Math.round(emTracked), totUsers });

  });

});

router.post("/register", (req, res) => {

  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json({ "reason": "isValid", "errors": errors});
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    }
  });

  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      return res.status(400).json({ username: "Username is Taken" });
    }
    });

    if (req.body.referralUser.length > 0 && !!req.body.referralExists) {

      User.findOne({ referralCode: req.body.referralUser }).then(user => {

      let newPoints = parseFloat(user.bonusPoints) += 2500;

        User.findOneAndUpdate({ referralCode: req.body.referralUser }, { $set: {
            bonusPoints: newPoints,
          }
        }).then(user => {
          // return res.json({ budget: value });
        })

      }).catch(err => res.status(400).json(`Error:` + err));

    }

    if (parseFloat(req.body.points) > 0) {
    const newUser = new User({
       name: req.body.name,
       username: req.body.username,
       email: req.body.email,
       password: req.body.password,
       publicId: req.body.publicId,
       referralCode:req.body.referralCode,
       hasloggedIn: 'f',
       bonusPoints: parseFloat(req.body.points),
       socialLogin: false,
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

    } else {
    const newUser = new User({
       name: req.body.name,
       username: req.body.username,
       email: req.body.email,
       password: req.body.password,
       publicId: req.body.publicId,
       referralCode:req.body.referralCode,
       hasloggedIn: 'f',
       socialLogin: false,
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

     // Check password
     bcrypt.compare(newUser.password, newUser.password).then(isMatch => {
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

    }

});

router.post("/social-register", (req, res) => {

  // Form validation

  // const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  // if (!isValid) {
  //   return res.status(400).json({ "reason": "isValid", "errors": errors});
  // }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    }
  });

  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      return res.status(400).json({ username: "Username is Taken" });
    }
    });

    if (req.body.referralUser.length > 0 && !!req.body.referralExists) {

      User.findOne({ referralCode: req.body.referralUser }).then(user => {

      let newPoints = parseFloat(user.bonusPoints) += 2500;

        User.findOneAndUpdate({ referralCode: req.body.referralUser }, { $set: {
            bonusPoints: newPoints,
          }
        }).then(user => {
          // return res.json({ budget: value });
        })

      }).catch(err => res.status(400).json(`Error:` + err));

    }

    if (parseFloat(req.body.points) > 0) {
    const newUser = new User({
       name: req.body.name,
       username: req.body.username,
       email: req.body.email,
       password: req.body.socialToken,
       publicId: req.body.publicId,
       referralCode:req.body.referralCode,
       hasloggedIn: 'f',
       bonusPoints: parseFloat(req.body.points),
       socialLogin: true,
     });

    } else {
    const newUser = new User({
       name: req.body.name,
       username: req.body.username,
       email: req.body.email,
       password: req.body.socialToken,
       publicId: req.body.publicId,
       referralCode:req.body.referralCode,
       hasloggedIn: 'f',
       socialLogin: true,
     });

         newUser
           .save()
           .then(user => res.end(user))
           .catch(err => console.log(err));

    }

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

        let points = 0;

        us.offsets.map((of) => {
          points += parseFloat(of.points);
        });

        us.orders.map((or) => {
          points += parseFloat(or.points);
        });

        points += parseFloat(user.bonusPoints);

        usOffArray.push({ publicId: us.publicId, name: us.name, username: us.username, avatar: us.avatar, friends: us.friends, points: points });

      });

      usOffArray.sort((a, b) => (a.points < b.points) ? 1 : -1)

      let incr = 0;

      usOffArray = usOffArray.map((us) => {

        incr++
        return { ...us, "rank": incr }

      });

      leaderboardInfo = usOffArray.slice(0, 3);

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

        console.log('user friends', userFriends);

        userFriends.map((fri) => {

        User.findOne({ publicId: fri }).then(friend => {

        let friendPoints = 0;

        friend.offsets.map((el) => {
          friendPoints += parseFloat(el.points);
        });

        friend.orders.map((orf) => {
          friendPoints += parseFloat(orf.points);
        });

        friendPoints += parseFloat(friend.bonusPoints);

        let ranki = 1;

        let firstLoopFinished = false;

        for (let loopN = 0; loopN < usOffArray.length; loopN++) {

          if (usOffArray[loopN].publicId === friend.publicId) {

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

        friendInfo.push({ rank: ranki, publicId: friend.publicId, name: friend.name, username: friend.username, avatar: friend.avatar, points: friendPoints });

        console.log('this pushed', friendInfo.length);

      });
    });

    if (userFriends.length > 0) {

      console.log('two lengths', `${friendInfo.length} ${userInfo.friends.length}`);

      if (friendInfo.length === userInfo.friends.length) {
        done = true;
      } else {

        var timer5 = 0;
        var si5 = setInterval(() => {

          timer5++;

          if ((timer5 > 10000) || (!!leaderboardInfo)) {

            if (friendInfo.length === userInfo.friends.length) {
              clearInterval(si5);
              done = true;


            }

        }

      });
    }

    } else {
      done = true;
    }



    }
}, 1);

} else {

  pathTaken += ` usOffArray was defined `;

  console.log('usOffArray was defined')

  userFriends.map((fri) => {

    User.findOne({ publicId: fri }).then(friend => {

  let friendPoints = 0;

  friend.offset.map((el) => {
    friendPoints += parseFloat(el.points);
  });

  friend.orders.map((or) => {
    friendPoints += parseFloat(or.points);
  });

  friendPoints += parseFloat(friend.bonusPoints);

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

  friendInfo.push({ rank: ranki, name: friend.name, username: friend.username, avatar: friend.avatar, points: friendPoints });

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

    friendInfo.push({ rank: ranki, name: friend.name, username: friend.username, avatar: friend.avatar, points: friendPoints });

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

        console.log('user friends2', userFriends);

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

/*
*******************************************************************
                      RETURN USER PROFILE
*******************************************************************
*/

router.post("/update", (req, res) => {
  // Form validation

  let token;

  console.log('IS RUNNING ----');

  if ((req.body.jwt || !!req.header('jwt')) && ((!!req.body.prop &&  !!req.body.value) || (!!req.header('prop') &&  !!req.header('value')))) {

    console.log('found all props');

  if (req.body.jwt) {
  token = req.body.jwt;
} else if (req.header('jwt')) {
  token = req.header('jwt');
}

    let decoded = parseJwt(token);
    let id = decoded.id;
    id = id.toString();

    // let upUser;

    let prop, value;

    if (req.body.prop) {
      prop = req.body.prop;
      value = req.body.value;
    } else if (req.header('prop')) {
      prop = req.header('prop');
      value = req.header('value');

      console.log('prop', req.header('prop'))
      console.log('val', req.header('value'))
    }

    // console.log('prop', req.body.prop);
    // console.log('val', req.body.value);

    User.findOne({ _id: id }).then(user => {

    console.log('user', user);

    if (!user) {
      res.status(400).json({ message: 'User Not Found' });
    }
    if (prop === 'name' && typeof value === 'string' && value.length < 60) {

      if ((/[,.+-:;=~#`'"{}/\[\]!?\-]/.test(value))) {
        res.status(400).json({ message: 'Contains Punctuation' });
      }

      User.findOne({ _id: id }).then(user => {

        User.findOneAndUpdate({ _id: id }, { $set: {
            name: value
          }
        }).then(user => {
          return res.json({ name: value });
        })

      }).catch(err => res.status(400).json(`Error:` + err));

        //    (can contain: @, _, -, $, #)
    } else if (prop === 'username' && typeof value === 'string' && value.length < 60) {

      if ((/[,.+-:;=~`'"{}/\[\]!?\-]/.test(value))) {
        res.status(400).json({ message: 'Contains Punctuation' });
      }

      let fondUserWithUsername = false;

      User.find().then((users) => {

        users.map((us) => {

          if (us.username === value) {
            fondUserWithUsername = true;
          }

        });
      });

     if (!fondUserWithUsername) {
       User.findOne({ _id: id }).then(user => {

         User.findOneAndUpdate({ _id: id }, { $set: {
             username: value
           }
         }).then(user => {
           return res.json({ username: value });
         })

       }).catch(err => res.status(400).json(`Error:` + err));
     }
   } else if (prop === 'avatar' && typeof value === 'string' && (value === 'avatars/mainProfileImage-1.png' || value === 'avatars/mainProfileImage-2.png' || value === 'avatars/mainProfileImage-3.png' || value === 'avatars/mainProfileImage-4.png' || value === 'avatars/mainProfileImage-5.png' ||  value === 'avatars/mainProfileImage.png' || value === 'avatars/mainProfileImage1.png' || value === 'avatars/mainProfileImage2.png' || value === 'avatars/mainProfileImage3.png' || value === 'avatars/mainProfileImage4.png')) {

     User.findOne({ _id: id }).then(user => {

       User.findOneAndUpdate({ _id: id }, { $set: {
           avatar: value
         }
       }).then(user => {
         return res.json({ avatar: value });
       })

     }).catch(err => res.status(400).json(`Error:` + err));

     valid = true;
   } else if (prop === 'shoppingList' && typeof value === 'object' && value.length < 100) {
       User.findOne({ _id: id }).then(user => {

         User.findOneAndUpdate({ _id: id }, { $set: {
             shoppingList: value
           }
         }).then(user => {
           return res.json({ shoppingList: value });
         })

       }).catch(err => res.status(400).json(`Error:` + err));

   } else if (prop === 'savedList' && typeof value === 'object' && value.length < 100) {

       User.findOne({ _id: id }).then(user => {

         User.findOneAndUpdate({ _id: id }, { $set: {
             savedList: value
           }
         }).then(user => {
           return res.json({ savedList: value });
         })

       }).catch(err => res.status(400).json(`Error:` + err));

   } else if (prop === 'friends' && typeof value === 'object' && value.length < 75) {

     User.findOne({ _id: id }).then(user => {

       User.findOneAndUpdate({ _id: id }, { $set: {
           friends: value
         }
       }).then(user => {
         return res.json({ friends: value });
       })

     }).catch(err => res.status(400).json(`Error:` + err));

   } else if (prop === 'loggedIn') {

     User.findOne({ _id: id }).then(user => {

       User.findOneAndUpdate({ _id: id }, { $set: {
           hasLoggedIn: 't'
         }
       }).then(user => {
         return res.json({ hasLoggedIn: true });
       })

     }).catch(err => res.status(400).json(`Error:` + err));

   } else if (prop === 'budget') {

     User.findOne({ _id: id }).then(user => {

       User.findOneAndUpdate({ _id: id }, { $set: {
           budget: value
         }
       }).then(user => {
         return res.json({ budget: value });
       })

     }).catch(err => res.status(400).json(`Error:` + err));

   } else if (prop == 'bonusPoints') {

     User.findOne({ _id: id }).then(user => {

       let newPoints = parseFloat(user.bonusPoints) + parseFloat(value);

       User.findOneAndUpdate({ _id: id }, { $set: {
           bonusPoints: newPoints,

         }
       }).then(user => {
         return res.json({ bonusPoints: newPoints });
       })

     }).catch(err => res.status(400).json(`Error:` + err));

   } else if (prop == 'changeOrders') {

     User.findOne({ _id: id }).then(user => {

       User.findOneAndUpdate({ _id: id }, { $set: {
            orders: value,
         }
       }).then(user => {
         return res.json({ newOrders: value });
       })

     }).catch(err => res.status(400).json(`Error:` + err));

   }

});

}
});


router.post("/add-order", (req, res) => {

  let token;

  if ((req.body.jwt || !!req.header('jwt')) && (req.body.website || req.header('website'))) {

  if (req.body.jwt) {
    token = req.body.jwt;
  } else if (req.header('jwt')) {
    token = req.header('jwt');
  }

    let decoded = parseJwt(token);
    let id = decoded.id;
    id = id.toString();

    let order;

    let website, name, time, carbon, points;

    if (req.header('website')) {
      website = req.header('website');
    } else if (req.body.website) {
      website = req.body.website;
    }

    if (req.header('name')) {
      name = decodeURI(req.header('name'));
    } else if (req.body.name) {
      name = decodeURI(req.body.name);
    }

    if (req.header('time')) {
      time = req.header('time');
    } else if (req.body.time) {
      time = req.body.time;
    }

    if (req.header('carbon')) {
      carbon = req.header('carbon');
    } else if (req.body.carbon) {
      carbon = req.body.carbon;
    }

    if (req.header('points')) {
      points = req.header('points');
    } else if (req.body.points) {
      points = req.body.points;
    }

    if (website && name && time && carbon && points) {

      order = {
        website: website,
        name: name,
        time: time,
        carbon: carbon,
        points: points,
        offset: false
      }

    } else {
        return res.status(400).json({ "Data": `Not All Data Provided ${website}-${name}-${time}-${carbon}-${points}` });
    }

  // let tokenObject = { token: token
  // };

  // return res.json(tokenObject);

  let isRepeat = false;

  User.findOne({ _id: id }).then(user => {

    let orders = user.orders.map((or) => { return or });

    orders.map((ord) => {
      let minutesDiff = Date.parse(time) - Date.parse(time);
      minutesDiff = Math.abs(minutesDiff / 60000);

      console.log('DIFF', minutesDiff);

      if (minutesDiff < 0.22) {
        if (name === ord.name) {
          isRepeat = true;
          return res.json({ isRepeat: `${minutesDiff}` });
        }
      } else if (minutesDiff < 3) {
        if (name === ord.name) {
          isRepeat = true;
          return res.status(400).json({ isRepeat: `${minutesDiff}` });
        }
      }
    })

    orders.push(order)

    User.findOneAndUpdate({ _id: id }, { $set: {
        orders: orders
      }
    }).then(user => {
      return res.json({ orders:orders });
    })

  }).catch(err => res.status(400).json(`Error:` + err));

} else {
      return res.status(400).json({ publicId: `User Not Found` });
  }
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


// SOCIAL LOGIN
router.post("/social-login", (req, res) => {

  // const { errors, isValid } = validateLoginInput(req.body);
  //
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  const email = req.body.email;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(user.password, user.password).then(isMatch => {
      if (true) {
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
        // return res
        //   .status(400)
        //   .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
