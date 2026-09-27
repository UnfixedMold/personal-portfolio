export function getStartYear(period: string) {
  const year = Number(period.slice(0, 4))

  return year
}
