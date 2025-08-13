import httpStatus from "http-status-codes";
import AppError from "../../errors/AppError";
import { ITourType } from "./tourType.interface";
import { TourType } from "./tourType.model";

const createTourType = async (payload: ITourType) => {
  const existingTourType = await TourType.findOne({ name: payload.name });

  if (existingTourType) {
    throw new Error("Tour type already exists.");
  }

  return await TourType.create(payload);
};
const getAllTourTypes = async () => {
  return await TourType.find();
};
const updateTourType = async (id: string, payload: ITourType) => {
  const existingTourType = await TourType.findById(id);

  if (!existingTourType) {
    throw new Error("Tour type not found.");
  }

  const isUpdateTourTypeMatched = await TourType.find({
    name: payload.name,
    _id: { $ne: id },
  });

  if (isUpdateTourTypeMatched) {
    throw new AppError(
      httpStatus.CONFLICT,
      "The new tour name matched another"
    );
  }

  const updatedTourType = await TourType.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updatedTourType;
};
const deleteTourType = async (id: string) => {
  const existingTourType = await TourType.findById(id);
  if (!existingTourType) {
    throw new Error("Tour type not found.");
  }

  return await TourType.findByIdAndDelete(id);
};

export const TourTypeService = {
  createTourType,
  getAllTourTypes,
  updateTourType,
  deleteTourType,
};
