import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import './Player.scss'

gsap.registerPlugin(SplitText)

function Player({ track, onClose }) {
  const trackNameRef = useRef(null)

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  useEffect(() => {
    if (!track || !trackNameRef.current) return
    const split = new SplitText(trackNameRef.current, { type: 'chars' })
    gsap.from(split.chars, {
      opacity: 0,
      y: 20,
      duration: 0.4,
      stagger: 0.03,
      ease: 'power2.out',
    })
    return () => split.revert()
  }, [track])

  const image = track?.album.images[0]?.url
  const artist = track?.artists.map(a => a.name).join(', ')

  return (
    <AnimatePresence>
      {track && (
        <>
          <motion.div
            className="player-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          <motion.div
            className="player"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <motion.button
              className="player__close hoverable magnetic"
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fa-solid fa-xmark" />
            </motion.button>

            <div className="player__header">
              <img src={image} alt={track.name} className="player__image" />
              <div className="player__info">
                <p className="player__label">NOW PLAYING</p>
                <h2 ref={trackNameRef} className="player__name">{track.name}</h2>
                <p className="player__artist">{artist}</p>
                <p className="player__album">{track.album.name}</p>
                <motion.a
                  href={track.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="player__spotify-link hoverable magnetic"
                  data-label="OPEN"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fa-brands fa-spotify" />
                  OPEN IN SPOTIFY
                </motion.a>
              </div>
            </div>

            <div className="player__embed" style={{cursor: 'auto'}}>
              <iframe
                src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator&theme=0`}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title={track.name}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Player