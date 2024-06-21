import useStore from "../store"

export const generatePawnMoves = (
  position: number,
  color: "white" | "black"
) => {
  const file = position % 8 // file index (0 to 7)
  const rank = Math.floor(position / 8) // rank index (0 to 7)
  const possibleMoves = []
  const board = useStore.getState().board

  // Define direction of pawn movement based on color
  const direction = color === "white" ? -1 : 1

  // Check if pawn can move one square forward
  const forwardOne = (rank + direction) * 8 + file
  if (!board[forwardOne].piece) {
    possibleMoves.push(forwardOne)
  }

  // Check if pawn can move two squares forward (only on initial move)
  if ((color === "white" && rank === 6) || (color === "black" && rank === 1)) {
    const forwardTwo = (rank + 2 * direction) * 8 + file
    if (!board[forwardTwo].piece && !board[forwardOne].piece) {
      possibleMoves.push(forwardTwo)
    }
  }

  // Check for diagonal captures
  const leftDiagonal = (rank + direction) * 8 + (file - 1)
  const rightDiagonal = (rank + direction) * 8 + (file + 1)
  if (
    file > 0 &&
    board[leftDiagonal].piece &&
    board[leftDiagonal].piece?.color !== color
  ) {
    possibleMoves.push(leftDiagonal)
  }
  if (
    file < 7 &&
    board[rightDiagonal].piece &&
    board[rightDiagonal].piece?.color !== color
  ) {
    possibleMoves.push(rightDiagonal)
  }

  return possibleMoves
}
