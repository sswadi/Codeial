const express = require('express');
const router = express.Router();
const passport = require('passport');


const userProfile = require('../controllers/userProfile_controller');

router.get('/profile', passport.checkAuthentication, userProfile.userProfile); //this ensures the profile page is accessible only when the user is signed in


router.get('/sign-up', userProfile.signUp);
router.get('/sign-in', userProfile.signIn);

router.post('/create',userProfile.create);

//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate('local',{failureRedirect: '/users/sign-in'},) , usersController.createSession);

module.exports = router;