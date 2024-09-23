import { model, models, Schema } from "mongoose";

export interface IUser {
  email: string;
  username: string;
  image: string;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    // match: /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
  },
  image: {
    type: String,
  },
});

const User = models.User || model<IUser>("User", UserSchema);

export default User;
