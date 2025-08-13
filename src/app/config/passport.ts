import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import { envVariable } from "./envConfig";
import { User } from "../modules/user/user.model";
import { Role } from "../modules/user/user.ifterface";
import { Strategy as LoacalStrategy } from "passport-local";
import { checkPassword } from "../utils/checkPassword";

passport.use(
  new LoacalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email: string, password: string, done) => {
      try {
        const isUserExists = await User.findOne({ email });

        if (!isUserExists) {
          return done("User does not exist");
        }

        const isGoogleAuthenticated = isUserExists.auths.some(
          (providerObjects) => providerObjects.provider === "google"
        );

        if (isGoogleAuthenticated && !isUserExists?.password) {
          return done(
            "Your google authenticated user. Please set a password if your wnat to credential login"
          );
        }

        if (!isUserExists.password) {
          return done(null, false, { message: "Password required" });
        }

        const isPasswordMatch = await checkPassword(
          password,
          isUserExists.password as string
        );

        if (!isPasswordMatch) {
          return done("Wrong Password");
        }
        if (isUserExists.isDeleted) {
          return done("The account is deleted");
        }

        return done(null, isUserExists);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: envVariable.GOOGLE_CLIENT_ID,
      clientSecret: envVariable.GOOGLE_CLIENT_SECRET,
      callbackURL: envVariable.GOOGLE_CALLBACK_URL,
    },
    async (
      accessToken: string,
      refeshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        const email = profile.emails?.[0].value;

        if (!email) {
          return done(null, false, { message: "Email not found" });
        }

        let user = await User.findOne({ email });
        if (!user) {
          user = await User.create({
            email,
            name: profile.displayName,
            picture: profile.photos?.[0].value,
            role: Role.user,
            isVerified: true,
            auths: [
              {
                provider: "google",
                providerId: profile.id,
              },
            ],
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
  done(null, user._id);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.deserializeUser(async (id: string, done: any) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
