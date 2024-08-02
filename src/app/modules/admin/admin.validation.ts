import { z } from "zod";

export const loginAdminValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(4).max(30),
  }),
});
