import { DateTime } from "luxon"

export function checkIfDateIsValid({ year, month, day }: { year: number, month: number, day: number }) {
    if ([year, month, day].some(num => num < 1)) {
        return false
    }

    const date = new Date(`${year}-${month}-${day}`)
    return date.toDateString() !== "Invalid Date"
}

export function isInTheFuture({ year, month, day }: { year: number, month: number, day: number }) {
    const today = DateTime.now()
    const date = DateTime.local(year, month, day)

    return date.startOf("day") > today.startOf("day")
}