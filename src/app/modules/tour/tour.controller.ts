import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TourService } from "./tour.service";

const createTour = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await TourService.createTour(data);
  sendResponse(res, {
    message: "Tour created successfully",
    data: result,
  });
});

const updateTour = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await TourService.updateTour(id, data);
  sendResponse(res, {
    message: "Tour update successfully",
    data: result,
  });
});

const getAllTour = catchAsync(async(req,res)=>{
  const query = req.query
  const result = await TourService.getAllTour(query as Record<string,string>)
  sendResponse( res,{
    message: "Tours retrived successfully",
    data: result
  })
})
export const TourContrller = {
  createTour,
  updateTour,
  getAllTour
};
