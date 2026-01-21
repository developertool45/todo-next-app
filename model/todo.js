import mongoose from "mongoose";
import { maxLength } from "zod";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxLength: [100, "Title cannot be more than 100 characters long"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxLength: [500, "Description cannot be more than 500 characters long"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Todo || mongoose.model("Todo", todoSchema);