import { Schema, model } from "mongoose";
const OrderSchema = new Schema(
  {
    order_item: { type: String },
    state: {
      type: String,
      enum: ["created", "shipped", "delivered", "canceled"],
      default: "Created",
    },
    id: { type: Schema.Types.ObjectId },
    branch_id: { type: Schema.Types.ObjectId, ref: "branch" },
    customer_id: { type: Schema.Types.ObjectId, ref: "user" },
    amount: { type: Number },
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

export default model("order", OrderSchema);
