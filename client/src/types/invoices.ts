export interface Invoice {
  id: number;
  invoiceNumber: string;
  clientName: string;
  clientEmail?: string;
  amount: string;
  status: "draft" | "sent" | "paid" | "cancelled";
  dueDate?: string;
  description?: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}
