import { z } from "zod";
// create Investor validation schema
export const createInvestorValidationSchema = z.object({
  body: z.object({}),
});
