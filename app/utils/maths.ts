export const round = (number: number, decimalPlaces: number): number => {
  if (decimalPlaces >= 0) {
    const factorOfTen = Math.pow(10, decimalPlaces)
    return Math.round(number * factorOfTen) / factorOfTen
  }
}
