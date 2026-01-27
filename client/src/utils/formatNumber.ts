export const formatNumberShort = (value: number): string => {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000)
      .toFixed(2)
      .replace(".", ",")
      .replace(/,00$/, "")}m`;
  }

  if (value >= 1_000) {
    return `${(value / 1_000)
      .toFixed(1)
      .replace(".", ",")
      .replace(/,0$/, "")}k`;
  }

  return value.toString();
};
