import { useMemo } from "react";
import { searchablePages, type SearchResult } from "@/data/searchData";
import { authorsData } from "@/data/authorsData";
import { useProjectsData } from "@/data/projectsData";
import { billingsData } from "@/data/billingData";
import useTransactions from "@/hooks/transactions/useTransactions";
import useInvoices from "@/hooks/invoices/useInvoices";
import PersonIcon from "@mui/icons-material/Person";
import FolderIcon from "@mui/icons-material/Folder";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PaymentIcon from "@mui/icons-material/Payment";

export const useSearch = (query: string) => {
  const { data: transactions } = useTransactions();
  const { data: invoices } = useInvoices();
  const projectsData = useProjectsData();

  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim()) return [];

    const searchTerm = query.toLowerCase().trim();
    const searchResults: SearchResult[] = [];

    // Vyhľadávanie v stránkach
    searchablePages.forEach((page) => {
      const matchesTitle = page.title.toLowerCase().includes(searchTerm);
      const matchesKeywords = page.keywords.some((keyword) =>
        keyword.toLowerCase().includes(searchTerm),
      );

      if (matchesTitle || matchesKeywords) {
        searchResults.push({
          type: "page",
          title: page.title,
          subtitle: "Stránka",
          path: page.path,
          icon: page.icon,
        });
      }
    });

    // Vyhľadávanie v autoroch
    authorsData.forEach((author) => {
      const matchesName = author.fullName.toLowerCase().includes(searchTerm);
      const matchesEmail = author.email.toLowerCase().includes(searchTerm);
      const matchesFunction = author.function
        .toLowerCase()
        .includes(searchTerm);

      if (matchesName || matchesEmail || matchesFunction) {
        searchResults.push({
          type: "author",
          title: author.fullName,
          subtitle: `${author.function} - ${author.email}`,
          path: "/tables",
          image: author.image,
          icon: PersonIcon,
        });
      }
    });

    // Vyhľadávanie v projektoch
    projectsData.forEach((project) => {
      const matchesTitle = project.title.toLowerCase().includes(searchTerm);
      const matchesDescription = project.description
        .toLowerCase()
        .includes(searchTerm);

      if (matchesTitle || matchesDescription) {
        searchResults.push({
          type: "project",
          title: project.title,
          subtitle: project.description.substring(0, 50) + "...",
          path: "/profile",
          image: project.image,
          icon: FolderIcon,
        });
      }
    });

    // Vyhľadávanie v billing info
    billingsData.forEach((billing) => {
      const matchesName = billing.fullName.toLowerCase().includes(searchTerm);
      const matchesCompany = billing.company.toLowerCase().includes(searchTerm);
      const matchesEmail = billing.email.toLowerCase().includes(searchTerm);
      const matchesVat = billing.vatNumber.toLowerCase().includes(searchTerm);

      if (matchesName || matchesCompany || matchesEmail || matchesVat) {
        searchResults.push({
          type: "billing",
          title: billing.fullName,
          subtitle: `${billing.company} - ${billing.vatNumber}`,
          path: "/billing",
          icon: AccountBalanceWalletIcon,
        });
      }
    });

    // Vyhľadávanie vo faktúrach
    invoices?.forEach((invoice) => {
      const matchesNumber = invoice.invoiceNumber
        .toLowerCase()
        .includes(searchTerm);
      const matchesAmount = invoice.amount.toLowerCase().includes(searchTerm);
      const matchesClient = invoice.clientName.toLowerCase().includes(searchTerm);

      if (matchesNumber || matchesAmount || matchesClient) {
        const formattedDate = new Date(invoice.createdAt).toLocaleDateString("sk-SK");
        searchResults.push({
          type: "invoice",
          title: invoice.invoiceNumber,
          subtitle: `${invoice.clientName} - ${formattedDate} - ${invoice.amount}`,
          path: "/billing",
          icon: ReceiptIcon,
        });
      }
    });

    // Vyhľadávanie v transakciách
    transactions?.forEach((transaction) => {
      const matchesName = transaction.name.toLowerCase().includes(searchTerm);

      if (matchesName) {
        const amountStr =
          transaction.amount >= 0
            ? `+$${transaction.amount}`
            : `-$${Math.abs(transaction.amount)}`;
        const formattedDate = new Date(transaction.ISO).toLocaleDateString(
          "sk-SK",
        );
        searchResults.push({
          type: "transaction",
          title: transaction.name,
          subtitle: `${formattedDate} - ${amountStr}`,
          path: "/billing",
          icon: PaymentIcon,
        });
      }
    });

    return searchResults;
  }, [query, transactions, invoices, projectsData]);

  return {
    results,
    hasResults: results.length > 0,
    resultCount: results.length,
  };
};
