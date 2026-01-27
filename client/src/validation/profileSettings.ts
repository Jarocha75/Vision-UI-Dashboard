import { z } from "zod";

export const profileSettingsSchema = z.object({
  displayName: z
    .string("Meno je povinné!")
    .min(3, "Meno musí mať min. 3 znaky")
    .max(30, "Meno môže mať max. 30 znakov"),
  bio: z
    .string()
    .max(500, "Bio môže mať max. 500 znakov")
    .optional()
    .or(z.literal("")),
  location: z
    .string()
    .max(100, "Lokácia môže mať max. 100 znakov")
    .optional()
    .or(z.literal("")),
  website: z.string().url("http:/localhost:5173").optional().or(z.literal("")),
  linkedin: z.string().optional().or(z.literal("")),
  github: z.string().optional().or(z.literal("")),
  whatsup: z.string().optional().or(z.literal("")),
});

export type ProfileSettingsFormData = z.infer<typeof profileSettingsSchema>;
