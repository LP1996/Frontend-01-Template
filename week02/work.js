// 匹配 Number 直接量
function matchNumberLiteral(str) {
  const reg = /-?\d*(\.\d*)?/g
  return str.match(reg)
}

function utf8_encode(str) {
  const ranges = [
    [0x00000000, 0x0000007f],
    [0x00000080, 0x000007ff],
    [0x00000800, 0x0000ffff],
    [0x00010000, 0x0010ffff]
  ]

  // 参考阮一峰博客
  const processorMap = {
    0: function(binaryStr) {
      // 0xxxxxxx
      return `0${binaryStr}`
    },
    1: function(binaryStr) {
      // 110xxxxx 10xxxxxx
      const firstByte = `110${binaryStr.slice(0, 5)}`
      const secondByte = `10${binaryStr.slice(-6)}`

      return `${firstByte}${secondByte}`
    },
    2: function(binaryStr) {
      // 1110xxxx 10xxxxxx 10xxxxxx
      const firstByte = `1110${binaryStr.slice(0, 4)}`
      const secondByte = `10${binaryStr.slice(4, 10)}`
      const thirdByte = `10${binaryStr.slice(-6)}`

      return `${firstByte}${secondByte}${thirdByte}`
    },
    3: function(binaryStr) {
      // 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
      const firstByte = `11110${binaryStr.slice(0, 3)}`
      const secondByte = `10${binaryStr.slice(3, 9)}`
      const thirdByte = `10${binaryStr.slice(9, 15)}`
      const fourthByte = `10${binaryStr.slice(-6)}`

      return `${firstByte}${secondByte}${thirdByte}${fourthByte}`
    }
  }

  const padZeros = '0000000000000000'
  let result = ''

  for (let i = 0; i < str.length; i++) {
    const codePoint = str.codePointAt(i)
    const belongRangeIndex = ranges.findIndex(([start, end]) => codePoint >= start && codePoint <= end)

    // 左边补零，未考虑超出 BMP 范围情况
    const binaryCodePoint = (padZeros + codePoint.toString(2)).slice(-16)
    const utf8Str = processorMap[belongRangeIndex](binaryCodePoint)
    result += utf8Str
  }

  return result
}

function matchStringLiteral(str) {
  const reg = /("|')([\u0000-\uffff]*)("|')/
  return str.match(reg)
}