import jsPDF from "jspdf";
import type { Invoice } from "@/types/invoices";

export const generateInvoicePdf = (invoice: Invoice) => {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("FAKTURA", 105, 30, { align: "center" });

  // Invoice number
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Cislo faktury: ${invoice.invoiceNumber}`, 20, 50);

  // Date
  const createdDate = new Date(invoice.createdAt).toLocaleDateString("sk-SK");
  doc.text(`Datum vystavenia: ${createdDate}`, 20, 60);

  if (invoice.dueDate) {
    const dueDate = new Date(invoice.dueDate).toLocaleDateString("sk-SK");
    doc.text(`Datum splatnosti: ${dueDate}`, 20, 70);
  }

  // Divider
  doc.setLineWidth(0.5);
  doc.line(20, 80, 190, 80);

  // Client info
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Odberatel", 20, 95);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(invoice.clientName, 20, 105);

  if (invoice.clientEmail) {
    doc.text(invoice.clientEmail, 20, 115);
  }

  // Divider
  doc.line(20, 130, 190, 130);

  // Description
  if (invoice.description) {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Popis", 20, 145);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const splitDescription = doc.splitTextToSize(invoice.description, 170);
    doc.text(splitDescription, 20, 155);
  }

  // Amount section
  doc.setFillColor(245, 245, 245);
  doc.rect(20, 200, 170, 30, "F");

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Suma na uhradu:", 25, 215);

  doc.setFontSize(18);
  doc.text(invoice.amount, 165, 215, { align: "right" });

  // Status
  const statusText = getStatusText(invoice.status);
  const statusColor = getStatusColor(invoice.status);

  doc.setFontSize(12);
  doc.setTextColor(statusColor.r, statusColor.g, statusColor.b);
  doc.text(`Stav: ${statusText}`, 25, 225);

  // Reset text color
  doc.setTextColor(0, 0, 0);

  // Footer
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.text("Dakujeme za Vasu doveru.", 105, 270, { align: "center" });

  // Open PDF in new tab
  const pdfBlob = doc.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, "_blank");
};

const getStatusText = (status: string): string => {
  switch (status) {
    case "paid":
      return "Zaplatena";
    case "sent":
      return "Odoslana";
    case "draft":
      return "Koncept";
    case "cancelled":
      return "Zrusena";
    default:
      return status;
  }
};

const getStatusColor = (status: string): { r: number; g: number; b: number } => {
  switch (status) {
    case "paid":
      return { r: 45, g: 206, b: 137 }; // green
    case "sent":
      return { r: 94, g: 142, b: 255 }; // blue
    case "draft":
      return { r: 160, g: 174, b: 192 }; // gray
    case "cancelled":
      return { r: 245, g: 54, b: 92 }; // red
    default:
      return { r: 0, g: 0, b: 0 };
  }
};
