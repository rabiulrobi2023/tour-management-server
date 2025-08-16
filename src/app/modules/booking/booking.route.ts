import { Router } from "express";
import { BookingContrller } from "./booking.controller";
import { validationRequest } from "../../milddlewire/validationRequest";
import { BookingValidation } from "./booking.validation";
import checkAuth from "../../milddlewire/checkAuth";
import { Role } from "../user/user.ifterface";

const router = Router();
router.post(
  "/",checkAuth(...Object.values(Role)),
  validationRequest(BookingValidation.creteBookingValidationSchema),
  BookingContrller.createBooking
);

export const BookingRoutes = router;
