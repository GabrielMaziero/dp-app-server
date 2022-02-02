import { Request } from "express";
import passport from "passport";
import { Strategy, Profile } from "passport-google-oauth20";
import 'dotenv/config';

export class PassportAuth {
  constructor() {
    passport.serializeUser((user: Express.User, done) => {
      done(null, user);
    })

    passport.deserializeUser((obj, done) => {
      done(null, obj);
    })
  }

  public googleStrategy(): Strategy {
    return new Strategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.BASE_URL + 'oauth2/redirect/google',
      passReqToCallback: true
    },
      (req: Request, accessToken: string, refresToken: string, profile: Profile, done) => {
        try {
          // console.log('profile:', profile)
          const user: Express.User = {
            name: profile._json.given_name,
            email: profile._json.email,
            emailVerify: profile._json.email_verified,
            picture: profile._json.picture,
          }
          return done(null, user)
        } catch (error) {
          return done(null, null, { message: 'Unknown error' })
        }
      }
    )
  }
}