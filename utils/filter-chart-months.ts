/**
 * Round 1: the Monthly Revenue chart used to plot all 12 months of the
 * selected year, so in October 2026 it already showed November and
 * December 2026. Future months carry no revenue yet and must not be
 * plotted. Past years keep all months; the current year keeps months
 * up to and including the current month; future years plot nothing.
 */
const MONTH_ORDER = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function filterChartMonths(
  graphData: { [key: string]: number }[],
  year: string,
): { [key: string]: number }[] {
  const now = new Date();
  const yearNum = Number(year);
  if (!Number.isFinite(yearNum)) return graphData;
  if (yearNum > now.getFullYear()) return [];
  if (yearNum < now.getFullYear()) return graphData;
  const currentMonthIndex = now.getMonth();
  return graphData.filter((data) => {
    const month = Object.keys(data)[0];
    const index = MONTH_ORDER.indexOf(month);
    return index === -1 || index <= currentMonthIndex;
  });
}
