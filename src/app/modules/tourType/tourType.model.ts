import { model, Schema } from "mongoose";
import { ITourType } from "./tourType.interface";

export const tourTypeSchema = new Schema<ITourType>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const TourType = model<ITourType>("tour-type", tourTypeSchema);
