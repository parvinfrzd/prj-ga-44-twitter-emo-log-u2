const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const Users = require('../models/user');


passport.use(
    new GoogleStrategy(
        {
            clientID: "1018474768298-61rqod0e1t8bm3cuodg3vfjco9a6haus.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:3000/oauth2callback",
        },
        // a user has logged in with OAuth...
        function (accessToken, refreshToken, profile, cb) {
            // 1- find the user inside our DB, who has just signed into the app
            // profile.id is coming from Google
            Users.findOne({ googleId: profile.id })
                .then((user) => {
                    if (user) {
                        return user;
                    }

                    return Users.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        googleId: profile.id,
                    });
                })
                .then((user) => cb(null, user))
                .catch((err) => cb(err));
        }
    )
);

passport.serializeUser(function (student, done) {
    done(null, student.id);
});

passport.deserializeUser(function (id, done) {
    Student.findById(id)
        .then((student) => done(null, student))
        .catch((err) => done(err, null));
});