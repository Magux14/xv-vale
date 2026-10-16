import { useEffect, useState } from 'react'
import { getTimeRemaining } from '../../utils/event-utils.js'
import './countdown.scss'

const units = [ ['days', 'Días'], ['hours', 'Horas'], ['minutes', 'Minutos'], ['seconds', 'Segundos'] ]

export default function Countdown({ date }) {
  const [remaining, setRemaining] = useState(() => getTimeRemaining(date))

  useEffect(() => {
    const interval = setInterval(() => setRemaining(getTimeRemaining(date)), 1000)
    return () => clearInterval(interval)
  }, [date])

  return (
    <div className="countdown" role="timer" aria-label="Tiempo restante para la celebración">
      {units.map(([key, label]) => (
        <div className="countdown__unit" key={key}>
          <span className="countdown__number">{String(remaining[key]).padStart(2, '0')}</span>
          <span className="countdown__label">{label}</span>
        </div>
      ))}
    </div>
  )
}