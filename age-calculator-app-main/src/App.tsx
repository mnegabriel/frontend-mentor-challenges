import { useState } from "react"

// Assets
import arrowIcon from "./assets/images/icon-arrow.svg"

// Helpers
import { calculateAge } from "./helpers/calculate-age"

// Components
import { AppInput } from "./components/AppInput"

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
          <AppInput
            label="Day"
            id="day"
            value={form.day}
            onChange={({ target }) => updateForm(target.value, "day")}
          />

          <AppInput
            label="Month"
            id="month"
            value={form.month}
            onChange={({ target }) => updateForm(target.value, "month")}
          />

          <AppInput
            label="Year"
            id="year"
            value={form.year}
            onChange={({ target }) => updateForm(target.value, "year")}
          />
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
