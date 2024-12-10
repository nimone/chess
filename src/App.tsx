import { useEffect, useState } from "react"
import ChessBoard from "./components/ChessBoard"
import { chess } from "./lib/chess"
import { PlayIcon } from "@radix-ui/react-icons"

export default function App() {
  const [gameState, setGameState] = useState<"idle" | "ingame" | "result">(
    "idle"
  )
  const [timerBlack, setTimerBlack] = useState(10 * 60)
  const [timerWhite, setTimerWhite] = useState(10 * 60)

  useEffect(() => {
    if (gameState !== "ingame") return
    const timer = setInterval(() => {
      if (chess.turn() === "w") setTimerWhite((curr) => curr - 1)
      else setTimerBlack((curr) => curr - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [gameState])

  return (
    <main className="relative min-h-screen flex justify-center items-center bg-gray-50">
      {gameState === "idle" && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center">
          <div className="p-4 rounded-lg bg-white">
            <button
              onClick={() => setGameState("ingame")}
              className="flex gap-4 items-center bg-lime-600 py-4 px-8 font-medium text-white text-2xl shadow rounded"
            >
              <PlayIcon width={32} height={32} /> Start Game
            </button>
          </div>
        </div>
      )}
      <ChessBoard />
      <div className="self-stretch flex flex-col justify-between m-4 p-4 text-xl bg-white shadow rounded-lg">
        <div className="font-mono bg-gray-100 rounded-lg shadow-inner px-4 py-2">
          {new Date(timerBlack * 1000).toISOString().slice(14, 19)}
        </div>
        <div className="font-mono bg-gray-100 rounded-lg shadow-inner px-4 py-2">
          {new Date(timerWhite * 1000).toISOString().slice(14, 19)}
        </div>
      </div>
    </main>
  )
}
