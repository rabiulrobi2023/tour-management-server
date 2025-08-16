import { Payment } from "../payment/payment.model";

export const generateTransactionId = async () => {
  const fullDate = new Date();
  const year = fullDate.getFullYear().toString();
  const month = (fullDate.getMonth() + 1).toString().padStart(2, "0");
  const day = fullDate.getDate().toString().padStart(2, "0");

  let lastFourDigitOfTnxId = "0001";
  const lastTnxId = await Payment.findOne()
    .sort("-createdAt")
    .select("transactionId");
  const existingLastFourDigit = Number(lastTnxId?.transactionId.slice(-4));
  if (lastTnxId) {
    lastFourDigitOfTnxId = (existingLastFourDigit + 1)
      .toString()
      .padStart(4, "0");
  }

  const newTransactionId = `TNX${year}${month}${day}${lastFourDigitOfTnxId}`;
  return newTransactionId;
};
