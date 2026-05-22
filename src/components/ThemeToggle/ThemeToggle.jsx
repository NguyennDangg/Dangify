import { motion } from 'framer-motion'
import './ThemeToggle.scss'

function ThemeToggle({ mode, setMode }) {
  const isNerv = mode === 'nerv'

  return (
    <motion.div
      className="theme-toggle"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
    >
      <motion.button
        className={`theme-toggle__btn magnetic ${isNerv ? 'active' : ''}`}
        onClick={() => setMode('nerv')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="theme-toggle__dot" />
        NERV
      </motion.button>

      <div className="theme-toggle__divider" />

      <motion.button
        className={`theme-toggle__btn magnetic ${!isNerv ? 'active' : ''}`}
        onClick={() => setMode('seele')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="theme-toggle__dot" />
        SEELE
      </motion.button>
    </motion.div>
  )
}

export default ThemeToggle