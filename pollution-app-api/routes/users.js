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
            }
          })
      }
    })
});

module.exports = router;
