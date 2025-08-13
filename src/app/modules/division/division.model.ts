import { model, Schema } from "mongoose";
import { IDivieson } from "./division.interface";

export const divisionSchema = new Schema<IDivieson>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Division = model<IDivieson>("division", divisionSchema);
