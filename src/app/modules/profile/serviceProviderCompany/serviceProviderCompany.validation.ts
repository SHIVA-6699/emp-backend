import { z } from "zod";
// create ServiceProviderCompany validation schema
export const createServiceProviderCompanyValidationSchema = z.object({
  body: z.object({}),
});
