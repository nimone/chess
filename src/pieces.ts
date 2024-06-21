export type ChessPiece = {
  player: "pawn" | "rook" | "knight" | "bishop" | "queen" | "king"
  color: "white" | "black"
  img: string
  initialPosition: number
}
export type ChessSquare = {
  piece?: ChessPiece
  position: number
}

export const getNewChessBoard = () => {
  const board: ChessSquare[] = []
  for (let i = 0; i < 64; i++) board[i] = { position: i }
  for (const piece of chessPieces) board[piece.initialPosition].piece = piece
  return board
}

export const chessPieces: ChessPiece[] = [
  {
    player: "rook",
    color: "black",
    img: "/assets/chess-pieces/bR.svg",
    initialPosition: 0,
  },
  {
    player: "knight",
    color: "black",
    img: "/assets/chess-pieces/bN.svg",
    initialPosition: 1,
  },
  {
    player: "bishop",
    color: "black",
    img: "/assets/chess-pieces/bB.svg",
    initialPosition: 2,
  },
  {
    player: "queen",
    color: "black",
    img: "/assets/chess-pieces/bQ.svg",
    initialPosition: 3,
  },
  {
    player: "king",
    color: "black",
    img: "/assets/chess-pieces/bK.svg",
    initialPosition: 4,
  },
  {
    player: "bishop",
    color: "black",
    img: "/assets/chess-pieces/bB.svg",
    initialPosition: 5,
  },
  {
    player: "knight",
    color: "black",
    img: "/assets/chess-pieces/bN.svg",
    initialPosition: 6,
  },
  {
    player: "rook",
    color: "black",
    img: "/assets/chess-pieces/bR.svg",
    initialPosition: 7,
  },
  {
    player: "pawn",
    color: "black",
    img: "/assets/chess-pieces/bP.svg",
    initialPosition: 8,
  },
  {
    player: "pawn",
    color: "black",
    img: "/assets/chess-pieces/bP.svg",
    initialPosition: 9,
  },
  {
    player: "pawn",
    color: "black",
    img: "/assets/chess-pieces/bP.svg",
    initialPosition: 10,
  },
  {
    player: "pawn",
    color: "black",
    img: "/assets/chess-pieces/bP.svg",
    initialPosition: 11,
  },
  {
    player: "pawn",
    color: "black",
    img: "/assets/chess-pieces/bP.svg",
    initialPosition: 12,
  },
  {
    player: "pawn",
    color: "black",
    img: "/assets/chess-pieces/bP.svg",
    initialPosition: 13,
  },
  {
    player: "pawn",
    color: "black",
    img: "/assets/chess-pieces/bP.svg",
    initialPosition: 14,
  },
  {
    player: "pawn",
    color: "black",
    img: "/assets/chess-pieces/bP.svg",
    initialPosition: 15,
  },
  {
    player: "pawn",
    color: "white",
    img: "/assets/chess-pieces/wP.svg",
    initialPosition: 48,
  },
  {
    player: "pawn",
    color: "white",
    img: "/assets/chess-pieces/wP.svg",
    initialPosition: 49,
  },
  {
    player: "pawn",
    color: "white",
    img: "/assets/chess-pieces/wP.svg",
    initialPosition: 50,
  },
  {
    player: "pawn",
    color: "white",
    img: "/assets/chess-pieces/wP.svg",
    initialPosition: 51,
  },
  {
    player: "pawn",
    color: "white",
    img: "/assets/chess-pieces/wP.svg",
    initialPosition: 52,
  },
  {
    player: "pawn",
    color: "white",
    img: "/assets/chess-pieces/wP.svg",
    initialPosition: 53,
  },
  {
    player: "pawn",
    color: "white",
    img: "/assets/chess-pieces/wP.svg",
    initialPosition: 54,
  },
  {
    player: "pawn",
    color: "white",
    img: "/assets/chess-pieces/wP.svg",
    initialPosition: 55,
  },
  {
    player: "rook",
    color: "white",
    img: "/assets/chess-pieces/wR.svg",
    initialPosition: 56,
  },
  {
    player: "knight",
    color: "white",
    img: "/assets/chess-pieces/wN.svg",
    initialPosition: 57,
  },
  {
    player: "bishop",
    color: "white",
    img: "/assets/chess-pieces/wB.svg",
    initialPosition: 58,
  },
  {
    player: "queen",
    color: "white",
    img: "/assets/chess-pieces/wQ.svg",
    initialPosition: 59,
  },
  {
    player: "king",
    color: "white",
    img: "/assets/chess-pieces/wK.svg",
    initialPosition: 60,
  },
  {
    player: "bishop",
    color: "white",
    img: "/assets/chess-pieces/wB.svg",
    initialPosition: 61,
  },
  {
    player: "knight",
    color: "white",
    img: "/assets/chess-pieces/wN.svg",
    initialPosition: 62,
  },
  {
    player: "rook",
    color: "white",
    img: "/assets/chess-pieces/wR.svg",
    initialPosition: 63,
  },
]
