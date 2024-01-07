
import { DateTime } from "luxon"

export function calculateAge({ year, month, day }: { year: number, month: number, day: number }) {
    const date = DateTime.local(year, month, day)
    const today = DateTime.now()
    const diff = today.diff(date, ["years", "months", "days"])

    const {
        years: diffYears,
        months: diffMonths,
        days: diffDays,
    } = diff.toObject() as { years: number, months: number, days: number }

    return {
        diffYears,
        diffMonths,
        diffDays: Math.floor(diffDays),
    }
}