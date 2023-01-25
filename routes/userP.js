const express = require('express');
const router = express.Router();
const passport = require('passport');


const userProfile = require('../controllers/userProfile_controller');

router.get('/profile/:id', passport.checkAuthentication, userProfile.userProfile); //this ensures the profile page is accessible only when the user is signed in
router.post('/update/:id', passport.checkAuthentication, userProfile.update);

router.get('/sign-up', userProfile.signUp);
router.get('/sign-in', userProfile.signIn);

router.post('/create',userProfile.create);

//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
    ) , userProfile.createSession);

router.get('/sign-out', userController.destroySession);

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), userController.createSession);

module.exports = router;