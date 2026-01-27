export interface ThemeOption {
  value: string;
  label: string;
}

export interface LanguageOption {
  value: string;
  label: string;
}

export interface TimezoneOption {
  value: string;
  label: string;
}

export interface DateFormatOption {
  value: string;
  label: string;
}

export interface FontSizeOption {
  value: string;
  label: string;
}

export const themeOptions: ThemeOption[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System Default" },
];

export const languageOptions: LanguageOption[] = [
  { value: "en", label: "English" },
  { value: "sk", label: "Slovenčina" },
];

export const timezoneOptions: TimezoneOption[] = [
  { value: "europe/bratislava", label: "(GMT+01:00) Bratislava" },
  { value: "europe/prague", label: "(GMT+01:00) Prague" },
  { value: "europe/berlin", label: "(GMT+01:00) Berlin" },
  { value: "europe/london", label: "(GMT+00:00) London" },
  { value: "america/new_york", label: "(GMT-05:00) New York" },
];

export const dateFormatOptions: DateFormatOption[] = [
  { value: "dd/mm/yyyy", label: "DD/MM/YYYY" },
  { value: "mm/dd/yyyy", label: "MM/DD/YYYY" },
  { value: "yyyy-mm-dd", label: "YYYY-MM-DD" },
];

export const fontSizeOptions: FontSizeOption[] = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
  { value: "extra-large", label: "Extra Large" },
];

export interface PreferencesDefaults {
  theme: string;
  compactMode: boolean;
  language: string;
  timezone: string;
  dateFormat: string;
  reducedMotion: boolean;
  highContrast: boolean;
  fontSize: string;
}

export const preferencesDefaults: PreferencesDefaults = {
  theme: "dark",
  compactMode: true,
  language: "en",
  timezone: "europe/bratislava",
  dateFormat: "dd/mm/yyyy",
  reducedMotion: false,
  highContrast: false,
  fontSize: "medium",
};
