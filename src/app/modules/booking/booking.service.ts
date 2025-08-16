import AppError from "../../errors/AppError";
import { Payment } from "../payment/payment.model";
import { Tour } from "../tour/tour.model";
import { User } from "../user/user.model";
import { IBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import httpStatus from "http-status-codes";
import { generateTransactionId } from "./booking.utils";
import mongoose from "mongoose";

const createBooking = async (payload: Partial<IBooking>, userId: string) => {
  const user = await User.findById(userId);
  if (!user?.phone || !user.address) {
    throw new AppError(httpStatus.BAD_REQUEST, "User profile uncomplete");
  }
  const tour = await Tour.findById(payload.tour).select("costFrom");
  if (!tour) {
    throw new AppError(httpStatus.NOT_FOUND, "Tour not found");
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const booking = await Booking.create([{ ...payload, user: userId }], {
      session,
    });

    if (!tour?.costFrom) {
      throw new AppError(httpStatus.BAD_REQUEST, "No tour cost found");
    }
    if (!payload.guestCount) {
      throw new AppError(httpStatus.BAD_REQUEST, "Guest number is rquired");
    }
    const amount = Number(tour.costFrom) * payload.guestCount;
    const transactionId = await generateTransactionId();

    const payment = await Payment.create(
      [
        {
          booking: booking[0]._id,
          amount: Number(amount),
          transactionId: transactionId,
        },
      ],
      { session }
    );

    const updatedBooking = await Booking.findByIdAndUpdate(
      booking[0]._id,
      {
        payment: payment[0]._id,
      },
      { new: true, runValidators: true, session }
    )
      .populate("user", "name email phone address")
      .populate("tour", "title description loaction startDate endDate division")
      .populate("payment", "transactionId invoiceUrl status amount");
    await session.commitTransaction();
    session.endSession();
    return updatedBooking;
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw error;
  }
};
export const BookingService = {
  createBooking,
};
