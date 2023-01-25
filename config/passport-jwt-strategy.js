const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),//extract auth from header which contains bearer; find jwt in header
    secretOrKey: 'codeial'
}

// need to tell passport to use jwt strategy
passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){ // function to read the payload(middle part) from the json token

    User.findById(jwtPayLoad._id, function(err, user){
        if(err){
            console.log('Error in finding user from JWT');
            return;
        }
        if(user){
            return done(null, user);
        }
        else{
            return done(null, false);
        }

    });
}));

module.exports = passport;
