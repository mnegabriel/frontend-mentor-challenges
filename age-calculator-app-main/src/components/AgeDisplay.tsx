
import { motion, useSpring, useTransform } from "framer-motion"
import { useEffect } from "react"

type Props = {
    timeObject: { years: number, months: number, days: number }
}

export const AgeDisplay = ({ timeObject }: Props) => {
    const calculated = {
        years: useSpring(timeObject.years, { mass: 0.8, stiffness: 75, damping: 15 }),
        months: useSpring(timeObject.months, { mass: 0.8, stiffness: 75, damping: 15 }),
        days: useSpring(timeObject.days, { mass: 0.8, stiffness: 75, damping: 15 }),
    }

    const display = {
        years: useTransform(calculated.years, val => Math.round(val)),
        months: useTransform(calculated.months, val => Math.round(val)),
        days: useTransform(calculated.days, val => Math.round(val)),
    }

    useEffect(() => {
        calculated.years.set(timeObject.years)
        calculated.months.set(timeObject.months)
        calculated.days.set(timeObject.days)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeObject])
    return (
        <div className="result">
            <p>
                <motion.span className="col-purple">{display.years}</motion.span> years
            </p>

            <p>
                <motion.span className="col-purple">{display.months}</motion.span> months
            </p>

            <p>
                <motion.span className="col-purple">{display.days}</motion.span> days
            </p>
        </div>
    )
}