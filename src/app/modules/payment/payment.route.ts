import { Router } from "express";
import { PaymentContrller } from "./payment.controller";

const router = Router();

router.post("/success", PaymentContrller.successPayment);
router.post("/fail", PaymentContrller.failPayment);
router.post("/cancel", PaymentContrller.cancelPayment);
router.post("/init-payment/:id",PaymentContrller.initPayment)
export const PaymentRoutes = router;
