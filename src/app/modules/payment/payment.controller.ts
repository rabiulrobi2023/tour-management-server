/* eslint-disable @typescript-eslint/no-unused-vars */
import { envVariable } from "../../config/envConfig";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { PaymentService } from "./payment.service";

const initPayment = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  const result = await PaymentService.initPayment(userId);
  sendResponse(res, {
    message: "SSL payment initiated",
    data: {
      paymentGatewayUrl: result.GatewayPageURL,
    },
  });
});

const successPayment = catchAsync(async (req, res, next) => {
  const query = req.query;
  const result = await PaymentService.successPayment(
    query as Record<string, string>
  );
  if (result.success) {
    res.redirect(
      `${envVariable.SSL.SSL_FRONTEND_SECCESS_URL}?transactionId=${query.transactionId}&amount=${query.amount}&status=${query.status}`
    );
  }
});
const failPayment = catchAsync(async (req, res, next) => {
  const query = req.query;
  const result = await PaymentService.failPayment(
    query as Record<string, string>
  );
  if (!result.success) {
    res.redirect(
      `${envVariable.SSL.SSL_FRONTEND_FAIL_URL}?transactionId=${query.transactionId}&amount=${query.amount}&status=${query.status}`
    );
  }
});
const cancelPayment = catchAsync(async (req, res, next) => {
  const query = req.query;
  const result = await PaymentService.cancelPayment(
    query as Record<string, string>
  );
  if (!result.success) {
    res.redirect(
      `${envVariable.SSL.SSL_FRONTEND_CANCEL_URL}?transactionId=${query.transactionId}&amount=${query.amount}&ststus=${query.status}`
    );
  }
});

export const PaymentContrller = {
  initPayment,
  successPayment,
  failPayment,
  cancelPayment,
};
