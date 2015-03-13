// Setting up Passport from Rob's Tutorial

var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var multer  = require('multer');
var passport = require('passport');

var app = express();

app.use(bodyParser.json({ type: 'application/json' }));
app.use(expressValidator());

require('./passport')(passport); // pass passport for configuration

// required for passport
app.use(passport.initialize());

var postgres = require('./postgres');

// local login.  This requires a username, password, and logintype.  If no logintype is entered,
// it will default to local login
app.post('/login', function(req, res) {

  // check the logintype.  If you haven't seen this before, a switch statement is similar to a 
  // group of if statements
  switch (req.body.logintype) {

      case "local":
      default:
        passport.authenticate('local-signup', function(err, user, info) {

          //an error was encountered (ie. no database available)
          if (err) {  
            return next(err); 
          }

          //a user wasn't returned; this means that the user isn't available, or the login information is incorrect
          if (!user) {  
            return res.json({
              'loginstatus' : 'failure',
              'message' : info.message
            }); 
          }
          else {  //success!  return the successful status and the if of the logged in user
            return res.json({
              'loginstatus' : 'success',
              'userid' : user.id
            })
          }
        })(req, res);
        break;
  }
});

module.exports = app;