export function numberToDollars(number: number) {
  const splitNumber = number.toString().split('.')
  const convertedNumber =
    '$' + splitNumber[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return splitNumber[1]
    ? convertedNumber + '.' + splitNumber[1]
    : convertedNumber
}
