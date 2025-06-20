import mongoose, { Schema } from "mongoose";
import { LikeGroup } from "../libs/enums/Like.enum";

const likeSchema = new Schema(
  {
    likeGroup: {
      type: String,
      enum: LikeGroup,
      default: LikeGroup.RECIPE,
      required: true,
    },

    memberId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Member",
    },

    likeRefId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Like", likeSchema);
