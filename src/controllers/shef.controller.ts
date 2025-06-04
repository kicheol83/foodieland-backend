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

shefController.processLogin = (req: Request, res: Response) => {
  try {
    console.log("processLogin");
    res.send("DONE");
  } catch (err) {
    console.log("Error. processLogin:", err);
  }
};

shefController.processSignup = (req: Request, res: Response) => {
  try {
    console.log("processSignup");
    res.send("DONE1");
  } catch (err) {
    console.log("Error. processSignup:", err);
  }
};

export default shefController;
