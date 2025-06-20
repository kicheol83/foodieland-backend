import { ObjectId, Types } from "mongoose";

export interface Author {
  _id: Types.ObjectId;
  authorNick: string;
  authorImage: string;
  authorDesc: string;
  authorInterview: AuthorInterviewItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthorInput {
  authorNick: string;
  authorImage: string;
  authorDesc: string;
  authorInterview: AuthorInterviewItem[];
}

export interface AuthorUpdateInput {
  authorNick?: string;
  authorImage?: string;
  authorDesc?: string;
  authorInterview?: AuthorInterviewItem[];
}

export interface AuthorInterviewItem {
  question: string;
  answer: string;
}
