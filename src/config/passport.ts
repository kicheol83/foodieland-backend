import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import MemberModel from "../schema/Member.model";
import { MemberStatus, MemberType } from "../libs/enums/member.enum";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0].value;
        if (!email) return done(null, false);

        let member = await MemberModel.findOne({ memberEmail: email });

        // Agar user yo‘q bo‘lsa — yaratamiz
        if (!member) {
          const randomNick =
            "google_" + Math.random().toString(36).slice(2, 10);

          member = await MemberModel.create({
            memberEmail: email,
            memberNick: randomNick,
            memberType: MemberType.USER,
            memberStatus: MemberStatus.ACTIVE,
            memberPassword: profile.id, // placeholder, hech qachon ishlatilmaydi
            memberPhone: null,
          });
        }

        done(null, member);
      } catch (err) {
        done(err, false);
      }
    }
  )
);
