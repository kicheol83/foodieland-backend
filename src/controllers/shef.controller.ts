import { NextFunction, Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import {
  AdminRequest,
  ExtendedRequest,
  LoginInput,
} from "../libs/types/member";
import { MemberInput } from "../libs/types/member";
import AuthService from "../models/Auth.service";
import { MemberType } from "../libs/enums/member.enum";
import { AUTH_TIMER } from "../libs/config";
import { HttpCode, Message } from "../libs/Errors";
import Errors from "../libs/Errors";

const memberService = new MemberService();
const authService = new AuthService();

const shefController: T = {};
shefController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");
    res.render("home");
  } catch (err) {
    console.log("Error. home:", err);
  }
};

shefController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.render("login");
  } catch (err) {
    console.log("Error. login:", err);
  }
};

shefController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");
    res.render("signup");
  } catch (err) {
    console.log("Error. signup:", err);
  }
};

/** BSSR ADMINKA **/

shefController.processSignup = async (req: Request, res: Response) => {
  try {
    console.log("processSignup");

    const file = req.file;
    if (!file)
      throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);

    const newMember: MemberInput = req.body;
    newMember.memberImage = file?.path.replace(/\\/g, "/");
    newMember.memberType = MemberType.SHEF;

    const result = await memberService.processSignup(newMember);
    const token = await authService.createToken(result);
    res.cookie("accessToken", token, {
      maxAge: AUTH_TIMER * 3600 * 1000,
      httpOnly: false,
    });

    res.redirect("/admin/recipe/all");
  } catch (err) {
    console.log("Error, signup:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

shefController.processLogin = async (req: Request, res: Response) => {
  try {
    console.log("processLogin");
    console.log("body:", req.body);
    const input: LoginInput = req.body;

    const result = await memberService.processLogin(input),
      token = await authService.createToken(result);

    res.cookie("accessToken", token, {
      maxAge: AUTH_TIMER * 3600 * 1000,
      httpOnly: false,
    });
    res.redirect("/admin/recipe/all");
  } catch (err) {
    console.log("Error, login:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

shefController.logout = async (req: Request, res: Response) => {
  try {
    console.log("logout");
    res.clearCookie("accessToken");
    res.redirect("home");
  } catch (err) {
    console.log("Error. logout:", err);
    res.redirect("/");
  }
};

shefController.checkMe = async (req: Request, res: Response) => {
  try {
    let member = null;
    const token = req.cookies["accessToken"];
    if (token) member = await authService.checkAuth(token);
    if (!member)
      throw new Errors(HttpCode.UNAUTHORIZED, Message.NOT_AUTHENTICATED);

    res
      .status(HttpCode.OK)
      .send(`<script> alert ("${member.memberNick}") </script>`);
  } catch (err) {
    console.log("Error, verifyAuth:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

shefController.verifyAuth = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["accessToken"];
    if (!token) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.NOT_AUTHENTICATED);
    }

    const member = await authService.checkAuth(token);

    if (member.memberType !== MemberType.SHEF) {
      throw new Errors(HttpCode.FORBIDDEN, Message.NOT_AUTHORIZED);
    }

    req.member = member;

    next();
  } catch (err) {
    console.log("Error, verifyAuth:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default shefController;
