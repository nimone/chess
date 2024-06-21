import { create } from "zustand"
import { ChessSquare, getNewChessBoard } from "./pieces"

interface State {
  board: ChessSquare[]
  turn: "black" | "white"
}

interface Mutations {
  setBoard: (board: ChessSquare[]) => void
  movePiece: (fromIdx: number, toIdx: number) => void
  toggleTurn: () => void
}

const initialState: State = {
  turn: "white",
  board: getNewChessBoard(),
}

const useStore = create<State & Mutations>()((set) => ({
  ...initialState,
  setBoard: (board) => set({ board }),
  resetBoard: () => set({ board: getNewChessBoard() }),
  movePiece: (fromIdx, toIdx) =>
    set((state) => {
      const board = [...state.board]
      board[toIdx].piece = board[fromIdx].piece
      board[fromIdx].piece = undefined
      return { board }
    }),
  toggleTurn: () =>
    set((state) => ({ turn: state.turn === "white" ? "black" : "white" })),
}))

export default useStore
