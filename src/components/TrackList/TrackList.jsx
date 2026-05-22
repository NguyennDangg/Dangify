import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import TrackCard from '../TrackCard/TrackCard'
import './TrackList.scss'

gsap.registerPlugin(ScrollTrigger, SplitText)

function TrackList({ tracks, loading, query, onTrackClick }) {
  const titleRef = useRef(null)

  useEffect(() => {
    if (!titleRef.current || loading) return

    // SplitText on section title
    const split = new SplitText(titleRef.current, { type: 'chars' })
    gsap.from(split.chars, {
      y: 40,
      opacity: 0,
      duration: 0.5,
      stagger: 0.03,
      ease: 'power2.out',
    })

    return () => {
      split.revert()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [loading, query])

  if (loading) return (
    <div className="track-list__loading">
      <span>LOADING</span>
      <span className="track-list__loading-dots">...</span>
    </div>
  )

  if (tracks.length === 0) return (
    <div className="track-list__empty">
      [ NO TRACKS FOUND ]
    </div>
  )

  return (
    <section className="track-list">
      <h2 ref={titleRef} className="track-list__title">
        {query ? `RESULTS FOR "${query.toUpperCase()}"` : "DANG'S RECOMMENDED"}
      </h2>

      <motion.div
        className="track-list__grid"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } }
        }}
      >
        {tracks.map((track) => (
          <TrackCard
            key={track.id}
            track={track}
            onClick={onTrackClick}
          />
        ))}
      </motion.div>
    </section>
  )
}

export default TrackList