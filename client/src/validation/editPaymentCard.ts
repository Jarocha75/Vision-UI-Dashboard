import { z } from "zod";

export const editCardSchema = z.object({
  cardholderName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  expiryDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
      "Expiry date must be in MM/YY format",
    ),
  type: z.enum(["visa", "mastercard"]),
});

export type EditCardFormData = z.infer<typeof editCardSchema>;
