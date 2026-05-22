import { motion } from 'framer-motion'
import './Footer.scss'

function Footer() {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <div className="footer__content">
        <span className="footer__logo">[ DANGIFY ]</span>

        <div className="footer__line" />

        <div className="footer__credits-list">
          <a href="https://developer.spotify.com" target="_blank" rel="noopener noreferrer">
            SPOTIFY API
          </a>
          <a href="https://www.khara.co.jp" target="_blank" rel="noopener noreferrer">
            EVANGELION
          </a>
          <span>OC ART — COMING SOON</span>
        </div>

        <div className="footer__line" />

        <div className="footer__track">
          <span className="footer__track-icon">♪</span>
          <span>残酷天使のテーゼ</span>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer