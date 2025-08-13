import httpStatus from "http-status-codes";
import AppError from "../../errors/AppError";
import { ITour } from "./tour.interface";
import { Tour } from "./tour.model";
import { Division } from "../division/division.model";
import { TourType } from "../tourType/tourType.model";
import { tourSearchableField } from "./tour.constant";

import { QueryBuilder } from "../../utils/QueryBuilder";

const createTour = async (payload: Partial<ITour>) => {
  const isTourExist = await Tour.findOne({ title: payload.title });

  if (isTourExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      "The tour with this title is already exists"
    );
  }

  const isDivisionExixts = await Division.findById(payload.division);
  if (!isDivisionExixts) {
    throw new AppError(httpStatus.NOT_FOUND, "Division does not exists");
  }

  const isTourTypeExists = await TourType.findById(payload.tourType);
  if (!isTourTypeExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Tour type does not exists");
  }

  const slug = payload.title?.toLowerCase().split(" ").join("-");
  payload.slug = slug;
  const result = await Tour.create(payload);
  return result;
};

const updateTour = async (id: string, payload: Partial<ITour>) => {
  const isTourExist = await Tour.findById(id);
  if (!isTourExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Tour not found");
  }

  const isTourTitleMatched = await Tour.findOne({
    title: payload.title,
    _id: { $ne: id },
  });

  if (isTourTitleMatched) {
    throw new AppError(
      httpStatus.CONFLICT,
      "The tour title is matched with another tour title"
    );
  }

  const isDivisionExixts = await Division.findById(payload.division);
  if (payload.division && !isDivisionExixts) {
    throw new AppError(httpStatus.NOT_FOUND, "Division does not exists");
  }

  const isTourTypeExists = await TourType.findById(payload.tourType);
  if (payload.tourType && !isTourTypeExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Tour type does not exists");
  }
  const slug = payload.title?.toLowerCase().split(" ").join("-");
  payload.slug = slug;

  const result = await Tour.findByIdAndUpdate(id, payload, { new: true });

  return result;
};

/*const getAllTour = async (query: Record<string, string>) => {
  const filter = { ...query };
  for (const field of excludedField) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete filter[field];
  }
  const serchTerm = query.searchTerm || "";

  // const searchQuery = {
  //   $or: [
  //     { title: { $regex: serchTerm, $options: "i" } },
  //     { description: { $regex: serchTerm, $options: "i" } },
  //   ]
  // };

  const searchQuery = {
    $or: tourSearchableField.map((field) => ({
      [field]: { $regex: serchTerm, $options: "i" },
    })),
  };

  const sort = query.sort || "-createdAt";

  const fields = query.fields?.split(",").join(" ") || "";

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 30;
  const skip = (page - 1) * limit;

  const result = await Tour.find(filter)
    .find(searchQuery)
    .sort(sort)
    .select(fields)
    .skip(skip)
    .limit(limit);
  if (result.length < 1) {
    throw new AppError(httpStatus.NOT_FOUND, "Nothing founded");
  }

  const totalDoc = await Tour.countDocuments();
  const totalPage = Math.ceil(totalDoc / limit);

  const meta = {
    page,
    limit,
    totalDoc,
    totalPage,
  };
  return {
    data: result,
    meta,
  };
}; */

const getAllTour = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Tour.find(), query);

  const tours = await queryBuilder.filter().search(tourSearchableField).sort();

  const [data, meta] = await Promise.all([
    tours.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

export const TourService = {
  createTour,
  updateTour,
  getAllTour,
};
