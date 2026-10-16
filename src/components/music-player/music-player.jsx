import { useRef, useState } from 'react'
import { Music2, Pause, Play } from 'lucide-react'
import './music-player.scss'

export default function MusicPlayer({ src, title }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState('')

  async function togglePlayback() {
    if (playing) {
      audioRef.current.pause()
      return
    }
    try {
      await audioRef.current.play()
      setError('')
    } catch {
      setError('La canción no está disponible en este momento.')
    }
  }

  if (!src) return null

  return (
    <div className="music-player">
      <Music2 size={20} strokeWidth={1} aria-hidden="true" />
      <p className="music-player__title">{title}</p>
      <button className="music-player__button" type="button" onClick={togglePlayback} aria-label={playing ? 'Pausar canción' : 'Reproducir canción'} title={playing ? 'Pausar canción' : 'Reproducir canción'}>
        {playing ? <Pause size={19} /> : <Play size={19} />}
      </button>
      <audio ref={audioRef} src={src} preload="none" loop onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => { setPlaying(false); setError('La canción no está disponible en este momento.') }} />
      {error && <p className="music-player__error" role="status">{error}</p>}
    </div>
  )
}