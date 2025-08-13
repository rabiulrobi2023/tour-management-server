import { Router } from "express";
import { DivisionContrller } from "./division.controller";
import { validationRequest } from "../../milddlewire/validationRequest";
import { DivisionValidation } from "./division.validation";

const router = Router();

router.post(
  "/create",
  validationRequest(DivisionValidation.createDivisionSchema),
  DivisionContrller.createDivision
);
router.patch("/:id", DivisionContrller.updateDivision);
router.get("/", DivisionContrller.getAllDivision);
router.get("/:id", DivisionContrller.getSingleDivision);
router.delete("/:id", DivisionContrller.deleteDivision);

export const DivisionRoutes = router;
