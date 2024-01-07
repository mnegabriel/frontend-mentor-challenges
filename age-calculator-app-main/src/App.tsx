import { useState } from "react"
import { DateTime } from "luxon"

import arrowIcon from "./assets/images/icon-arrow.svg"

function calculateAge({ year, month, day }: { year: number, month: number, day: number }) {
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

function App() {
  const [form, setForm] = useState({ day: 1, month: 1, year: 1993 })

  const initialDisplayData = calculateAge(form)

  const [display, setDisplay] = useState({
    years: initialDisplayData.diffYears,
    months: initialDisplayData.diffMonths,
    days: initialDisplayData.diffDays
  })

  function updateForm(value: string, key: keyof typeof form) {
    setForm(prev => ({
      ...prev,
      [key]: Number(value)
    }))
  }

  function handleAgeCalculation() {
    const { day, month, year } = form
    const { diffDays, diffMonths, diffYears } = calculateAge({ year, month, day })

    setDisplay(() => ({
      years: diffYears,
      months: diffMonths,
      days: diffDays,
    }))
  }

  return (
    <main>
      <div className="card">
        <div className="fields">
          <div className="field">
            <label htmlFor="day">Day</label>

            <input
              type="number"
              id="day"
              value={form.day}
              onChange={({ target }) => updateForm(target.value, "day")}
            />
          </div>

          <div className="field">
            <label htmlFor="month">Month</label>

            <input
              type="number"
              id="month"
              value={form.month}
              onChange={({ target }) => updateForm(target.value, "month")}
            />
          </div>

          <div className="field">
            <label htmlFor="year">Year</label>

            <input
              type="number"
              id="year"
              value={form.year}
              onChange={({ target }) => updateForm(target.value, "year")}
            />
          </div>
        </div>

        <div className="submit">
          <button onClick={handleAgeCalculation}><img src={arrowIcon} alt="" /></button>
        </div>

        <div className="result">
          <p>
            <span className="col-purple">{display.years}</span> years
          </p>

          <p>
            <span className="col-purple">{display.months}</span> months
          </p>

          <p>
            <span className="col-purple">{display.days}</span> days
          </p>
        </div>
      </div>
    </main>
  )
}

export default App
