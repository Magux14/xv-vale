import { Church, Clock3, MapPin, Wine } from 'lucide-react'
import './event-location.scss'

export default function EventLocation({ location }) {
  const Icon = location.id === 'ceremony' ? Church : Wine

  return (
    <article className="event-location">
      <Icon className="event-location__icon" size={42} strokeWidth={1} aria-hidden="true" />
      <h3 className="event-location__title">{location.title}</h3>
      <p className="event-location__name">{location.name}</p>
      <p className="event-location__time"><Clock3 size={14} aria-hidden="true" /><time dateTime={location.dateTime}>{location.time}</time></p>
      <a className="button button--wine" href={location.mapUrl} target="_blank" rel="noreferrer" aria-label={`Ver mapa: ${location.name}`}>
        <MapPin size={15} aria-hidden="true" />Ver mapa
      </a>
    </article>
  )
}