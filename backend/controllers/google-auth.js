const GoogleStrategy = require("passport-google-oauth20").Strategy;
const UserModel = require("../models/User");
const Role = require('../models/role');

module.exports = (passport) => {
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    UserModel.findById(id)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(err, null);
      });
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8000/auth/google/callback",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
        prompt: 'select_account',
        authType: 'rerequest' // Add this line
      },
      async function (accessToken, refreshToken, profile, cb) {
        console.log(profile);
        try {
          const existingUser = await UserModel.findOne({ email: profile.emails[0].value });

          if (existingUser) {
            return cb(null, existingUser); // User already exists, sign them in
          }

          const userRole = await Role.findOne({ name: 'user' });

          const newUser = new UserModel({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            googleId: profile.id,
            email: profile.emails[0].value,
            profilePicture: profile.photos[0].value,
            secret: accessToken,
            Roles: userRole
              ? [{ roleId: userRole._id, name: userRole.name }]
              : [], 
          });

          const result = await newUser.save();

          return cb(null, result);
        } catch (err) {
          console.error('Error in Google OAuth strategy:', err);
          return cb(err, null);
        }
      }
    )
  );
};
