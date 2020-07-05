const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const passport = require("passport");
const bodyParser = require("body-parser");

// import MongoURI from './config/keys';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Set up a whitelist and check against it:
// var whitelist = ['http://localhost:3000']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       // callback(new Error('Not allowed by CORS'))
//         callback(null, true)
//     }
//   }
// }

// Then pass them to cors:
// app.use(cors(corsOptions));

app.use(cors());


app.use(function (req, res, next) {
    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    res.setHeader('Access-Control-Allow-Origin', '213.127.89.107');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');

    res.setHeader('Access-Control-Allow-Origin', req.header('origin')
|| req.header('x-forwarded-host') || req.header('referer') || req.header('host'));

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(express.json());

const uri = "mongodb+srv://olivercarmont:Rd656uSnVJed5sEs@cluster0-k9xyl.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });

  const usersRouter = require('./routes/users');
  const dataRouter = require('./routes/data');
  const formRouter = require('./routes/form');
  const blogRouter = require('./routes/blog');

  app.use('/data', dataRouter);
  app.use('/users', usersRouter);
  app.use('/form', formRouter);
  app.use('/blogs', blogRouter);

}
// const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const dataRouter = require('./routes/data');
const formRouter = require('./routes/form');
const blogRouter = require('./routes/blog');

app.use('/users', usersRouter);
app.use('/data', dataRouter);
app.use('/form', formRouter);
app.use('/blogs', blogRouter);

app.listen(port, () => {
    console.log(`Server is running on port (server.js here): ${port}`);
});

// Bodyparser middleware
// app.use(
//   bodyParser.urlencoded({
//     extended: false
//   })
// );
// app.use(bodyParser.json());
//
// // Passport middleware
// app.use(passport.initialize());
//
// // Passport config
// require("./config/passport")(passport);
