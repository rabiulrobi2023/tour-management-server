import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TourTypeService } from "./tourType.service";

const createTourType = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await TourTypeService.createTourType(data);
  sendResponse(res, {
    message: "Tour type created successfully",
    data: result,
  });
});

const getAllTourTypes = catchAsync(async (req, res) => {
  const result = await TourTypeService.getAllTourTypes();
  sendResponse(res, {
    message: "Tour types retrieved successfully",
    data: result,
  });
});

const updateTourType = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const result = await TourTypeService.updateTourType(id, name);
  sendResponse(res, {
    message: "Tour type updated successfully",
    data: result,
  });
});
const deleteTourType = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TourTypeService.deleteTourType(id);
  sendResponse(res, {
    message: "Tour type deleted successfully",
    data: result,
  });
});

export const TourTypeContrller = {
  createTourType,
  getAllTourTypes,
  updateTourType,
  deleteTourType,
};
