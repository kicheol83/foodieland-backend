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
    memberNick: {
      type: String,
      required: true,
    },
    memberImage: {
      type: String,
      required: true,
    },
    memberDesc: {
      type: String,
      required: true,
    },

    interviews: {
      type: [interviewSchema],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Author", authorSchema);
