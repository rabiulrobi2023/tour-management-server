import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoute } from "../modules/auth/auth.route";
import { DivisionRoutes } from "../modules/division/division.routes";
import { TourTypeRoutes } from "../modules/tourType/tourType.routes";
import { TourRoutes } from "../modules/tour/tour.routes";
import { BookingRoutes } from "../modules/booking/booking.route";
import { PaymentRoutes } from "../modules/payment/payment.route";

export const router = Router();
export type TModleRotues = {
  path: string;
  route: Router;
}[];

const moduleRoutes: TModleRotues = [
  { path: "/user", route: UserRoutes },
  { path: "/auth", route: AuthRoute },
  { path: "/division", route: DivisionRoutes },
  { path: "/tour-type", route: TourTypeRoutes },
  { path: "/tour", route: TourRoutes },
  { path: "/booking", route: BookingRoutes },
  { path: "/payment", route: PaymentRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
