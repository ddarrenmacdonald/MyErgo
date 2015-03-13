// Passport Configuration

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var postgres = require('../postgres');

// NOTE: unfortunately, from an API persepective, it appears that passport can only be used for
// local signup.

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({

        // by default, local strategy uses username and password, we will override with email
        // for this example
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

        //determine if the password is present in the postgres users table
        var data = [email, password];
        var sql = 'SELECT * FROM users WHERE email = $1 AND password = $2';
        postgres.client.query(sql, data, function(err, result) {
            
            // SQL error, return the error message
            if (err) {
                return done(err);
            }

            // user was found, login is successful.  Return the user information
            if (result.rows.length > 0) {
                var user = result.rows[0];
                return done(null, user);
            }
            else {  //unsuccessful login, return with error message
                return done(null, false, { message: 'Invalid username/password.' });
            }

        });

    }));

};