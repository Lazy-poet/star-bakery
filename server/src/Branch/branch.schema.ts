import { Schema, model } from "mongoose";
const BranchSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default model("branch", BranchSchema);
