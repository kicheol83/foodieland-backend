import { ObjectId } from "mongoose";
import { ViewGroup } from "../enums/view.enum";



export interface View {
  _id: ObjectId;
  viewGroup: ViewGroup;
  memberId: ObjectId;
  viewRefId: ObjectId;
  createAt: Date;
  updateAt: Date;
}

export interface ViewInput {
  memberId: ObjectId | null;
  viewRefId: ObjectId;
  viewGroup: ViewGroup;
}
