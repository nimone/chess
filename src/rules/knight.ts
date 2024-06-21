import useStore from "../store"

export const generateKnightMoves = (position: number) => {
  const file = position % 8 // file index (0 to 7)
  const rank = Math.floor(position / 8) // rank index (0 to 7)
  const possibleMoves = []
  const board = useStore.getState().board

  // Define the relative positions of all possible knight moves
  const knightMoves = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ]

  // Check each possible knight move
  for (const [dx, dy] of knightMoves) {
    const newFile = file + dx
    const newRank = rank + dy

    // Check if the new position is within the bounds of the board
    if (newFile >= 0 && newFile < 8 && newRank >= 0 && newRank < 8) {
      const newIndex = newRank * 8 + newFile

      // Check if the square is empty or occupied by an opponent's piece
      if (
        board[newIndex].piece === null ||
        board[newIndex].piece?.color !== board[position].piece?.color
      ) {
        possibleMoves.push(newIndex)
      }
    }
  }

  return possibleMoves
}
