import { Chess } from "chess.js"

const globalForChess = globalThis as unknown as {
  chess: Chess | undefined
}
export const chess = globalForChess.chess ?? new Chess()

if (import.meta.env.DEV) globalForChess.chess = chess
