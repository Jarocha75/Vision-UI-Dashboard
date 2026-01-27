import { useTranslation } from "react-i18next";
import LineChart01 from "@/assets/charts/LineChart01.png";
import LineChart02 from "@/assets/charts/LineChart02.png";
import IconBattery01 from "@/assets/icons/IconBattery01.png";
import IconCar from "@/assets/icons/IconCar.png";

export const useMiniCardsData = () => {
  const { t } = useTranslation();

  return [
    {
      title: t("profilePage.batteryHealth"),
      value: "92%",
      icon: IconBattery01,
    },
    {
      title: t("profilePage.carStatus"),
      value: t("profilePage.active"),
      icon: IconCar,
    },
    {
      title: t("profilePage.energyUsage"),
      value: "45 kWh",
      icon: LineChart01,
    },
    {
      title: t("profilePage.performance"),
      value: t("profilePage.optimal"),
      icon: LineChart02,
    },
  ];
};
