import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
  email: string;
  password: string;
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

const User = models.User || model<IUser>("User", userSchema);
export default User;
