import express from "express";
import passport from "passport";
import { AUTH_TIMER } from "../libs/config";
import AuthService from "../models/Auth.service";
import { Member } from "../libs/types/member";

const Authrouter = express.Router();
const authService = new AuthService();

// Boshlanish — foydalanuvchini Google sahifasiga yuboradi
Authrouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback URL — bu yerdan Google qaytadi
Authrouter.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    try {
      const member = req.user as any;

      const tokenPayload = {
        _id: member._id.toString(),
        memberNick: member.memberNick,
        memberEmail: member.memberEmail,
        memberType: member.memberType,
        memberPhone: member.memberPhone,
      };

      const token = await authService.createToken(tokenPayload);

      res.cookie("accessTOKEN", token, {
        maxAge: AUTH_TIMER * 3600 * 1000,
        httpOnly: false,
      });

      res.redirect("http://localhost:3000");
    } catch (err) {
      console.log("Google login error:", err);
      res.send(
        `<script>alert("Login failed"); window.location.replace('/admin/login')</script>`
      );
    }
  }
);

export default Authrouter;
