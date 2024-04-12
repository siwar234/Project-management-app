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
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
      },
      async function (accessToken, refreshToken, profile, cb) {
        console.log(profile);
        try {
          const user = await UserModel.findOne({ googleId: profile.id });
          const userRole = await Role.findOne({ name: 'user' });

          if (user) {
            const updatedUser = {
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              email: profile.emails[0].value,
              profilePicture: profile.photos[0].value,
              secret: accessToken,
              Roles: userRole
              ? [{ roleId: userRole._id, name: userRole.name }]
              : [], 
              
            };

            const result = await UserModel.findByIdAndUpdate(
              user._id,
              { $set: updatedUser },
              { new: true }
            );

            return cb(null, result);
          } else {
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
          }
        } catch (err) {
          console.error('Error in Google OAuth strategy:', err);
          return cb(err, null);
        }
      }
    )
  );
};
