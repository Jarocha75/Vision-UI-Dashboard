import Author01 from "@/assets/author/author01.png";
import Author02 from "@/assets/author/author02.png";
import Author03 from "@/assets/author/author03.png";
import Author04 from "@/assets/author/author04.png";
import Author05 from "@/assets/author/author05.png";
import Author06 from "@/assets/author/author06.png";

export interface Author {
  image: string;
  fullName: string;
  email: string;
  function: string;
  organization: string;
  status: "Online" | "Offline";
  employed: string;
}

export const authorsData: Author[] = [
  {
    image: Author01,
    fullName: "Esthera Jackson",
    email: "esthera@simmmple.com",
    function: "Manager",
    organization: "Organization",
    status: "Online",
    employed: "14/06/21",
  },
  {
    image: Author02,
    fullName: "Alexa Liras",
    email: "alexa@simmmple.com",
    function: "Programmer",
    organization: "Developer",
    status: "Offline",
    employed: "14/06/21",
  },
  {
    image: Author03,
    fullName: "Laurent Michael",
    email: "laurent@simmmple.com",
    function: "Executive",
    organization: "Projects",
    status: "Online",
    employed: "14/06/21",
  },
  {
    image: Author04,
    fullName: "Freduardo Hill",
    email: "freduardo@simmmple.com",
    function: "Manager",
    organization: "Organization",
    status: "Online",
    employed: "14/06/21",
  },
  {
    image: Author05,
    fullName: "Daniel Thomas",
    email: "daniel@simmmple.com",
    function: "Programmer",
    organization: "Developer",
    status: "Offline",
    employed: "14/06/21",
  },
  {
    image: Author06,
    fullName: "Mark Willson",
    email: "mark@simmmple.com",
    function: "Designer",
    organization: "UI/UX Design",
    status: "Offline",
    employed: "14/06/21",
  },
];
