import useStore from "../store"

export const generateBishopMoves = (position: number) => {
  const file = position % 8 // file index (0 to 7)
  const rank = Math.floor(position / 8) // rank index (0 to 7)
  const possibleMoves = []
  const board = useStore.getState().board

  // Define the relative positions of all possible diagonal moves
  const diagonalMoves = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ]

  // Check each possible diagonal move
  for (const [dx, dy] of diagonalMoves) {
    for (let i = 1; i < 8; i++) {
      const newFile = file + i * dx
      const newRank = rank + i * dy

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

        // Stop further diagonal movement if the square is occupied
        if (board[newIndex].piece) {
          break
        }
      } else {
        // Stop further diagonal movement if the new position is out of bounds
        break
      }
    }
  }

  return possibleMoves
}
