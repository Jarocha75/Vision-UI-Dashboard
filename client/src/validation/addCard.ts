import { z } from "zod";

export const addCardSchema = z.object({
  cardholderName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  cardNumber: z
    .string()
    .min(16, "Card number must be 16 digits")
    .max(19, "Card number must be at most 19 characters")
    .regex(/^[0-9\s]+$/, "Card number can only contain digits"),
  expiryDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
      "Expiry date must be in MM/YY format"
    ),
  cvv: z
    .string()
    .min(3, "CVV must be at least 3 digits")
    .max(4, "CVV must be at most 4 digits")
    .regex(/^[0-9]+$/, "CVV can only contain digits"),
  type: z.enum(["visa", "mastercard"]),
});

export type AddCardFormData = z.infer<typeof addCardSchema>;
