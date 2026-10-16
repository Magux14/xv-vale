export function getEventDateLabels(date, timeZone) {
  const parsedDate = new Date(date)
  const format = options => new Intl.DateTimeFormat('es-MX', { timeZone, ...options }).format(parsedDate)

  return {
    day: format({ day: '2-digit' }),
    month: format({ month: 'long' }),
    numericMonth: format({ month: '2-digit' }),
    year: format({ year: 'numeric' }),
    weekday: format({ weekday: 'long' }),
    time: format({ hour: 'numeric', minute: '2-digit', hour12: true }),
  }
}

export function getTimeRemaining(targetDate, now = Date.now()) {
  const target = new Date(targetDate).getTime()
  const totalSeconds = Number.isFinite(target)
    ? Math.max(0, Math.floor((target - now) / 1000))
    : 0

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

function escapeCalendarText(value) {
  return String(value).replaceAll('\\', '\\\\').replaceAll('\n', '\\n')
    .replaceAll(';', '\\;').replaceAll(',', '\\,')
}

function formatCalendarDate(value) {
  return new Date(value).toISOString().replaceAll('-', '').replaceAll(':', '').replace('.000', '')
}

export function createCalendarEvent(event) {
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Mis XV//Invitacion//ES',
    'BEGIN:VEVENT',
    `UID:mis-xv-${formatCalendarDate(event.date)}@invitacion.local`,
    `DTSTAMP:${formatCalendarDate(Date.now())}`,
    `DTSTART:${formatCalendarDate(event.date)}`,
    `DTEND:${formatCalendarDate(event.endDate)}`,
    `SUMMARY:${escapeCalendarText(`Mis XV años - ${event.name}`)}`,
    `LOCATION:${escapeCalendarText(event.locations.map(location => location.name).join(' / '))}`,
    'END:VEVENT',
    'END:VCALENDAR',
    '',
  ].join('\r\n')
}

export function getConfirmationUrl({ name, attendance, guests }, phoneNumber) {
  const message = attendance === 'yes'
    ? `¡Hola! Soy ${name.trim()}. Confirmo mi asistencia a tus XV años. Asistiremos ${guests} persona(s).`
    : `¡Hola! Soy ${name.trim()}. Muchas gracias por invitarme a tus XV años. No podré asistir.`

  return `https://wa.me/${phoneNumber.replaceAll(/\D/g, '')}?text=${encodeURIComponent(message)}`
}