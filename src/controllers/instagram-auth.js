const passport = require('passport');
const InstagramStrategy = require('passport-instagram').Strategy; // Use passport-instagram
const express = require('express');

const router = express.Router();
console.log("kkkkkkkkkkkkk")
// Configure the Instagram strategy for use by Passport
passport.use(new InstagramStrategy({
    clientID: "1579530782965357", // Your Instagram app's client ID
    clientSecret: "b83754e65938bac7e27b978a877d90e2", // Your Instagram app's client secret
    callbackURL: "https://dev-ultron.gopaisa.com/Dashboard", // Adjusted for your local environment
  },
  function(accessToken, refreshToken, profile, done) {
    // Here you can save user info to your database or perform any necessary actions
    console.log("profile==", profile, "accessToken==", accessToken);
    return done(null, profile); // Call done with the user profile
  }
));

// Initiate the OAuth2 flow
router.get('/auth/instagram',
    passport.authenticate('instagram'));

// Handle the callback after Instagram has authenticated the user
router.get('/auth/instagram/callback', 
    passport.authenticate('instagram', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    }
);

module.exports = router;
