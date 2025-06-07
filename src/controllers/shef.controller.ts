import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { LoginInput } from "../libs/types/member";
import { MemberInput } from "../libs/types/member";

const shefController: T = {};
shefController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");
    res.send("Home Page");
  } catch (err) {
    console.log("Error. goHome:", err);
  }
};

shefController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.send("Login Page");
  } catch (err) {
    console.log("Error. getLogin:", err);
  }
};

shefController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");
    res.send("Signup Page");
  } catch (err) {
    console.log("Error. getSignup:", err);
  }
};

/** BSSR ADMINKA **/

shefController.processSignup = async (req: Request, res: Response) => {
  try {
    console.log("processSignup");
    console.log("body", req.body);

    const newMember: MemberInput = req.body;
    if (req.body.memberType === "SHEF" || req.body.memberType === "ADMIN")
      newMember.memberType = req.body.memberType;

    const memberService = new MemberService();
    const result = await memberService.processSignup(newMember);

    res.send(result);
  } catch (err) {
    console.log("Error. processSignup:", err);
  }
};

shefController.processLogin = async (req: Request, res: Response) => {
  try {
    console.log("processLogin");
    console.log("body:", req.body);
    const input: LoginInput = req.body;

    const memberService = new MemberService();
    const result = await memberService.processLogin(input);
    res.send(result);
  } catch (err) {
    console.log("Error. processLogin:", err);
  }
};

export default shefController;
