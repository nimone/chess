import useStore from "../store"

export const generateKingMoves = (position: number) => {
  const file = position % 8 // file index (0 to 7)
  const rank = Math.floor(position / 8) // rank index (0 to 7)
  const possibleMoves = []
  const board = useStore.getState().board
  // Define the relative positions of adjacent squares to the king
  const positions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    /*[0, 0],*/ [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ]

  // Check each adjacent square
  for (const [dx, dy] of positions) {
    const newFile = file + dx
    const newRank = rank + dy

    // Check if the new position is within the bounds of the board
    if (newFile >= 0 && newFile < 8 && newRank >= 0 && newRank < 8) {
      const newIndex = newRank * 8 + newFile

      // Check if the square is empty or occupied by an opponent's piece
      if (
        !board[newIndex].piece ||
        board[newIndex].piece?.color !== board[position].piece?.color
      ) {
        possibleMoves.push(newIndex)
      }
    }
  }

  return possibleMoves
}
