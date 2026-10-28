import { useEffect, useState, useRef } from 'react';
import './envelope.scss';

export const Envelope = ({ setCanScroll, hasSound }) => {
  const [opened, setOpened] = useState(false);
  const [hidden, setHidden] = useState(false);

  const audioEnvelopeRef = useRef(null);
  const audioBackgroundRef = useRef(null);

  // No cargamos audio aún — Safari requiere interacción del usuario primero
  useEffect(() => {
    const env = new Audio('./sounds/opening-envelope.mp4');
    env.preload = 'auto';
    audioEnvelopeRef.current = env;

    const bg = new Audio('./sounds/background.mp3');
    bg.preload = 'auto';
    bg.loop = true;
    bg.volume = 0; // volumen inicial 0 para Safari
    audioBackgroundRef.current = bg;
  }, []);

  const handleClick = async () => {
    if (opened) return;
    setOpened(true);
    setCanScroll(true);

    // --- reproducir sonido del sobre ---
    if (audioEnvelopeRef.current) {
      try {
        audioEnvelopeRef.current.muted = !hasSound;
        audioEnvelopeRef.current.volume = hasSound ? 1 : 0;
        await audioEnvelopeRef.current.play();
      } catch (e) {
        console.log('No se pudo reproducir el audio del sobre:', e);
      }
    }

    // --- reproducir música de fondo ---
    setTimeout(async () => {
      if (audioBackgroundRef.current) {
        try {
          // Safari solo respeta el volumen/mute si se hace dentro del mismo click
          audioBackgroundRef.current.muted = !hasSound;
          audioBackgroundRef.current.volume = hasSound ? 0.5 : 0;
          audioBackgroundRef.current.loop = true;
          await audioBackgroundRef.current.play();
        } catch (e) {
          console.log('No se pudo reproducir el audio de fondo:', e);
        }
      }
    }, 100);

    setTimeout(() => setHidden(true), 2000);
  };

  // Si cambia hasSound, ajustar volumen solo si el audio ya fue reproducido
  useEffect(() => {
    if (audioBackgroundRef.current) {
      const bg = audioBackgroundRef.current;
      bg.muted = !hasSound;
      bg.volume = hasSound ? 0.2 : 0;
    }
  }, [hasSound]);

  if (hidden) return null;

  return (
    <div
      className={`envelope envelope__overlay ${opened ? 'envelope__overlay--fade envelope--opened' : ''}`}
      onClick={handleClick}
    >
      <div className="envelope__relative-container">
        <div className={`envelope__container ${opened ? 'envelope--opened' : ''}`}>

          {
            !opened ?
              <img src="./images/envelope.png" alt="envelope" className="envelope__env-image" />
              :
              <img src="./images/envelope-opened.png" alt="envelope" className="envelope__env-image envelope__env-image--opened" />
          }

        </div>
      </div>
    </div>
  );
};
