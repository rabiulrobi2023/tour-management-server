import httpStatus from "http-status-codes";
import mongoose from "mongoose";
import { Payment } from "./payment.model";
import { PAYMENT_STATUS } from "./payment.interface";
import { Booking } from "../booking/booking.model";
import { BOOKING_STATUS } from "../booking/booking.interface";
import AppError from "../../errors/AppError";
import { ISSLCommerz } from "../sslCommerz/sslcommerz.interface";
import { SSLService } from "../sslCommerz/sslCommerz.service";
import { User } from "../user/user.model";

const initPayment = async (bookingId: string) => {
  const isBookingExists = await Booking.findById(bookingId);

  if (!isBookingExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
  }
  const payment = await Payment.findOne({ booking: bookingId });
  if (!payment) {
    throw new AppError(httpStatus.NOT_FOUND, "Payment not found");
  }

  const user = await User.findById(isBookingExists.user);

  const sslPayload: ISSLCommerz = {
    name: user?.name as string,
    email: user?.email as string,
    phone: user?.phone as string,
    address: user?.address as string,
    transactionId: payment?.transactionId,
    amount: payment.amount,
  };
  const sslPayment = await SSLService.sslPaymentInit(sslPayload);
  return sslPayment;
};

const successPayment = async (query: Record<string, string>) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const updatePayment = await Payment.findOneAndUpdate(
      {
        transactionId: query.transactionId,
      },
      { staus: PAYMENT_STATUS.PAID },
      { runValidators: true, session }
    );
    await Booking.findOneAndUpdate(
      updatePayment?.booking,
      {
        status: BOOKING_STATUS.COMPLETED,
      },
      { session }
    );

    await session.commitTransaction();
    session.endSession();
    return {
      success: true,
      message: "Payment completed successfully",
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
const failPayment = async (query: Record<string, string>) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const updatePayment = await Payment.findOneAndUpdate(
      {
        transactionId: query.transactionId,
      },
      { staus: PAYMENT_STATUS.FAILED },
      { runValidators: true, session }
    );
    await Booking.findOneAndUpdate(
      updatePayment?.booking,
      {
        status: BOOKING_STATUS.FAILED,
      },
      { runValidators: true, session }
    );

    await session.commitTransaction();
    session.endSession();
    return {
      success: false,
      message: "Payment failed",
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
const cancelPayment = async (query: Record<string, string>) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const updatePayment = await Payment.findOneAndUpdate(
      {
        transactionId: query.transactionId,
      },
      { staus: PAYMENT_STATUS.CANCELLED },
      { runValidators: true, session }
    );
    await Booking.findOneAndUpdate(
      updatePayment?.booking,
      {
        status: BOOKING_STATUS.CANCELLED,
      },
      { session }
    );

    await session.commitTransaction();
    session.endSession();
    return {
      success: false,
      message: "Payment cancelled",
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const PaymentService = {
  initPayment,
  successPayment,
  failPayment,
  cancelPayment,
};
