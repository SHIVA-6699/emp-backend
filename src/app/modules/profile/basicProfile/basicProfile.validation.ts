import { z } from "zod";
import {
  addressValidationSchema,
  updateAddressValidationSchema,
} from "../../address/address.validation";
import { Role } from "../../user/user.constant";

export const createBasicProfileValidationSchema = z.object({
  body: z.object({
    first_name: z.string(),
    last_name: z.string(),
    phone_number: z.string().optional(),
    current_address: addressValidationSchema.optional(),
    permanent_address: addressValidationSchema.optional(),
    profile_image: z.unknown().optional(),
  }),
});
export const updateBasicProfileValidationSchema = z.object({
  body: z.object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    phone_number: z.string().optional(),
    current_address: updateAddressValidationSchema.optional(),
    permanent_address: updateAddressValidationSchema.optional(),
    profile_image: z.unknown().optional(),
  }),
});

export const switchMyRoleValidationSchema = z.object({
  body: z.object({
    roleToSwitch: z.enum(Object.values(Role) as [string, ...string[]]),
  }),
});
