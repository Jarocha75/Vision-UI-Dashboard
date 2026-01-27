import { z } from "zod";

export const transactionSchema = z.object({
  name: z.string().min(1, "Názov je povinný").max(100, "Názov je príliš dlhý"),
  amount: z
    .number({ message: "Suma musí byť číslo" })
    .positive("Suma musí byť kladná"),
  type: z.enum(["charge", "deposit", "pending"], {
    message: "Vyberte typ transakcie",
  }),
  description: z.string().max(500, "Popis je príliš dlhý").optional(),
  category: z.string().max(50, "Kategória je príliš dlhá").optional(),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;
