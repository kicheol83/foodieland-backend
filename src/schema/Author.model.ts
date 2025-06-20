import mongoose, { Schema } from "mongoose";
import { AnswerQuetions } from "../libs/enums/answer.quetions";

const interviewSchema = new Schema({
  question: {
    type: String,
    enum: AnswerQuetions,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const authorSchema = new Schema(
  {
    authorNick: {
      type: String,
      required: true,
      index: { unique: true, sparse: true },
    },
    authorImage: {
      type: String,
      required: true,
    },
    authorDesc: {
      type: String,
      required: true,
    },

    authorInterview: {
      type: [interviewSchema],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Author", authorSchema);
