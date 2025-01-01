import { useEffect, useState } from "react"
import ChessBoard from "./components/ChessBoard"
import { chess } from "./lib/chess"
import { PlayIcon, StopwatchIcon } from "@radix-ui/react-icons"
import { cn } from "./lib/utils"

export default function App() {
  const [gameState, setGameState] = useState<"idle" | "ingame" | "result">(
    "idle"
  )
  const [gameType, setGameType] = useState<"rapid" | "blitz" | "bullet">(
    "rapid"
  )
  const [timerBlack, setTimerBlack] = useState(10 * 60)
  const [timerWhite, setTimerWhite] = useState(10 * 60)

  useEffect(() => {
    if (gameState !== "ingame") return
    const timer = setInterval(() => {
      if (chess.turn() === "w") setTimerWhite((curr) => curr - 1)
      else setTimerBlack((curr) => curr - 1)
      if (chess.isCheckmate() || chess.isDraw()) {
        setGameState("result")
        clearInterval(timer)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [gameState])

  const changeGameType = (type: typeof gameType) => {
    setGameType(type)
    switch (type) {
      case "rapid":
        setTimerBlack(10 * 60)
        setTimerWhite(10 * 60)
        break
      case "blitz":
        setTimerBlack(5 * 60)
        setTimerWhite(5 * 60)
        break
      case "bullet":
        setTimerBlack(2 * 60)
        setTimerWhite(2 * 60)
        break
    }
  }

  return (
    <main className="relative min-h-screen flex justify-center items-center bg-gray-50">
      {gameState === "idle" && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center">
          <div className="p-8 rounded-lg bg-white">
            <h2 className="mb-4 flex gap-2 items-center justify-center text-lg font-bold">
              <StopwatchIcon className="size-5" /> Time Limit
            </h2>
            <div className="flex justify-around gap-4 mb-4">
              <button
                onClick={() => changeGameType("rapid")}
                className={cn(
                  "py-2 px-4 border-2 font-medium shadow rounded-md",
                  gameType === "rapid" &&
                    "border-lime-500 bg-lime-50 [&>b]:text-lime-700"
                )}
              >
                <div className="text-lg">10 min</div>
                <b>Rapid</b>
              </button>
              <button
                onClick={() => changeGameType("blitz")}
                className={cn(
                  "py-2 px-4 border-2 font-medium shadow rounded-md",
                  gameType === "blitz" &&
                    "border-lime-500 bg-lime-50 [&>b]:text-lime-700"
                )}
              >
                <div className="text-lg">5 min</div>
                <b>Blitz</b>
              </button>
              <button
                onClick={() => changeGameType("bullet")}
                className={cn(
                  "py-2 px-4 border-2 font-medium shadow rounded-md",
                  gameType === "bullet" &&
                    "border-lime-500 bg-lime-50 [&>b]:text-lime-700"
                )}
              >
                <div className="text-lg">2 min</div>
                <b>Bullet</b>
              </button>
            </div>

            <button
              onClick={() => setGameState("ingame")}
              className="w-full flex gap-4 items-center bg-lime-600 py-4 px-8 font-medium text-white text-2xl shadow rounded"
            >
              <PlayIcon width={32} height={32} /> Start New Game
            </button>
          </div>
        </div>
      )}
      {gameState === "result" && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center">
          <div className="p-8 rounded-lg bg-white">
            <h2 className="mb-4 flex gap-2 items-center justify-center text-lg font-bold">
              {chess.isDraw()
                ? "Draw"
                : chess.turn() === "w"
                ? "Black Wins"
                : "White Wins"}
              !
            </h2>
            <div className="flex justify-around gap-4 mb-4">
              <button
                onClick={() => changeGameType("rapid")}
                className={cn(
                  "py-2 px-4 border-2 font-medium shadow rounded-md",
                  gameType === "rapid" &&
                    "border-lime-500 bg-lime-50 [&>b]:text-lime-700"
                )}
              >
                <div className="text-lg">10 min</div>
                <b>Rapid</b>
              </button>
              <button
                onClick={() => changeGameType("blitz")}
                className={cn(
                  "py-2 px-4 border-2 font-medium shadow rounded-md",
                  gameType === "blitz" &&
                    "border-lime-500 bg-lime-50 [&>b]:text-lime-700"
                )}
              >
                <div className="text-lg">5 min</div>
                <b>Blitz</b>
              </button>
              <button
                onClick={() => changeGameType("bullet")}
                className={cn(
                  "py-2 px-4 border-2 font-medium shadow rounded-md",
                  gameType === "bullet" &&
                    "border-lime-500 bg-lime-50 [&>b]:text-lime-700"
                )}
              >
                <div className="text-lg">2 min</div>
                <b>Bullet</b>
              </button>
            </div>

            <button
              onClick={() => {
                chess.reset()
                setGameState("ingame")
              }}
              className="w-full flex gap-4 items-center bg-lime-600 py-4 px-8 font-medium text-white text-2xl shadow rounded"
            >
              <PlayIcon width={32} height={32} /> Start New Game
            </button>
          </div>
        </div>
      )}
      <ChessBoard />
      <div className="self-stretch flex flex-col justify-between m-4 text-xl">
        <div className="bg-white shadow rounded-lg p-4">
          <div
            className={cn(
              "font-mono rounded-lg shadow-inner px-4 py-2",
              chess.turn() === "b"
                ? "bg-lime-100 font-semibold"
                : "bg-gray-100 "
            )}
          >
            {new Date(timerBlack * 1000).toISOString().slice(14, 19)}
          </div>
        </div>
        <ul className="flex flex-col-reverse gap-2 max-h-[75vh] bg-white rounded-lg flex-1 my-2 p-4 shadow overflow-y-auto">
          {chess.history().map((move, i) => (
            <li
              key={move}
              className="flex gap-2 items-center px-4 py-1 rounded-md shadow bg-white border"
            >
              <img
                className="size-6"
                src={`/assets/chess-pieces/${
                  (i % 2 === 0 ? "w" : "b") +
                  (move.length === 2 ? "p" : move[0].toLowerCase())
                }.svg`}
              />
              {move}
            </li>
          ))}
        </ul>
        <div className="bg-white shadow rounded-lg p-4">
          <div
            className={cn(
              "font-mono rounded-lg shadow-inner px-4 py-2",
              chess.turn() === "w"
                ? "bg-lime-100 font-semibold"
                : "bg-gray-100 "
            )}
          >
            {new Date(timerWhite * 1000).toISOString().slice(14, 19)}
          </div>
        </div>
      </div>
    </main>
  )
}
