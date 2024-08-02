import { z } from "zod";

export const registrationValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(4).max(30),
  }),
});

export const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(4).max(30),
  }),
});

export const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string(),
  }),
});
