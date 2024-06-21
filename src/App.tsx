import { useState } from "react"
import { ChessPiece, ChessSquare } from "./pieces"
import { generateRookMoves } from "./rules/rook"
import useStore from "./store"
import { generatePawnMoves } from "./rules/pawn"
import { generateKnightMoves } from "./rules/knight"
import { generateBishopMoves } from "./rules/bishop"
import { generateQueenMoves } from "./rules/queen"
import { generateKingMoves } from "./rules/king"
import Square from "./components/Square"

export default function App() {
  const [selected, setSelected] = useState<ChessSquare>()
  const [moves, setMoves] = useState<number[]>([])
  const store = useStore()

  const handleSquareSelect = (index: number, square: ChessSquare) => {
    if (square.piece && store.turn === square.piece?.color) {
      // console.log("Piece Selected", square.piece, index)
      setSelected(square)
      generateMove(square.piece.player, square.piece.color, index)
    } else if (selected) {
      if (moves.includes(index)) {
        // console.log("Move", index, selected.piece, selected)
        store.movePiece(selected.position, index)
        store.toggleTurn()
      }
      setSelected({ position: index, piece: undefined })
      setMoves([])
    }
  }

  const generateMove = (
    player: ChessPiece["player"],
    color: ChessPiece["color"],
    position: number
  ) => {
    let moves: number[] = []
    switch (player) {
      case "pawn":
        moves = generatePawnMoves(position, color)
        break
      case "rook":
        moves = generateRookMoves(position)
        break
      case "bishop":
        moves = generateBishopMoves(position)
        break
      case "knight":
        moves = generateKnightMoves(position)
        break
      case "queen":
        moves = generateQueenMoves(position)
        break
      case "king":
        moves = generateKingMoves(position)
        break
    }
    // console.log("Moves:", moves)
    setMoves(moves)
  }

  return (
    <main className="h-screen grid p-4 bg-gray-50">
      <div className="aspect-square mx-auto max-w-full lg:max-w-screen-lg rounded shadow p-4 bg-white">
        <div className="grid grid-cols-8 border">
          {store.board.map((square, i) => {
            const isMove = moves.includes(i)
            const isTurnColor = square.piece?.color === store.turn
            return (
              <Square
                key={square.position}
                position={i}
                isPossibleMove={isMove}
                isTurnColor={isTurnColor}
                className={selected?.position === i ? "hue-rotate-60" : ""}
                onClick={() => {
                  if (isTurnColor || isMove) handleSquareSelect(i, square)
                }}
              >
                {square.piece && (
                  <img
                    src={square.piece.img}
                    className="w-full min-w-8 max-w-20 aspect-square z-10"
                  />
                )}
              </Square>
            )
          })}
        </div>
      </div>
    </main>
  )
}
