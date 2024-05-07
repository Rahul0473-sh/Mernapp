import { Schema } from "mongoose";
import mongoose from "mongoose"
const conversationSchema = new Schema({
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
}, { timestamps: true });

export const Conversation=mongoose.model("Conversation",conversationSchema)