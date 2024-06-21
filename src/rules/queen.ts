import { generateBishopMoves } from "./bishop"
import { generateRookMoves } from "./rook"

export const generateQueenMoves = (position: number) => [
  ...generateRookMoves(position),
  ...generateBishopMoves(position),
]
