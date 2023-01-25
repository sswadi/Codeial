const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
    clientID: "436366912346-6bt76trn0jrg3gb14jlvult2ihkj2s4i.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
},

function(accessToken, refreshToken, profile, done){
    User.findOne({email: profile.emails[0].value}).exec(function(err, user){
        if(err){
            console.log('error in google strategy passpoert', err);
            return ;
        }

        if(user){
            return done(null, user);
        }else{
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            }, function(err, user){
                if(err){
                    console.log('error in creating user', err);
                    return ;
                }

                return done(null, user);
            });
        }
    });
}
));

module.exports = passport;