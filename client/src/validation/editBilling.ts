import { z } from "zod";

export const billingSchema = z.object({
  fullName: z
    .string()
    .min(2, "Meno musí mať minimálne 2 znaky")
    .max(50, "Meno môže mať maximálne 50 znakov"),
  company: z
    .string()
    .min(2, "Názov spoločnosti musí mať minimálne 2 znaky")
    .max(100, "Názov spoločnosti môže mať maximálne 100 znakov"),
  email: z.string().email("Neplatný formát emailu").min(1, "Email je povinný"),
  vatNumber: z
    .string()
    .min(3, "DIČ musí mať minimálne 3 znaky")
    .max(20, "DIČ môže mať maximálne 20 znakov")
    .regex(
      /^[A-Z]{2,3}[0-9A-Z]+$/,
      "DIČ musí začínať 2-3 veľkými písmenami a pokračovať číslami alebo písmenami"
    ),
});

export type BillingFormData = z.infer<typeof billingSchema>;
