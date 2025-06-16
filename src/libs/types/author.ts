import { ObjectId } from "mongoose";

export interface Author {
  _id: ObjectId;
  authorNick: string;
  authorImage: string;
  authotDesc: string;
  authorInterview: [string];
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthotInput {
  authorNick: string;
  authorImage: string;
  authotDesc: string;
  authorInterview: [string];
}

export interface AuthorUpdateInput {
  authorImage?: string;
  authotDesc?: string;
  authorInterview?: [string];
}

export interface AuthorInterviewItem {
  question: string;
  answer: string;
}
