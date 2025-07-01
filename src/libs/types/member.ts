import { ObjectId, Types } from "mongoose";
import { MemberStatus, MemberType } from "../enums/member.enum";
import { Author } from "./author";
import { RecipeInput } from "./recipe";

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

export interface MemberUpdate {
  _id: ObjectId;
  memberNick?: string;
  memberPhone?: string;
  memberEmail?: string;
  memberPassword?: string;
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
  member: Member;
  author: Author;
  params: { id: string };
  cookies: { [key: string]: string };
  file: Express.Multer.File;
  files: Express.Multer.File[];
}
