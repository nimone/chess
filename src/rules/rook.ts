import useStore from "../store"

export const generateRookMoves = (position: number) => {
  const file = position % 8 // file index (0 to 7)
  const rank = Math.floor(position / 8) // rank index (0 to 7)
  const possibleMoves = []
  const board = useStore.getState().board

  // Define the relative positions of all possible moves along the ranks and files
  const directions = [
    [-1, 0],
    [1, 0], // horizontal
    [0, -1],
    [0, 1], // vertical
  ]

  // Check each direction for possible moves
  for (const [dx, dy] of directions) {
    let newFile = file + dx
    let newRank = rank + dy

    // Keep moving in the same direction until an obstacle is encountered
    while (newFile >= 0 && newFile < 8 && newRank >= 0 && newRank < 8) {
      const newIndex = newRank * 8 + newFile

      // If the square is empty, add it as a possible move
      if (!board[newIndex].piece) {
        possibleMoves.push(newIndex)
      } else {
        // If the square is occupied by an opponent's piece, add it as a possible move and stop further movement in this direction
        if (board[newIndex].piece?.color !== board[position].piece?.color) {
          possibleMoves.push(newIndex)
        }
        break
      }

      // Move further in the same direction
      newFile += dx
      newRank += dy
    }
  }

  return possibleMoves
}
