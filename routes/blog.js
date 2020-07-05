const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");
var jwtDecode = require('jwt-decode');

// Load User model
const Blog = require("../models/Blog");

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

router.post("/return-blog", (req, res) => {

  let id = '';

  if (req.body.jwt) {

    token = req.body.jwt;

    let decoded = parseJwt(token);
    id = decoded.id;
    id = id.toString();

  } else if (req.header('jwt')) {

    token = req.header('jwt');

    let decoded = parseJwt(token);
    id = decoded.id;
    id = id.toString();
  }

  let link, allBlogs = [], userProps, allUsersArray = [];

  if (req.body.link) {
    link = req.body.link;
  } else if (req.header('link')) {
    link = req.header('link');
  }

  if (!req.body.link && !req.header('link')) {
    return res.status(400).json(`Link: Not Found`);
  }

  Blog.find().then((blogs) => {

    blogs.map((blog) => {
          allBlogs.push({ blog });
    });

    allBlogs.sort(function(a,b){
    return new Date(b.publishDate) - new Date(a.publishDate);
    });

  });

  User.find().then((users) => {

    users.map((us) => {
      allUsersArray.push({ publicId: us.publicId, name: us.name, avatar: us.avatar, username: us.username });
    });

  if (id) {

  User.findOne({ _id: id }).then(user => {
    userProps = user;
    console.log('found user', user);

    Blog.findOne({ link }).then(blog => {

      // console.log("try", blog)
      console.log("try2", blog)

      if (!blog) {
        console.log('WENT HERE')
        return res.json({ blogNotFound: 'Blog Not Found' });
      }

      console.log('SEE --- ', blog)

      return res.json({ allBlogs, blog, userProps, allUsersArray });

    }).catch((e) => {

      return res.json({ blogNotFound: 'Blog Not Found' });

    });

  });

  } else {
    Blog.findOne({ link }).then(blog => {

      // console.log("try", blog)
      console.log("try2", blog)

      if (!blog) {
        console.log('WENT HERE')
        return res.json({ blogNotFound: 'Blog Not Found' });
      }

      console.log('SEE --- ', blog)

      return res.json({ allBlogs, blog, userProps, allUsersArray });

    }).catch((e) => {

      return res.json({ blogNotFound: 'Blog Not Found' });

    });
  }


});

});

router.post("/return-blogs", (req, res) => {

  let writtenBlogs = [], videoBlogs = [];

  Blog.find().then((blogs) => {

    blogs.map((blog) => {

      if (blog.isVideoBlog == 't') {
          videoBlogs.push({ blog });
      } else {
          writtenBlogs.push({ blog });
      }


    });
    videoBlogs.sort(function(a,b){
    return new Date(b.publishDate) - new Date(a.publishDate);
    });

    writtenBlogs.sort(function(a,b){
    return new Date(b.publishDate) - new Date(a.publishDate);
    });

    return res.json({ videoBlogs, writtenBlogs });

  });

});

router.post("/like-blog", (req, res) => {

  let writtenBlogs = [], videoBlogs = [];

  Blog.find().then((blogs) => {

    blogs.map((blog) => {

      if (blog.isVideoBlog == 't') {
          videoBlogs.push({ blog });
      } else {
          writtenBlogs.push({ blog });
      }


    });
    videoBlogs.sort(function(a,b){
    return new Date(b.publishDate) - new Date(a.publishDate);
    });

    writtenBlogs.sort(function(a,b){
    return new Date(b.publishDate) - new Date(a.publishDate);
    });

    return res.json({ videoBlogs, writtenBlogs });

  });

});

router.post("/change-like", (req, res) => {

  let link, userPublicId, hasLiked = false;

  if (req.body.link) {
    link = req.body.link;
    userPublicId = req.body.userPublicId;
  } else if (req.header('link')) {
    link = req.header('link');
    userPublicId = req.header('userPublicId');
  }

  if ((!req.body.link && !req.header('link')) || (!req.body.userPublicId && !req.header('userPublicId'))) {
    return res.status(400).json(`userPublicId: Not Found`);
  }

  Blog.findOne({ link }).then(blog => {

    if (!blog) {
      return res.json({ blogNotFound: 'Blog Not Found' });
    }

    blog.likes.map((user) => {
      if (user === userPublicId) {
        hasLiked = true;
      }
    })

    if (!hasLiked) {
      let newLikes = blog.likes;

      newLikes.push(userPublicId);

      Blog.findOneAndUpdate({ link }, { $set: {
          likes: newLikes,
        }
      }).then(blog => {
          return res.json({ likes: newLikes });
      })
    } else {
      let newLikes = blog.likes;
      let indexOfUser = newLikes.indexOf(userPublicId);

      newLikes.splice(indexOfUser, 1);

      Blog.findOneAndUpdate({ link }, { $set: {
          likes: newLikes,
        }
      }).then(blog => {
          return res.json({ likes: newLikes });
      })
    }


  }).catch((e) => {

    return res.json({ blogNotFound: 'Blog Not Found' });

  });

});

router.post("/post-comment", (req, res) => {

  let link, userPublicId, commentData;

  if (req.body.link) {
    link = req.body.link;
    userPublicId = req.body.userPublicId;
    commentData = req.body.commentData;
  } else if (req.header('link')) {
    link = req.header('link');
    userPublicId = req.header('userPublicId');
    commentData = req.header('commentData');
  }

  if ((!req.body.link && !req.header('link')) || (!req.body.userPublicId && !req.header('userPublicId'))) {
    return res.status(400).json(`userPublicId: Not Found`);
  }

  Blog.findOne({ link }).then(blog => {

    if (!blog) {
      return res.json({ blogNotFound: 'Blog Not Found' });
    }

    User.findOne({ publicId: userPublicId }).then(user => {

      let newComments = blog.comments;

      let includesComment = false;
      newComments.push(commentData);

      Blog.findOneAndUpdate({ link }, { $set: {
          comments: newComments,
        }
      }).then(blog => {
          return res.json({ comments: newComments });
      })

  }).catch((e) => {

    return res.json({ blogNotFound: 'Blog Not Found' });

  });

});

});

module.exports = router;
