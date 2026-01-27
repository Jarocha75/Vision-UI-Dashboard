export type TransactionType = "charge" | "deposit" | "pending";

export interface Transaction {
  id: string;
  name: string;
  ISO: string;
  amount: number;
  type: TransactionType;
  description?: string;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
}
