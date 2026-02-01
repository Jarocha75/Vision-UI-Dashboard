import type { User } from "@/context/authContext";
import type { Billing } from "@/data/billingData";
import type { Invoice } from "@/types/invoices";
import type { PaymentMethod } from "@/types/paymentMethod";
import type { Transaction } from "@/types/transactions";

// Demo User
export const demoUser: User = {
  id: "demo-user-1",
  email: "demo@example.com",
  name: "John Demo",
  avatar: undefined,
};

// Extended profile for demo user
export interface DemoUserProfile extends User {
  phoneNumber?: string;
  userName?: string;
  displayName?: string;
  bio?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  whatsup?: string;
}

export const demoUserProfile: DemoUserProfile = {
  ...demoUser,
  phoneNumber: "+421 900 123 456",
  userName: "johndemo",
  displayName: "John Demo",
  bio: "Software developer passionate about building great user experiences. This is a demo account to showcase the dashboard features.",
  location: "Bratislava, Slovakia",
  website: "https://example.com",
  linkedin: "https://linkedin.com/in/johndemo",
  github: "https://github.com/johndemo",
  whatsup: "+421 900 123 456",
};

// Demo Transactions
export const demoTransactions: Transaction[] = [
  {
    id: "txn-1",
    name: "Netflix Subscription",
    ISO: new Date().toISOString(),
    amount: 12.99,
    type: "charge",
    description: "Monthly streaming subscription",
    category: "Entertainment",
  },
  {
    id: "txn-2",
    name: "Salary Deposit",
    ISO: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    amount: 3500.0,
    type: "deposit",
    description: "Monthly salary",
    category: "Income",
  },
  {
    id: "txn-3",
    name: "Amazon Purchase",
    ISO: new Date(Date.now() - 86400000 * 2).toISOString(),
    amount: 89.99,
    type: "charge",
    description: "Electronics",
    category: "Shopping",
  },
  {
    id: "txn-4",
    name: "Freelance Payment",
    ISO: new Date(Date.now() - 86400000 * 3).toISOString(),
    amount: 750.0,
    type: "deposit",
    description: "Web development project",
    category: "Income",
  },
  {
    id: "txn-5",
    name: "Electricity Bill",
    ISO: new Date(Date.now() - 86400000 * 5).toISOString(),
    amount: 85.5,
    type: "pending",
    description: "Monthly utility bill",
    category: "Utilities",
  },
  {
    id: "txn-6",
    name: "Grocery Store",
    ISO: new Date(Date.now() - 86400000 * 7).toISOString(),
    amount: 156.32,
    type: "charge",
    description: "Weekly groceries",
    category: "Food",
  },
  {
    id: "txn-7",
    name: "Gas Station",
    ISO: new Date(Date.now() - 86400000 * 10).toISOString(),
    amount: 45.0,
    type: "charge",
    description: "Fuel",
    category: "Transportation",
  },
];

// Demo Invoices
export const demoInvoices: Invoice[] = [
  {
    id: 1,
    invoiceNumber: "INV-2024-001",
    clientName: "Acme Corporation",
    clientEmail: "billing@acme.com",
    amount: "2500.00",
    status: "paid",
    dueDate: new Date(Date.now() - 86400000 * 30).toISOString(),
    description: "Web Development Services - January 2024",
    userId: 1,
    createdAt: new Date(Date.now() - 86400000 * 45).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 30).toISOString(),
  },
  {
    id: 2,
    invoiceNumber: "INV-2024-002",
    clientName: "TechStart Inc.",
    clientEmail: "finance@techstart.io",
    amount: "1800.00",
    status: "sent",
    dueDate: new Date(Date.now() + 86400000 * 15).toISOString(),
    description: "Mobile App Consultation",
    userId: 1,
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
  {
    id: 3,
    invoiceNumber: "INV-2024-003",
    clientName: "Design Studio",
    clientEmail: "hello@designstudio.sk",
    amount: "950.00",
    status: "draft",
    dueDate: new Date(Date.now() + 86400000 * 30).toISOString(),
    description: "UI/UX Design Review",
    userId: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    invoiceNumber: "INV-2024-004",
    clientName: "Global Services Ltd.",
    clientEmail: "accounts@globalservices.com",
    amount: "3200.00",
    status: "paid",
    dueDate: new Date(Date.now() - 86400000 * 60).toISOString(),
    description: "System Integration Project",
    userId: 1,
    createdAt: new Date(Date.now() - 86400000 * 90).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 60).toISOString(),
  },
];

// Demo Payment Methods
export const demoPaymentMethods: PaymentMethod[] = [
  {
    id: "card-1",
    type: "visa",
    cardNumber: "4532 **** **** 1234",
    expiryDate: "12/26",
    cardholderName: "John Demo",
    isDefault: true,
  },
  {
    id: "card-2",
    type: "mastercard",
    cardNumber: "5425 **** **** 5678",
    expiryDate: "08/25",
    cardholderName: "John Demo",
    isDefault: false,
  },
];

// Demo Billing Information
export const demoBillings: Billing[] = [
  {
    id: "billing-1",
    fullName: "John Demo",
    company: "Demo Company s.r.o.",
    email: "john@democompany.sk",
    vatNumber: "SK2024567890",
  },
  {
    id: "billing-2",
    fullName: "Demo Business",
    company: "Demo Business Inc.",
    email: "billing@demobusiness.com",
    vatNumber: "US123456789",
  },
];
