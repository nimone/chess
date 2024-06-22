import { useState } from "react"
import { chess } from "../lib/chess"
import { Square } from "chess.js"
import ChessBoardSquare from "./ChessBoardSquare"
import clsx from "clsx"

export default function ChessBoard() {
  const [board, setBoard] = useState(chess.board())
  const [selected, setSelected] = useState<Square>()
  const [moves, setMoves] = useState<Square[]>([])
  const [prevMove, setPrevMove] = useState<{ from: Square; to: Square } | null>(
    null
  )

  const handleSquareSelect = (square: Square) => {
    const piece = chess.get(square)
    if (piece?.color === chess.turn()) {
      setSelected(square)
      setMoves(chess.moves({ square, verbose: true }).map((move) => move.to))
    }
  }
  const handleMove = (from: Square, to: Square) => {
    chess.move({ from, to })
    setBoard(chess.board())
    setPrevMove({ from, to })
    setMoves([])
    setSelected(undefined)
  }

  return (
    <div className="sm:p-4 max-w-[100vh]">
      <div className="rounded shadow sm:p-4 bg-white">
        <div className="grid grid-cols-8 sm:border">
          {board.map((row, i) =>
            row.map((piece, j) => {
              const position = (String.fromCharCode("a".charCodeAt(0) + j) +
                (8 - i)) as Square
              const isPossibleMove = moves.includes(position)
              const isTurn = piece?.color === chess.turn()
              const canMove = selected && isPossibleMove

              return (
                <ChessBoardSquare
                  key={position}
                  onDragOver={(e) => {
                    e.preventDefault()
                    if (canMove) e.currentTarget.classList.add("hue-rotate-60")
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault()
                    if (canMove)
                      e.currentTarget.classList.remove("hue-rotate-60")
                  }}
                  onDropCapture={() => {
                    if (canMove) handleMove(selected, position)
                  }}
                  position={position}
                  isPossibleMove={isPossibleMove}
                  className={clsx(
                    "transition-colors",
                    selected === position && "hue-rotate-60",
                    (prevMove?.from === position || prevMove?.to == position) &&
                      "hue-rotate-60",
                    isTurn || isPossibleMove
                      ? "cursor-pointer hover:bg-opacity-90"
                      : "pointer-events-none"
                  )}
                  onClick={() => {
                    if (canMove) handleMove(selected, position)
                    else handleSquareSelect(position)
                  }}
                >
                  {piece && (
                    <img
                      className="p-0.5 md:p-2"
                      onDragStart={(e) => {
                        if (!isTurn) e.preventDefault()
                        handleSquareSelect(position)
                      }}
                      src={`/assets/chess-pieces/${
                        piece.color + piece.type
                      }.svg`}
                    />
                  )}
                </ChessBoardSquare>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
