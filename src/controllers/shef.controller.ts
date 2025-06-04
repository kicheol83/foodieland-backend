import { Request, Response } from "express";
import { T } from "../libs/types/common";

const shefController: T = {};
shefController.goHome = (req: Request, res: Response) => {
  try {
    res.send("Home Page");
  } catch (err) {
    console.log("Error. goHome:", err);
  }
};

shefController.getLogin = (req: Request, res: Response) => {
  try {
    res.send("Login Page");
  } catch (err) {
    console.log("Error. getLogin:", err);
  }
};

shefController.getSignup = (req: Request, res: Response) => {
  try {
    res.send("Signup Page");
  } catch (err) {
    console.log("Error. getSignup:", err);
  }
};
 

export default shefController;