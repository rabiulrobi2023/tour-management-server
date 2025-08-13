import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

import { DivisionService } from "./division.service";

const createDivision = catchAsync(async (req, res) => {
  const divisionData = req.body;
  const result = await DivisionService.createDivision(divisionData);
  sendResponse(res, {
    message: "Division Created Successfully",
    data: result,
  });
});

const updateDivision = catchAsync(async (req, res) => {
  const id = req.params.id;
  const divisionData = req.body;
  const result = await DivisionService.updateDivision(id, divisionData);
  sendResponse(res, {
    message: "Division update successfully",
    data: result,
  });
});

const getAllDivision = catchAsync(async (req, res) => {
  const result = await DivisionService.getAllDivision();
  sendResponse(res, {
    message: "Division retrived successfully",
    data: result,
  });
});

const getSingleDivision = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await DivisionService.getSingleDivision(id);
  sendResponse(res, {
    message: "Division retrived Successfully",
    data: result,
  });
});

const deleteDivision = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await DivisionService.deleteDivision(id);
  sendResponse(res, {
    message: "Division delete successfull",
    data: result,
  });
});

export const DivisionContrller = {
  createDivision,
  updateDivision,
  getSingleDivision,
  getAllDivision,
  deleteDivision,
};
