const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authetication using passport
passport.use(new LocalStrategy({
        usernameField: 'email', // the field that is going to be unique will be used here
        passReqToCallback: true
    },
    function(req, email, password, done){
        //find a user & establish identity
        User.findOne({email: email}, function(err, user){ // here 2nd email is the email passed on and first(key) is the value from model ie. db
            if(err){
                // console.log('Error in finding user --> Passport');
                req.flash('error', error);
                return done(err);
            }
            if(!user || user.password != password){
                // console.log('Invalid username/Password');
                req.flash('error', 'Invalid Username/Password');
                return done(null, false);
            }

            return done(null, user);
        });
    }

));

//serialise the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null, user.id);
});


//de-serialise the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null,user);
    });
});

//check if the user is authenticated; this func will also be used as a middleware
passport.checkAuthentication = function(req, res, next){
    //if the user is signed in, then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;