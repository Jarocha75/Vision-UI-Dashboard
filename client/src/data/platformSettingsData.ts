import { useTranslation } from "react-i18next";

export interface SettingItem {
  id: string;
  label: string;
  checked: boolean;
}

export interface Settings {
  account: SettingItem[];
  application: SettingItem[];
}

export const useInitialSettings = (): Settings => {
  const { t } = useTranslation();

  return {
    account: [
      { id: "follow", label: t("profilePage.emailWhenFollows"), checked: true },
      {
        id: "answer",
        label: t("profilePage.emailWhenAnswers"),
        checked: false,
      },
      {
        id: "mention",
        label: t("profilePage.emailWhenMentions"),
        checked: true,
      },
    ],
    application: [
      { id: "launches", label: t("profilePage.newLaunches"), checked: false },
      { id: "products", label: t("profilePage.monthlyUpdates"), checked: false },
      { id: "subscribe", label: t("profilePage.subscribeNewsletter"), checked: true },
      { id: "receive", label: t("profilePage.receiveMailsWeekly"), checked: true },
    ],
  };
};
