import { z } from "zod";

export const createCustomerValidationSchema = z.object({
  body: z.object({}),
});
