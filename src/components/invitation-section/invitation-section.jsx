import { Crown } from 'lucide-react'
import './invitation-section.scss'

export default function InvitationSection({ id, eyebrow, title, tone = 'paper', background = 'wine', flowersSeparator = true, children }) {
  return (
    <section className={`invitation-section invitation-section--${background}`}>
      <div className={`invitation-section invitation-section--${tone}`} id={id} aria-labelledby={`${id}-title`}>
        <div className="invitation-section__inner">
          <header className="invitation-section__header">
            {eyebrow && <p className="invitation-section__eyebrow">{eyebrow}</p>}
            <h2 className="invitation-section__title" id={`${id}-title`}>{title}</h2>
            <div className="invitation-section__divider" aria-hidden="true"><Crown size={18} strokeWidth={1} /></div>
          </header>
          {children}
        </div>
      </div>
      {
        flowersSeparator &&
        <img src="./images/flowers-separator.png" className="invitation-section__flowers-separator" alt="Detalles del lugar de la celebración" loading="lazy" />
      }
    </section>
  )
}