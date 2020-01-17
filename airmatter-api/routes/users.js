var express = require('express');
var router = express.Router();

const getDb = require("../pollution-db").getDb;

/* GET users listing. */
router.post('/login', function(req, res, next) {
  getDb().collection('users').findOne( 
      { username: req.body.username, password: req.body.password },
      function(err, user) {
        if(!user){
          res.statusCode = 401;
          res.send("incorrect credentials")
        } else {
          res.json(user);
        }
      })
});

router.post('/register', function(req, res, next) {
  newUser = req.body

  getDb().collection('users').findOne( 
    { username: newUser.username },
    function(err, user) {
      if(user){
        res.statusCode = 409;
        res.send("user already exists")
      } else {
        getDb().collection('users').insert( 
          newUser,
          function(err, r) {
            if(!err) {
              res.json(newUser);
            } else {
              res.statusCode = 500;
              res.send();
            }
          })
      }
    })
});

router.put('/user/:username', function(req, res, next) {
  username = req.params.username;
  updatedUser = req.body;
  getDb().collection('users').findOne( 
    { username: username },
    function(err, user) {
      if(user){
        getDb().collection('users').updateOne( 
          user,
          { $set: updatedUser },
          function(err, r) {
            if(!err) {
              res.send();
            } else {
              console.log(err)
              res.statusCode = 500;
              res.send();
            }
          }
        )
      } else {
        res.statusCode = 404;
        res.send("user not found");
      }
    })
});

module.exports = router;
