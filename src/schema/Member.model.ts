import mongoose, { Schema } from "mongoose";
import { MemberStatus } from "../libs/enums/member.enum";
import { MemberType } from "../libs/enums/member.enum";

const memberSchema = new Schema(
  {
    memberType: {
      type: String,
      enum: MemberType,
      default: MemberType.USER,
    },
    
    memberStatus: {
      type: String,
      enum: MemberStatus,
      default: MemberStatus.ACTIVE,
    },

    memberNick: {
      type: String,
      index: { unique: true, sparse: true },
      required: true,
      match: [/^[a-zA-Z0-9_]{3,20}$/, "Invalid nickname format"],
    },

    memberPhone: {
      type: String,
      index: { unique: true, sparse: true },
      required: true,
      match: [/^01[016789]-?\d{3,4}-?\d{4}$/, "Invalid Korean phone number"],
    },
    memberEmail: {
      type: String,
      index: { unique: true, sparse: true },
      required: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"],
    },

    memberPassword: {
      type: String,
      select: false,
      required: true,
    },

    memberImage: { type: String },
    memberAddress: { type: String },
    memberDesc: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Member", memberSchema);
