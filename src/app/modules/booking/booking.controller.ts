/* eslint-disable @typescript-eslint/no-unused-vars */
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { BookingService } from "./booking.service";

const createBooking = catchAsync(async (req, res, next) => {
  const userId = req.user as JwtPayload;
  const bookingData = req.body;
  const result = await BookingService.createBooking(bookingData, userId.id);
  sendResponse(res, {
    message: "Booking create successfully",
    data: result,
  });
});

export const BookingContrller = {
  createBooking,
};
