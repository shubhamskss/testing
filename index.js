const express = require('express');
const app = express();
const session = require('express-session');

const path = require('path'); // Required for serving views
const facebookRouter = require('./src/controllers/facebook-auth');
const instagramRouter=require("./src/controllers/instagram-auth")

const passport = require('passport');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Make sure this path matches where your views are located

app.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: 'test1R',
    })
  );


app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});
console.log("aaaaaaaaaaaa")


// app.use('/auth/facebook', facebookRouter);
console.log("bbbbbbbbbbbbbbbbbb")
app.use('/auth/instagram', instagramRouter);
app.get('/', (req, res) => {
    res.render('facebook'); // Render your facebook.ejs view
  });
  
const port = process.env.PORT || 3100;
app.listen(port, () => console.log('App listening on port ' + port));