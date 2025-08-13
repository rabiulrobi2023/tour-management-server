import { Router } from "express";
import { TourTypeContrller } from "./tourType.controller";

const router = Router();

router.post(
  "/create",

  TourTypeContrller.createTourType
);
router.patch("/:id", TourTypeContrller.updateTourType);
router.get("/", TourTypeContrller.getAllTourTypes);
router.delete("/:id", TourTypeContrller.deleteTourType);

export const TourTypeRoutes = router;
