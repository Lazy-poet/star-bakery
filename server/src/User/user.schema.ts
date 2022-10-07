import { Schema, model } from "mongoose";
import { hash, compare } from "bcryptjs";
import { User } from "types";

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true, minLength: 6 },
    id: { type: Schema.Types.ObjectId },
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

UserSchema.pre("save", async function (next) {
  this.password = await hash(this.get("password"), 12);
  next();
});

UserSchema.methods.validatePassword = async function (password: string) {
  console.log("this.password", this.password);
  return await compare(password, this.password);
};

export default model<User>("user", UserSchema);
