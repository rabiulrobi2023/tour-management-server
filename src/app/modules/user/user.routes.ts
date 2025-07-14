import { Router } from "express";
import { UserController } from "./user.controller";
import { validationRequest } from "../../milddlewire/validationRequest";
import { UserValidations } from "./user.validation";

const router = Router();

router.post(
  "/register",
  validationRequest(UserValidations.createUserValidationSchema),
  UserController.createuser
);
router.post("/all-users", UserController.getAllUsers);

export const UserRoutes = router;
