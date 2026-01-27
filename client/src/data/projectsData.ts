import { useTranslation } from "react-i18next";
import Avatar01 from "@/assets/avatars/Avatar01.jpg";
import Avatar02 from "@/assets/avatars/Avatar02.jpg";
import Avatar03 from "@/assets/avatars/Avatar03.jpg";
import Avatar04 from "@/assets/avatars/Avatar04.jpg";
import Avatar05 from "@/assets/avatars/Avatar05.jpg";
import Picture02 from "@/assets/image/Picture02.png";
import Picture03 from "@/assets/image/Picture03.png";
import Picture04 from "@/assets/image/Picture04.png";

export interface Project {
  id: number;
  title: string;
  description: string;
  image?: string;
  avatars: string[];
}

export const useCardContent = () => {
  const { t } = useTranslation();

  return {
    title: t("profilePage.projectsTitle"),
    description: t("profilePage.projectsDescription"),
  };
};

export const useProjectsData = (): Project[] => {
  const { t } = useTranslation();

  return [
    {
      id: 1,
      title: t("profilePage.projectModern"),
      description: t("profilePage.projectModernDesc"),
      image: Picture02,
      avatars: [Avatar01, Avatar02, Avatar03, Avatar04],
    },
    {
      id: 2,
      title: t("profilePage.projectScandinavian"),
      description: t("profilePage.projectScandinavianDesc"),
      image: Picture03,
      avatars: [Avatar02, Avatar03, Avatar04, Avatar05],
    },
    {
      id: 3,
      title: t("profilePage.projectMinimalist"),
      description: t("profilePage.projectMinimalistDesc"),
      image: Picture04,
      avatars: [Avatar05, Avatar04, Avatar03, Avatar02],
    },
  ];
};
