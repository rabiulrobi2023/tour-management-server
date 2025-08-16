/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from "mongoose";
export enum PAYMENT_STATUS {
  PAID = "PAID",
  UNPAID = "UNPAID",
  CANCELLED = "CANCELLED",
  FAILED = "PAILED",
  REFUNDED = "REFUNDED",
}

export interface IPayment {
  booking: Types.ObjectId;
  transactionId: string;
  amount: number;
  paymentGateWayData?: any;
  invoiceUrl?: string;
  staus: PAYMENT_STATUS;
}
