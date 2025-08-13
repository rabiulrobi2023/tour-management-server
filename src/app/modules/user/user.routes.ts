import { Router } from "express";
import { UserController } from "./user.controller";
import { validationRequest } from "../../milddlewire/validationRequest";
import { UserValidations } from "./user.validation";

import { Role } from "./user.ifterface";
import checkAuth from "../../milddlewire/checkAuth";

const router = Router();

router.post(
  "/register",
  validationRequest(UserValidations.createUserValidationSchema),
  UserController.createuser
);
router.get(
  "/all-users",
  checkAuth(Role.admin, Role.superAdmin),
  UserController.getAllUsers
);
router.get("/:id", UserController.getSingleUser);
router.patch(
  "/:id",
  validationRequest(UserValidations.userUpdateValidationSchema),
  checkAuth(...Object.values(Role)),
  UserController.updateUser
);

export const UserRoutes = router;
