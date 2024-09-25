const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const express = require('express');


const router = express.Router();
require('dotenv').config();

passport.use(
  new FacebookStrategy(
    {
      clientID: "1261712258522640",
      clientSecret: "79a37e59cb750d9b6351e13044958b76",
      callbackURL:"http://localhost:3100/auth/facebook/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
     
     
        console.log('Access Token:', accessToken);
      console.log('User Profile:', profile);
      return cb(null, profile);
      
       
      
    }
  )
);

router.get('/', passport.authenticate('facebook', { scope: 'email' }));

router.get(
  '/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/auth/facebook/error',
  }),
  function (req, res) {
    // Successful authentication, redirect to success screen.
    res.redirect('/');
  }
);

router.get('/success', async (req, res) => {
  const userInfo = {
    id: req.session.passport.user.id,
    displayName: req.session.passport.user.displayName,
    provider: req.session.passport.user.provider,
  };
  res.render('fb-github-success', { user: userInfo });
});

router.get('/error', (req, res) => res.send('Error logging in via Facebook..'));

router.get('/signout', (req, res) => {
  try {
    req.session.destroy(function (err) {
      console.log('session destroyed.');
    });
    res.render('auth');
  } catch (err) {
    res.status(400).send({ message: 'Failed to sign out fb user' });
  }
});

module.exports = router;