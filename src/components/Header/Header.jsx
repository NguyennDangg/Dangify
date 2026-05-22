import { motion } from 'framer-motion'
import SearchBar from '../SearchBar/SearchBar'
import './Header.scss'

function Header({ mode, onSearch, onHome, resetTrigger }) {
  return (
    <motion.header
      className="header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="header__inner">

        <motion.div
          className="header__logo"
          data-label="HOME"
          onClick={onHome}
          style={{ cursor: 'none' }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
        >
          <span className="header__logo-bracket">[</span>
          DANGIFY
          <span className="header__logo-bracket">]</span>
        </motion.div>

        <SearchBar onSearch={onSearch} onClear={onHome} resetTrigger={resetTrigger} />

        <motion.div
          className="header__mode"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span className="header__mode-dot" />
          {mode.toUpperCase()} MODE
        </motion.div>

      </div>
    </motion.header>
  )
}

export default Header