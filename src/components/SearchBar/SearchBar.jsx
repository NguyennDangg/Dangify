import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "./SearchBar.scss";

function SearchBar({ onSearch, onClear, resetTrigger }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    setQuery("");
  }, [resetTrigger]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSubmit(e);
  };

  const handleClear = () => {
    setQuery("");
    onClear();
  };

  return (
    <div className="searchbar">
      <i className="fa-solid fa-search searchbar__icon" />
      <input
        type="text"
        className="searchbar__input"
        placeholder="SEARCH TRACKS..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      {query && (
        <motion.button
          className="searchbar__clear"
          onClick={handleClear}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <i className="fa-solid fa-xmark" />
        </motion.button>
      )}
      <motion.button
        className="searchbar__btn"
        onClick={handleSubmit}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        SEARCH
      </motion.button>
    </div>
  );
}

export default SearchBar;
