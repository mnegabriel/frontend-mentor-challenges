import { useState } from "react"

// Assets
import arrowIcon from "./assets/images/icon-arrow.svg"

// Helpers
import { calculateAge } from "./helpers/calculate-age"
import { checkIfDateIsValid, isInTheFuture } from "./helpers/date"

// Components
import { AppInput } from "./components/AppInput"
import { motion, useSpring, useTransform } from "framer-motion"

function App() {
  const [form, setForm] = useState({ day: 1, month: 1, year: 1993 })
  const [errors, setErrors] = useState<string[]>([])

  const initialDisplayData = calculateAge(form)
  const calculated = {
    years: useSpring(initialDisplayData.diffYears, { mass: 0.8, stiffness: 75, damping: 15 }),
    months: useSpring(initialDisplayData.diffMonths, { mass: 0.8, stiffness: 75, damping: 15 }),
    days: useSpring(initialDisplayData.diffDays, { mass: 0.8, stiffness: 75, damping: 15 }),
  }

  const display = {
    years: useTransform(calculated.years, val => Math.round(val)),
    months: useTransform(calculated.months, val => Math.round(val)),
    days: useTransform(calculated.days, val => Math.round(val)),
  }

  function updateForm(value: string, key: keyof typeof form) {
    setForm(prev => ({
      ...prev,
      [key]: Number(value)
    }))
  }

  function checkForErrors(dateObj: { year: number, month: number, day: number }) {
    const errorsChecked: string[] = []

    if (!checkIfDateIsValid(dateObj)) {
      errorsChecked.push("Date is invalid")
    }

    if (isInTheFuture(dateObj)) {
      errorsChecked.push("Date can't be in the future")
    }

    return errorsChecked
  }

  function handleAgeCalculation() {
    const { day, month, year } = form

    const errorsArray = checkForErrors({ day, month, year })
    setErrors(() => errorsArray)

    if (errorsArray.length > 0) return

    const { diffDays, diffMonths, diffYears } = calculateAge({ year, month, day })

    calculated.years.set(diffYears)
    calculated.months.set(diffMonths)
    calculated.days.set(diffDays)
  }

  return (
    <main>
      <div className="card">
        <div className="fields">
          <AppInput
            label="Day"
            id="day"
            state={!errors.length ? undefined : 'error'}
            value={form.day}
            onChange={({ target }) => updateForm(target.value, "day")}
          />

          <AppInput
            label="Month"
            id="month"
            state={!errors.length ? undefined : 'error'}
            value={form.month}
            onChange={({ target }) => updateForm(target.value, "month")}
          />

          <AppInput
            label="Year"
            id="year"
            state={!errors.length ? undefined : 'error'}
            value={form.year}
            onChange={({ target }) => updateForm(target.value, "year")}
          />

          {!errors.length ? null : (
            <div className="error-text full-width">
              <p>{errors[0]}</p>
            </div>
          )}

        </div>

        <div className="submit">
          <button onClick={handleAgeCalculation}><img src={arrowIcon} alt="" /></button>
        </div>

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
      </div>
    </main>
  )
}

export default App
