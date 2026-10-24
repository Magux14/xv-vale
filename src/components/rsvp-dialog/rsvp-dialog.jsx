import { useRef, useState } from 'react'
import { Heart, MessageCircle, X } from 'lucide-react'
import { getConfirmationUrl } from '../../utils/event-utils.js'
import './rsvp-dialog.scss'

export default function RsvpDialog({ phoneNumber, deadline }) {
  const dialogRef = useRef(null)
  const [attendance, setAttendance] = useState('yes')
  const [name, setName] = useState('')
  const [guests, setGuests] = useState('1')
  const confirmationUrl = new URL(getConfirmationUrl({ name, attendance, guests }, phoneNumber))

  return (
    <div className="rsvp-dialog">
      <button className="button button--gold" type="button" onClick={() => dialogRef.current.showModal()}>
        <Heart size={16} aria-hidden="true" />Confirmar asistencia
      </button>
      <p className="rsvp-dialog__deadline">Antes del {deadline}</p>
      <dialog className="rsvp-dialog__modal" ref={dialogRef} aria-labelledby="rsvp-title" onKeyDown={event => {
        if (event.key === 'Escape') {
          event.preventDefault()
          event.currentTarget.close()
        }
      }}>
        <button className="rsvp-dialog__close" type="button" onClick={() => dialogRef.current.close()} aria-label="Cerrar confirmación" title="Cerrar">
          <X size={20} />
        </button>
        <Heart className="rsvp-dialog__heart" size={26} strokeWidth={1} aria-hidden="true" />
        <h2 className="rsvp-dialog__title" id="rsvp-title">¿Nos acompañas?</h2>
        <form className="rsvp-dialog__form" action={`${confirmationUrl.origin}${confirmationUrl.pathname}`} method="get" target="_blank" rel="noreferrer">
          <input type="hidden" name="text" value={confirmationUrl.searchParams.get('text')} />
          <label className="rsvp-dialog__field">Tu nombre
            <input autoComplete="name" required maxLength={80} pattern=".*\S.*" value={name} onChange={event => setName(event.target.value)} />
          </label>
          <label className="rsvp-dialog__field">Asistencia
            <select value={attendance} onChange={event => setAttendance(event.target.value)}>
              <option value="yes">Sí, estaré ahí</option>
              <option value="no">No podré asistir</option>
            </select>
          </label>
          {/* {attendance === 'yes' && <label className="rsvp-dialog__field">Personas que asistirán, incluyéndote
            <input type="number" min="1" max="10" step="1" value={guests} onChange={event => setGuests(event.target.value)} required />
          </label>} */}
          <button className="button button--wine" type="submit">
            <MessageCircle size={17} aria-hidden="true" />Enviar por WhatsApp
          </button>
        </form>
      </dialog>
    </div>
  )
}