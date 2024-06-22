import clsx from "clsx"
import { chess } from "../lib/chess"
import { Square as SquareType } from "chess.js"

interface IProps extends React.HTMLProps<HTMLDivElement> {
  isPossibleMove: boolean
  position: SquareType
}

export default function ChessBoardSquare({
  isPossibleMove,
  position,
  children,
  className,
  ...props
}: IProps) {
  const isSolid = chess.squareColor(position) === "dark"

  return (
    <div
      className={clsx(
        "relative z-10 aspect-square",
        isSolid ? "bg-lime-600" : "bg-lime-100",
        className
      )}
      {...props}
    >
      {children && isPossibleMove ? (
        <div className="-z-10 absolute inset-0 p-3 rounded-full bg-black/10">
          <div
            className={clsx(
              "w-full h-full rounded-full",
              isSolid ? "bg-lime-600" : "bg-lime-100"
            )}
          />
        </div>
      ) : (
        isPossibleMove && (
          <div className="-z-10 absolute inset-0 m-[25%] rounded-full bg-black/10" />
        )
      )}
      {position[0] === "a" && (
        <span
          className={clsx(
            "-z-10 absolute left-2 top-2 font-semibold text-[clamp(6px,16px,2.5vw)] opacity-80",
            isSolid ? "text-lime-100" : "text-lime-600"
          )}
        >
          {position[1]}
        </span>
      )}
      {position[1] === "1" && (
        <span
          className={clsx(
            "-z-10 absolute right-2 bottom-2 font-semibold text-[clamp(6px,16px,2.5vw)] opacity-80",
            isSolid ? "text-lime-100" : "text-lime-600"
          )}
        >
          {position[0]}
        </span>
      )}
      {children}
    </div>
  )
}
