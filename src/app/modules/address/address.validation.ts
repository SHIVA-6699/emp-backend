import { z } from "zod";

export const addressValidationSchema = z.object({
  country: z.string(),
  city: z.string(),
  state: z.string(),
  address_line: z.string(),
  zip_code: z.string(),
});

export const updateAddressValidationSchema = z.object({
  country: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  address_line: z.string().optional(),
  zip_code: z.string().optional(),
});
