import { useEffect, useState } from "react"
import { formatDate } from "./useDateTimeFormat"

const isRelativeTimeFormatSupported =
  typeof Intl !== "undefined" && Intl.RelativeTimeFormat

const DATE_UNITS = [
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
]

const getDateDiffs = (timestamp) => {
  const now = Date.now()
  const elapsed = (timestamp - now) / 1000

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnit || unit === "second") {
      const value = Math.floor(elapsed / secondsInUnit)
      return { value, unit }
    }
  }
}

export default function useTimeAgo(timestamp) {
  const [timeago, setTimeago] = useState(() => getDateDiffs(timestamp))
  useEffect(() => {
    console.log(isRelativeTimeFormatSupported)

    const timeout = setInterval(() => {
      const newTimeAgo = getDateDiffs(timestamp)
      setTimeago(newTimeAgo)
    }, 5000)

    return () => clearInterval(timeout)
  }, [timestamp])

  if (!isRelativeTimeFormatSupported) {
    return formatDate(timestamp)
  }

  const { value, unit } = timeago
  const rtf = new Intl.RelativeTimeFormat("es-ES", {
    style: "short",
  })

  console.log(value, unit)
  return rtf.format(value, unit)
}
