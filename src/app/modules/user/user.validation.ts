import { z } from "zod";
import { Role, Status } from "./user.ifterface";

const createUserValidationSchema = z.object({
  name: z
    .string({ invalid_type_error: "First must be string" })
    .min(2, { message: "Name too short" })
    .max(50, { message: "Name too long" }),
  email: z.string().email({ message: "Input must be email.type" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters long" })
    // .regex(/[a-z]/, {
    //   message: "Password must contain at least one lowercase letter",
    // })
    // .regex(/[A-Z]/, {
    //   message: "Password must contain at least one uppercase letter",
    // })
    // .regex(/\d/, { message: "Password must contain at least one number" })
    // .regex(/[!@#$%^&*]/, {
    //   message:
    //     "Password must contain at least one special character (!@#$%^&*)",
    // })
    .optional(),

  phone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, {
      message:
        "Invalid Bangladeshi phone number (must start with 01 and be 11 digits)",
    })
    .optional(),
  address: z.string().optional(),
});

const userUpdateValidationSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name must be string" })
    .min(2, { message: "Name too short" })
    .max(50, { message: "Name too long" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters long" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[!@#$%^&*]/, {
      message:
        "Password must contain at least one special character (!@#$%^&*)",
    }),

  phone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, {
      message:
        "Invalid Bangladeshi phone number (must start with 01 and be 11 digits)",
    })
    .optional(),
  address: z.string().optional(),

  role: z.enum(Object.values(Role) as [string]),

  picture: z.string(),

  isDeleted: z.boolean({ invalid_type_error: "Value must be true or false" }),
  status: z.enum(Object.values(Status) as [string], {
    invalid_type_error: "Value must be block, active",
  }),
});

export const UserValidations = {
  createUserValidationSchema,
  userUpdateValidationSchema,
};
