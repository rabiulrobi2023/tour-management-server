import { Router } from "express";
import { TourContrller } from "./tour.controller";
import checkAuth from "../../milddlewire/checkAuth";
import { Role } from "../user/user.ifterface";


const router = Router();

router.post(
  "/create",
  checkAuth(Role.superAdmin, Role.admin),
  TourContrller.createTour
);
router.patch(
  "/:id",
  checkAuth(Role.superAdmin, Role.admin),
  TourContrller.updateTour
);

router.get("/", checkAuth(Role.superAdmin, Role.admin), TourContrller.getAllTour);
export const TourRoutes = router;
