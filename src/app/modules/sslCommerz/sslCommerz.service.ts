import httpStatus from "http-status-codes";
import { envVariable } from "../../config/envConfig";
import AppError from "../../errors/AppError";
import { ISSLCommerz } from "./sslcommerz.interface";
import axios from "axios";

const sslPaymentInit = async (payload: ISSLCommerz) => {
  try {
    const data = {
      store_id: envVariable.SSL.SSL_STORE_ID,
      store_passwd: envVariable.SSL.SSL_STORE_PASS,

      total_amount: payload.amount,
      currency: "BDT",
      tran_id: payload.transactionId,

      success_url: `${envVariable.SSL.SSL_BACKEND_SECCESS_URL}?transactionId=${payload.transactionId}&amount=${payload.amount}&status=success`,
      fail_url: `${envVariable.SSL.SSL_BACKEND_FAIL_URL}?transactionId=${payload.transactionId}&amount=${payload.amount}&status=fail`,
      cancel_url:`${envVariable.SSL.SSL_BACKEND_CANCEL_URL}?transactionId=${payload.transactionId}&amount=${payload.amount}&status=cancel`,
      cus_name: payload.name,
      cus_email: payload.email,
      cus_add1: payload.address,
      cus_add2: "N/A",
      cus_city: "N/A",
      cus_state: "N/A",
      cus_postcode: "N/A",
      cus_country: "Bangladesh",
      cus_phone: payload.phone,
      cus_fax: "N/A",

      product_name: "Service",
      product_category: "general",
      product_profile: "general",
      shipping_method: "NO",

      ship_name: "N/A",
      ship_add1: "N/A",
      ship_add2: "N/A",
      ship_city: "N/A",
      ship_state: "N/A",
      ship_postcode: "N/A",
      ship_country: "Bangladesh",

      value_a: "N/A",
      value_b: "N/A",
      value_c: "N/A",
      value_d: "N/A",
    };
    const response = await axios({
      method: "POST",
      url: envVariable.SSL.SSL_PAYMENT_API,
      data: data,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    const reslult = response.data;
    return reslult;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

export const SSLService = {
  sslPaymentInit,
};
