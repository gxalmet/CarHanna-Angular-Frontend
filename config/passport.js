const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const user = require("../src/app/models/user")

passport.use(new LocalStrategy({
    usernameField: "email"
}, async(email, password, done) => {

}))