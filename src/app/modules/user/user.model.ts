import { model, Schema } from "mongoose";
import { IAuthProvider, IUser, Role, Status } from "./user.ifterface";

export const authSchema = new Schema<IAuthProvider>(
  {
    provider: String,
    providerId: String,
  },
  {
    _id: false,
    versionKey: false,
  }
);

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.user,
    },
    phone: {
      type: String,
    },
    picture: {
      type: String,
    },
    address: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.active,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    auths: {
      type: [authSchema],
    },
    // bookings: {
    //   type: [Types.ObjectId],
    // },
    // guides: {
    //   type: [Types.ObjectId],
    // },
  },
  {
    timestamps: true,
  }
);

// userSchema.post("findOne", function (data, next) {
//   data.password = "";
//   next();
// });

export const User = model<IUser>("user", userSchema);
