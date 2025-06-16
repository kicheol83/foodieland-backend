import mongoose, { Schema } from "mongoose";
import { AnswerQuetions } from "../libs/enums/answer.quetions";

const interviewSchema = new Schema({
  question: {
    type: String,
    enum: Object.values(AnswerQuetions),
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
    },
    authorImage: {
      type: String,
      required: true,
    },
    authotDesc: {
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
