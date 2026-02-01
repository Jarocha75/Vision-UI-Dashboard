import type { Billing } from "@/data/billingData";
import type { Invoice } from "@/types/invoices";
import type { PaymentMethod } from "@/types/paymentMethod";
import type { Transaction } from "@/types/transactions";
import {
  demoBillings,
  demoInvoices,
  demoPaymentMethods,
  demoTransactions,
  demoUser,
  demoUserProfile,
  type DemoUserProfile,
} from "./mockData";

// Storage keys for persisting demo data changes
const STORAGE_KEYS = {
  transactions: "demo_transactions",
  invoices: "demo_invoices",
  paymentMethods: "demo_payment_methods",
  billings: "demo_billings",
  userProfile: "demo_user_profile",
} as const;

// Helper to get data from localStorage or use defaults
function getStoredData<T>(key: string, defaultData: T[]): T[] {
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultData;
    }
  }
  return defaultData;
}

// Helper to save data to localStorage
function saveData<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

// Generate unique ID
function generateId(): string {
  return `demo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Mock API handlers
export const mockApi = {
  // Auth
  getMe: async () => {
    await simulateDelay();
    return demoUser;
  },

  // User Profile
  getUserProfile: async (): Promise<DemoUserProfile> => {
    await simulateDelay();
    const stored = localStorage.getItem(STORAGE_KEYS.userProfile);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return demoUserProfile;
      }
    }
    return demoUserProfile;
  },

  updateUserProfile: async (
    data: Partial<DemoUserProfile>
  ): Promise<DemoUserProfile> => {
    await simulateDelay();
    const current = await mockApi.getUserProfile();
    const updated = { ...current, ...data };
    localStorage.setItem(STORAGE_KEYS.userProfile, JSON.stringify(updated));
    return updated;
  },

  uploadAvatar: async (_file: File): Promise<{ avatar: string }> => {
    await simulateDelay(500);
    // In demo mode, we just return a placeholder
    return { avatar: "https://i.pravatar.cc/150?u=demo" };
  },

  // Transactions
  getTransactions: async (): Promise<Transaction[]> => {
    await simulateDelay();
    return getStoredData(STORAGE_KEYS.transactions, demoTransactions);
  },

  createTransaction: async (
    data: Omit<Transaction, "id">
  ): Promise<Transaction> => {
    await simulateDelay();
    const transactions = getStoredData(
      STORAGE_KEYS.transactions,
      demoTransactions
    );
    const newTransaction: Transaction = {
      ...data,
      id: generateId(),
    };
    transactions.unshift(newTransaction);
    saveData(STORAGE_KEYS.transactions, transactions);
    return newTransaction;
  },

  updateTransaction: async (
    id: string,
    data: Partial<Transaction>
  ): Promise<Transaction> => {
    await simulateDelay();
    const transactions = getStoredData(
      STORAGE_KEYS.transactions,
      demoTransactions
    );
    const index = transactions.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new Error("Transaction not found");
    }
    transactions[index] = { ...transactions[index], ...data };
    saveData(STORAGE_KEYS.transactions, transactions);
    return transactions[index];
  },

  deleteTransaction: async (id: string): Promise<void> => {
    await simulateDelay();
    const transactions = getStoredData(
      STORAGE_KEYS.transactions,
      demoTransactions
    );
    const filtered = transactions.filter((t) => t.id !== id);
    saveData(STORAGE_KEYS.transactions, filtered);
  },

  // Invoices
  getInvoices: async (): Promise<Invoice[]> => {
    await simulateDelay();
    return getStoredData(STORAGE_KEYS.invoices, demoInvoices);
  },

  createInvoice: async (data: Omit<Invoice, "id">): Promise<Invoice> => {
    await simulateDelay();
    const invoices = getStoredData(STORAGE_KEYS.invoices, demoInvoices);
    const newInvoice: Invoice = {
      ...data,
      id: Math.max(0, ...invoices.map((i) => i.id)) + 1,
    };
    invoices.unshift(newInvoice);
    saveData(STORAGE_KEYS.invoices, invoices);
    return newInvoice;
  },

  updateInvoice: async (
    id: number,
    data: Partial<Invoice>
  ): Promise<Invoice> => {
    await simulateDelay();
    const invoices = getStoredData(STORAGE_KEYS.invoices, demoInvoices);
    const index = invoices.findIndex((i) => i.id === id);
    if (index === -1) {
      throw new Error("Invoice not found");
    }
    invoices[index] = { ...invoices[index], ...data };
    saveData(STORAGE_KEYS.invoices, invoices);
    return invoices[index];
  },

  deleteInvoice: async (id: number): Promise<void> => {
    await simulateDelay();
    const invoices = getStoredData(STORAGE_KEYS.invoices, demoInvoices);
    const filtered = invoices.filter((i) => i.id !== id);
    saveData(STORAGE_KEYS.invoices, filtered);
  },

  // Payment Methods
  getPaymentMethods: async (): Promise<PaymentMethod[]> => {
    await simulateDelay();
    return getStoredData(STORAGE_KEYS.paymentMethods, demoPaymentMethods);
  },

  createPaymentMethod: async (
    data: Omit<PaymentMethod, "id">
  ): Promise<PaymentMethod> => {
    await simulateDelay();
    const methods = getStoredData(
      STORAGE_KEYS.paymentMethods,
      demoPaymentMethods
    );
    const newMethod: PaymentMethod = {
      ...data,
      id: generateId(),
    };
    methods.push(newMethod);
    saveData(STORAGE_KEYS.paymentMethods, methods);
    return newMethod;
  },

  updatePaymentMethod: async (
    id: string,
    data: Partial<PaymentMethod>
  ): Promise<PaymentMethod> => {
    await simulateDelay();
    const methods = getStoredData(
      STORAGE_KEYS.paymentMethods,
      demoPaymentMethods
    );
    const index = methods.findIndex((m) => m.id === id);
    if (index === -1) {
      throw new Error("Payment method not found");
    }
    methods[index] = { ...methods[index], ...data };
    saveData(STORAGE_KEYS.paymentMethods, methods);
    return methods[index];
  },

  deletePaymentMethod: async (id: string): Promise<void> => {
    await simulateDelay();
    const methods = getStoredData(
      STORAGE_KEYS.paymentMethods,
      demoPaymentMethods
    );
    const filtered = methods.filter((m) => m.id !== id);
    saveData(STORAGE_KEYS.paymentMethods, filtered);
  },

  // Billings
  getBillings: async (): Promise<Billing[]> => {
    await simulateDelay();
    return getStoredData(STORAGE_KEYS.billings, demoBillings);
  },

  updateBilling: async (id: string, data: Partial<Billing>): Promise<Billing> => {
    await simulateDelay();
    const billings = getStoredData(STORAGE_KEYS.billings, demoBillings);
    const index = billings.findIndex((b) => b.id === id);
    if (index === -1) {
      throw new Error("Billing not found");
    }
    billings[index] = { ...billings[index], ...data };
    saveData(STORAGE_KEYS.billings, billings);
    return billings[index];
  },

  deleteBilling: async (id: string): Promise<void> => {
    await simulateDelay();
    const billings = getStoredData(STORAGE_KEYS.billings, demoBillings);
    const filtered = billings.filter((b) => b.id !== id);
    saveData(STORAGE_KEYS.billings, filtered);
  },
};

// Simulate network delay for realistic feel
function simulateDelay(ms = 200): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Clear all demo data from localStorage
export function clearDemoData(): void {
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
}
