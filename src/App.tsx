import { useEffect, useState } from "react"
import ChessBoard from "./components/ChessBoard"
import { chess } from "./lib/chess"

export default function App() {
  const [timerBlack, setTimerBlack] = useState(10 * 60)
  const [timerWhite, setTimerWhite] = useState(10 * 60)

  useEffect(() => {
    const timer = setInterval(() => {
      if (chess.turn() === "w") setTimerWhite((curr) => curr - 1)
      else setTimerBlack((curr) => curr - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])
  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-50">
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
