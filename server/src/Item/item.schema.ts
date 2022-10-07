import { Schema, model } from "mongoose";
const ItemSchema = new Schema(
  {
      name: { type: String, required: true, unique: true,  },
    amount: { type: Number, required: true },
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

export default model("item", ItemSchema);
