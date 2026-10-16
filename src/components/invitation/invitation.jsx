import { ArrowDown, CalendarPlus, Church, Crown, Heart, Music2, PartyPopper, Shirt, Sparkles, Utensils, Wine } from 'lucide-react'
import { invitationData as event } from '../../data/invitation-data.js'
import { createCalendarEvent, getEventDateLabels } from '../../utils/event-utils.js'
import Countdown from '../countdown/countdown.jsx'
import EventLocation from '../event-location/event-location.jsx'
import InvitationSection from '../invitation-section/invitation-section.jsx'
import MusicPlayer from '../music-player/music-player.jsx'
import RsvpDialog from '../rsvp-dialog/rsvp-dialog.jsx'
import './invitation.scss'

const scheduleIcons = { church: Church, glass: Wine, music: Music2, dinner: Utensils, heart: Heart, dance: PartyPopper }
const dateLabels = getEventDateLabels(event.date, event.timeZone)

function downloadCalendar() {
  const url = URL.createObjectURL(new Blob([createCalendarEvent(event)], { type: 'text/calendar;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = 'mis-xv-maria-jose.ics'
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export default function Invitation() {
  return (
    <>
      <a className="invitation__skip" href="#celebration">Ir a la invitación</a>
      <header className="invitation__hero">
        <img className="invitation__hero-image" src="./images/hero.png" alt="Valeria con su vestido color rojo y su corona de XV años" fetchPriority="high" width="1599" height="899" />
        <nav className="invitation__nav" aria-label="Navegación principal">
          <a className="invitation__monogram" href="#">{event.initials}<span>· XV ·</span></a>
          <div className="invitation__nav-links">
            <a href="#date">La fecha</a>
            <a href="#locations">El lugar</a>
            <a href="#rsvp">Confirmar</a>
          </div>
        </nav>
        <div className="invitation__hero-content">
          <Crown size={46} strokeWidth={1} aria-hidden="true" />
          <p className="invitation__hero-eyebrow">Mis XV años</p>
          <h1 className="invitation__name">{event.name}</h1>
          <p className="invitation__hero-date">{dateLabels.day} <span>/</span> {dateLabels.month.toUpperCase()} <span>/</span> {dateLabels.year}</p>
        </div>
        <a className="invitation__scroll" href="#celebration" aria-label="Descubrir la invitación" title="Descubrir la invitación"><ArrowDown size={20} strokeWidth={1} /></a>
      </header>

      <main>
        <section className="invitation__intro" id="celebration" aria-label="Un día muy especial">
          <img className="invitation__branch invitation__branch--left" src="./images/floral-branch.png" alt="" width="439" height="800" loading="lazy" />
          <img className="invitation__branch invitation__branch--right" src="./images/floral-branch.png" alt="" width="439" height="800" loading="lazy" />
          <p className="invitation__eyebrow">Una nueva etapa, un sueño, una celebración</p>
          <div className="invitation__date-line"><span>{dateLabels.month}</span><strong>{dateLabels.day}</strong><span>{dateLabels.year}</span></div>
          <p className="invitation__quote">{event.message}</p>
          <div className="invitation__divider" aria-hidden="true"><Crown size={18} strokeWidth={1} /></div>
          <MusicPlayer {...event.music} />
        </section>

        <InvitationSection id="family" eyebrow="Con el amor y la bendición de" title="Mi familia">
          <div className="invitation__family">
            {[['Mis padres', event.parents], ['Mi madrina', event.godparents]].map(([title, names]) => (
              <div className="invitation__family-group" key={title}>
                <p className="invitation__family-label">{title}</p>
                <p className="invitation__family-name">{names[0]}</p>
                {
                  names[1] && 
                  <>
                    <span className="invitation__ampersand">&</span>
                    <p className="invitation__family-name">{names[1]}</p>
                  </>
                }
              </div>
            ))}
          </div>
          <p className="invitation__family-note">Acompáñame en este día tan especial</p>
        </InvitationSection>

        <div className="invitation__gallery" aria-label="Fotografías de Valeria">
          {event.photos.map(photo => <img className="invitation__gallery-image" key={photo.src} src={photo.src} alt={photo.alt} width="800" height="800" loading="lazy" />)}
        </div>

        <InvitationSection id="date" eyebrow="Hay momentos que se guardan para siempre" title="Save the date" tone="paper" background="paper">
          <div className="invitation__save-date">
            <span className="invitation__date-side">{dateLabels.weekday}</span>
            <div className="invitation__seal"><span className="invitation__seal-month">{dateLabels.month}</span><strong>{dateLabels.day}</strong><span>{dateLabels.year}</span></div>
            <span className="invitation__date-side">{dateLabels.time}</span>
          </div>
          <img src="./images/vestido.png" className="invitation__dress-image" alt="Detalles del lugar de la celebración" loading="lazy" />
          <p className="invitation__countdown-label">Cada vez falta menos</p>
          <Countdown date={event.date} />
          <button className="button" type="button" onClick={downloadCalendar}><CalendarPlus size={16} aria-hidden="true" />Guardar en mi calendario</button>
        </InvitationSection>

        <InvitationSection id="locations" eyebrow="El escenario de un día inolvidable" title="Nos vemos en…">
          <div className="invitation__locations">{event.locations.map(location => <EventLocation key={location.id} location={location} />)}</div>
        </InvitationSection>

        <div className="invitation__photo-band"><img src="./images/venue.jpg" alt="Detalles del lugar de la celebración" width="800" height="533" loading="lazy" /></div>

        <InvitationSection id="schedule" eyebrow="Cada instante será especial" title="Itinerario" tone="wine">
          <ol className="invitation__schedule">
            {event.schedule.map(item => {
              const Icon = scheduleIcons[item.icon]
              return <li className="invitation__schedule-item" key={item.id}>
                <span className="invitation__schedule-icon"><Icon size={28} strokeWidth={1} aria-hidden="true" /></span>
                <p className="invitation__schedule-name">{item.label}</p>
                <p className="invitation__schedule-time">{item.time}</p>
              </li>
            })}
          </ol>
        </InvitationSection>

        ff

        <InvitationSection id="dress-code" eyebrow="Tu compañía es lo más importante" title="Dress code" background = 'paper'>
          <img src="./images/dress-code.png" alt="Dress code" className="invitation__dress-image" />
          <p className="invitation__dress-title">Formal sin tenis</p>
          {/* <p className="invitation__body">Te invitamos a vestir como te sientas más cómodo y disfrutar de la celebración con nosotros.</p> */}
          <div className="invitation__reserved"><span className="invitation__swatch" aria-hidden="true" /><p>El color vino está reservado<br />para la quinceañera.</p></div>
        </InvitationSection>

        <section className="invitation__closing" id="rsvp" aria-labelledby="rsvp-heading">
          <img className="invitation__closing-image" src="./images/closing-portrait.jpg" alt="Valeria en su sesión de XV años" loading="lazy" width="533" height="800" />
          <div className="invitation__closing-content">
            <Sparkles size={28} strokeWidth={1} aria-hidden="true" />
            <p className="invitation__eyebrow">Los mejores recuerdos se viven juntos</p>
            <h2 className="invitation__closing-title" id="rsvp-heading">¡Te esperamos!</h2>
            <p className="invitation__closing-text">Será una noche aún más especial contigo.</p>
            <RsvpDialog phoneNumber={event.whatsappNumber} deadline={event.confirmationDeadline} />
          </div>
        </section>
      </main>

      <footer className="invitation__footer"><span className="invitation__footer-name">{event.name}</span><Heart size={13} strokeWidth={1} aria-hidden="true" /><p>{dateLabels.day} · {dateLabels.numericMonth} · {dateLabels.year}</p></footer>
    </>
  )
}