export const algebraicToIndex = (algebraicNotation: string) => {
  const file = algebraicNotation.charCodeAt(0) - "a".charCodeAt(0)
  const rank = 8 - parseInt(algebraicNotation[1])
  return rank * 8 + file
}

export const indexToAlgebraic = (index: number) =>
  indexToFile(index) + indexToRank(index)

export const indexToFile = (index: number) =>
  String.fromCharCode("a".charCodeAt(0) + (index % 8))

export const indexToRank = (index: number) => String(8 - Math.floor(index / 8))
