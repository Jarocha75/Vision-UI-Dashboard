export interface PaymentMethod {
  id: string;
  type: "mastercard" | "visa";
  cardNumber: string;
  expiryDate?: string;
  cardholderName?: string;
  isDefault?: boolean;
}

export interface CreatePaymentMethodPayload {
  type: "mastercard" | "visa";
  cardNumber: string;
  expiryDate: string;
  cardholderName: string;
}
