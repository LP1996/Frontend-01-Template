function convertNumberToString(number, radix = 10) {
  const maxFractionLength = 10
  let integer = Math.floor(number)
  let fraction = number - integer
  let string = ''

  while (integer > 0) {
    string = String(integer % radix) + string
    integer = Math.floor(integer / radix)
  }

  // 会有精度丢失
  let fractionStr = ''
  while ((fraction !== 1 || fraction !== 0) && fractionStr.length <= maxFractionLength) {
    const computed = fraction * radix
    const integer = computed > 1 ? Math.floor(computed) : 0
    fractionStr += integer
    fraction = computed > 1 ? computed - Math.floor(computed) : fraction
  }
  return fraction ? `${string}.${fractionStr}` : string
}

function convertStringToNumber(string, radix = 10) {
  const hasNoNumberRe = /[^\d\.a-zA-Z\-]/

  // a -> 97    0 ->  48
  const nonNumberShouldDecreaseValue = 87
  const numberShouldDescreaseValue = 48
  const map = {
    'Infinity': Infinity,
    '-Infinity': -Infinity,
  }

  if (hasNoNumberRe.test(string)) {
    return NaN
  }

  if (map[string]) {
    return map[string]
  }

  // TODO: 考虑对进制最高对应字母的限制

  const chars = string.split('')
  const isNegative = chars[0] === '-'
  let number = 0
  let i = isNegative ? 1 : 0

  while (i < chars.length && chars[i] != '.') {
    number = number * radix
    const lowerCaseChar = chars[i].toLowerCase()
    const isCharNonNumber = lowerCaseChar >= 'a'
    const descreaseValue = isCharNonNumber ? nonNumberShouldDecreaseValue : numberShouldDescreaseValue
    number += lowerCaseChar.codePointAt(0) - descreaseValue
    i++
  }

  if (chars[i] === '.') {
    i++
  }

  let fraction = 1

  while (i < chars.length) {
    fraction /= radix
    const lowerCaseChar = chars[i].toLowerCase()
    const isCharNonNumber = lowerCaseChar >= 'a'
    const descreaseValue = isCharNonNumber ? nonNumberShouldDecreaseValue : numberShouldDescreaseValue
    number += (lowerCaseChar.codePointAt(0) - descreaseValue) * fraction
    i++
  }

  return number * (isNegative ? -1 : 1)
}