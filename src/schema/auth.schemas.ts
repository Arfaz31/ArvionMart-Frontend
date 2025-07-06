import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(16, "Password must not exceed 16 characters"),
  contactNumber: z
    .string({
      required_error: "Mobile number is required",
    })
    .regex(/^\d+$/, { message: "Mobile number must be a valid number" }) // Ensures only digits
    .min(10, { message: "Mobile number must be at least 10 digits" })
    .max(15, { message: "Mobile number must not exceed 15 digits" }),

  address: z.string().min(2, "Address must be at least 2 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(5, "Password must be at least 5 characters long")
    .max(16, "Password must not exceed 16 characters"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const resetPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(16, "Password must not exceed 16 characters"),
});
export const changePasswordSchema = z.object({
  oldPassword: z.string({
    required_error: "Old password is required",
  }),
  newPassword: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(16, "Password must not exceed 16 characters"),
});
