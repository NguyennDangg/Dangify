import { motion } from 'framer-motion'
import './TrackCard.scss'

function TrackCard({ track, onClick }) {
  const image = track.album.images[0]?.url
  const name = track.name
  const artist = track.artists.map(a => a.name).join(', ')
  const album = track.album.name
  const duration = Math.floor(track.duration_ms / 60000) + ':' +
    String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, '0')

  return (
    <motion.div
      className="track-card hoverable"
      data-label="PLAY"
      onClick={() => onClick(track)}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
    >
      <div className="track-card__image-wrapper">
        <img
          src={image}
          alt={name}
          className="track-card__image"
        />
        <div className="track-card__overlay">
          <i className="fa-solid fa-play track-card__play" />
        </div>
      </div>

      <div className="track-card__info">
        <h3 className="track-card__name">{name}</h3>
        <p className="track-card__artist">{artist}</p>
        <div className="track-card__meta">
          <span className="track-card__album">{album}</span>
          <span className="track-card__duration">{duration}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default TrackCard