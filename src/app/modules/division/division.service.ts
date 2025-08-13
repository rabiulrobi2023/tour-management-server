import httpStatus from "http-status-codes";
import AppError from "../../errors/AppError";
import { IDivieson } from "./division.interface";
import { Division } from "./division.model";

const createDivision = async (payload: Partial<IDivieson>) => {
  const isDivisionExist = await Division.findOne({ name: payload.name });

  if (isDivisionExist) {
    throw new AppError(httpStatus.CONFLICT, "Division already exists");
  }

  const slug = `${payload.name?.toLowerCase()}-'division`;
  payload.slug = slug;
  const result = await Division.create(payload);
  return result;
};

const updateDivision = async (id: string, payload: Partial<IDivieson>) => {
  const isDivisonExist = await Division.findById(id);

  if (!isDivisonExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Division is not exist");
  }

  const isDivisionDuplicate = await Division.findOne({
    _id: { $ne: id },
    name: payload.name,
  });

  if (isDivisionDuplicate) {
    throw new AppError(
      httpStatus.CONFLICT,
      "The division of this name is already exist"
    );
  }

  const slug = `${payload.name?.toLowerCase()}-division`;
  payload.slug = slug;
  const result = await Division.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const getAllDivision = async () => {
  const result = await Division.find();
  return result;
};

const getSingleDivision = async (id: string) => {
  const result = await Division.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  return result;
};

const deleteDivision = async (id: string) => {
  const isDivisionExist = await Division.findById(id);
  if (!isDivisionExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found to delete");
  }
  await Division.findByIdAndDelete(id);
  return null;
};

export const DivisionService = {
  createDivision,
  updateDivision,
  getAllDivision,
  getSingleDivision,
  deleteDivision,
};
