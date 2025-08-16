import { z } from "zod";

const creteBookingValidationSchema = z.object({
  tour: z.string(),
  guestCount: z
    .number({ invalid_type_error: "Number of guset must be number" })
    .min(0, { message: "Guest number can not be negative" })
    .max(10, "Guest number maximum 10"),
});

export const BookingValidation = {
  creteBookingValidationSchema,
};
