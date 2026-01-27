import { Bell, ShoppingCart, CreditCard, Package, type LucideIcon } from "lucide-react";

export type OrderType = "design" | "order" | "payment" | "system";

export interface Order {
  id: string;
  title: string;
  date: string;
  icon: LucideIcon;
  type: OrderType;
}

export const ordersData: Order[] = [
  {
    id: "1",
    title: "Design Changes",
    date: "Jan 9, 2014",
    icon: Bell,
    type: "design",
  },
  {
    id: "2",
    title: "New Order #1832412",
    date: "Jan 7, 2014",
    icon: ShoppingCart,
    type: "order",
  },
  {
    id: "3",
    title: "Server Payments for April",
    date: "July 20, 2014",
    icon: CreditCard,
    type: "payment",
  },
  {
    id: "4",
    title: "New card added for order",
    date: "July 20, 2014",
    icon: CreditCard,
    type: "payment",
  },
  {
    id: "5",
    title: "Unlock packages for development",
    date: "July 20, 2014",
    icon: Package,
    type: "system",
  },
  {
    id: "6",
    title: "New order #1832412",
    date: "July 20, 2014",
    icon: ShoppingCart,
    type: "order",
  },
];
