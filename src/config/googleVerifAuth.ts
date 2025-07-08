import dotenv from "dotenv";
dotenv.config();
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import MemberModel from "../schema/Member.model";

export const verifyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const SECRET_TOKEN = process.env.SECRET_TOKEN;
    if (!SECRET_TOKEN) {
      throw new Error("SECRET_TOKEN is not defined in .env file");
    }
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, SECRET_TOKEN) as {
      _id: string;
    };

    const member = await MemberModel.findById(decoded._id);
    if (!member) return res.status(404).json({ message: "Member not found" });

    (req as any).member = member; // extended req
    next();
  } catch (err) {
    console.log("verifyAuth error:", err);
    res.status(401).json({ message: "Unauthorized" });
  }
};
