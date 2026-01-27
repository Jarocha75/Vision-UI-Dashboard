/**
 * Vypočíta percentuálny progress z hodnoty
 * @param value aktuálna hodnota
 * @param max maximálna hodnota
 */

export const getProgress = (value: number, max: number): number => {
  if (max <= 0) return 0;

  return Math.min((value / max) * 100, 100);
};
