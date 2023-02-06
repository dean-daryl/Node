import Users from "../models/Users.js";
import passport from "passport";
import passportLocal from 'passport-local'

const localStrategy=passportLocal.Strategy



export const signIn = (passport) => {
    passport.use(
      "local-login",
      new localStrategy(
        {
          usernameField: "email",
          passwordField: "password",
        },
        async (email, password, done) => {
          const user = await Users.findOne({ email: email });
          if (!user) return done(null, false);
  
          let match = await bcrypt.compare(password, user.password);
          if (!match) return done(null, false);
  
          return done(null, user);
        }
      )
    );
  };