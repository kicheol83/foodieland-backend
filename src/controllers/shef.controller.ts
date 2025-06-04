import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";

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
    console.log("goLogin");
    res.send("Login Page");
  } catch (err) {
    console.log("Error. getLogin:", err);
  }
};

shefController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("goSignup");
    res.send("Signup Page");
  } catch (err) {
    console.log("Error. getSignup:", err);
  }
};

export default shefController;
