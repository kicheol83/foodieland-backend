export const MORGAN_FORMAT = `:method :url :response-time [:status] \n`;
export const AUTH_TIMER = 24;

import mongoose, { ObjectId } from "mongoose";
export const shapeIntoMogooseObjectId = (target: any) => {
  return typeof target === "string"
    ? new mongoose.Types.ObjectId(target)
    : target;
};

export const lookupMember = {
  $lookup: {
    from: "authors",
    localField: "authorId",
    foreignField: "_id",
    as: "authorData",
  },
};

export interface JwtPayload {
  _id: ObjectId;
  memberNick: string;
  memberEmail: string;
  memberType: string;
  memberPhone: string;
}
