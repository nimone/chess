import clsx from "clsx"
import { indexToFile, indexToRank } from "../utils"

interface IProps extends React.HTMLProps<HTMLDivElement> {
  isPossibleMove: boolean
  isTurnColor: boolean
  position: number
}

export default function Square({
  isPossibleMove,
  isTurnColor,
  position,
  children,
  className,
  ...props
}: IProps) {
  const isSolid = (position + (Math.floor(position / 8) % 2)) % 2 !== 0

  return (
    <div
      className={clsx(
        "relative aspect-square flex items-center justify-center md:p-4",
        (isTurnColor || isPossibleMove) && "cursor-pointer hover:bg-opacity-90",
        isSolid ? "bg-lime-600" : "bg-lime-100",
        className
      )}
      {...props}
    >
      {children && !isTurnColor && isPossibleMove ? (
        <div className="absolute inset-0 p-3 rounded-full bg-black/10">
          <div
            className={clsx(
              "w-full h-full rounded-full",
              isSolid ? "bg-lime-600" : "bg-lime-100"
            )}
          />
        </div>
      ) : (
        isPossibleMove && (
          <div className="absolute w-12 h-12 rounded-full bg-black/10" />
        )
      )}
      {position % 8 === 0 && (
        <span
          className={clsx(
            "absolute font-semibold left-2 top-2 opacity-80",
            isSolid ? "text-lime-100" : "text-lime-600"
          )}
        >
          {indexToRank(position)}
        </span>
      )}
      {position >= 56 && (
        <span
          className={clsx(
            "absolute font-semibold right-2 bottom-2 opacity-80",
            isSolid ? "text-lime-100" : "text-lime-600"
          )}
        >
          {indexToFile(position)}
        </span>
      )}
      {children}
    </div>
  )
}
