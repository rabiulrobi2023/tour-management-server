import {
  IAuthProvider,
  IUser,
  Role,
  Status,
} from "../modules/user/user.ifterface";
import { User } from "../modules/user/user.model";
import { envVariable } from "../config/envConfig";
import { passwordHashing } from "./passwordHashing";

const seedSuperAdmin = async () => {
  const hashPass = await passwordHashing(envVariable.SUPER_ADMIN_PASS);
  const superAdminAuthProvider: IAuthProvider = {
    provider: "credential",
    providerId: envVariable.SUPER_ADMIN_EAMIL,
  };

  const superUser: Partial<IUser> = {
    name: "Super Admin",
    email: envVariable.SUPER_ADMIN_EAMIL,
    password: hashPass,
    role: Role.superAdmin,
    isDeleted: false,
    status: Status.active,
    auths: [superAdminAuthProvider],

  };
  const isSuperAdminExists = await User.findOne({ role: superUser.role });
  if (!isSuperAdminExists) {
    await User.create(superUser);
  }
};
export default seedSuperAdmin;
