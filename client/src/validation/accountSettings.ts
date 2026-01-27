import { z } from "zod";

export const accountSettingsSchema = z.object({
  name: z
    .string()
    .min(3, "Meno musí mať minimálne 3 znaky")
    .max(50, "Meno môže mať maximálne 50 znakov"),
  userName: z
    .string()
    .min(3, "Užívateľské meno musí mať min. 3 znaky.")
    .max(20, "Užívateľské meno môže mať max. 20 znakov")
    .regex(/^[a-zA-Z0-9_]+$/, "Použite písmená, čísla a podčiarkovník"),
  phoneNumber: z
    .string()
    .regex(
      /^\+421\s\d{3}\s\d{3}\s\d{3}$/,
      "Neplatné slovenské telefónne číslo (formát: +421 123 456 789)"
    )
    .optional()
    .or(z.literal("")),
});

export type AccountSettingsFormData = z.infer<typeof accountSettingsSchema>;
