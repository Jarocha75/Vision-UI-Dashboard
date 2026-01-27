export interface Billing {
  id: string;
  fullName: string;
  company: string;
  email: string;
  vatNumber: string;
}

export const billingsData: Billing[] = [
  {
    id: "01",
    fullName: "Oliver Liam",
    company: "Viking Burrito",
    email: "oliver@burrito.com",
    vatNumber: "FRB123456",
  },
  {
    id: "02",
    fullName: "Jaroslav Pecha",
    company: "Commando Company",
    email: "jarocha75@gmail.com",
    vatNumber: "FRB234567",
  },
  {
    id: "03",
    fullName: "Peter Novak",
    company: "Dummy Company",
    email: "peter.novak@gmail.com",
    vatNumber: "FRB765432",
  },
];
