import { ObjectId } from "mongoose";
import { MemberStatus, MemberType } from "../enums/member.enum";
import { Author } from "./author";

export interface Member {
  _id: ObjectId;
  memberType: MemberType;
  memberStatus: MemberStatus;
  memberNick: string;
  memberPhone: string;
  memberEmail: string;
  memberPassword?: string;
  memberImage?: string;
  memberAddress?: string;
  memberDesc?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MemberInput {
  memberType?: MemberType;
  memberStatus?: MemberStatus;
  memberNick: string;
  memberPhone: string;
  memberEmail: string;
  memberPassword: string;
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
}

export interface LoginInput {
  memberNick: string;
  memberPassword: string;
  memberEmail: string;
}

export interface AdminRequest extends Request {
  member: Member;
  author: Author;
  file: Express.Multer.File;
  files: Express.Multer.File[];
}

export interface ExtendedRequest extends Request {
  member?: Member;
  author: Author;
  cookies: { [key: string]: string };
  file: Express.Multer.File;
  files: Express.Multer.File[];
  
}
