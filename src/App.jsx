import { useState, useEffect } from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import TrackList from "./components/TrackList/TrackList";
import Player from "./components/Player/Player";
import Cursor from './components/Cursor/Cursor'
import {
  getSpotifyToken,
  searchTracks,
  getDefaultTracks,
} from "./services/api";
import Footer from "./components/Footer/Footer";

function App() {
  const [mode, setMode] = useState("nerv");
  const [token, setToken] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [resetTrigger, setResetTrigger] = useState(0)

  // get token on mount
  useEffect(() => {
    let cancelled = false;
    const init = async () => {
      const t = await getSpotifyToken();
      if (cancelled) return;
      setToken(t);
      if (t) {
        const defaultTracks = await getDefaultTracks(t);
        if (cancelled) return;
        setTracks(defaultTracks);
      }
      setLoading(false);
    };
    init();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSearch = async (query) => {
    if (!token) return;
    setLoading(true);
    setQuery(query);
    const results = await searchTracks(query, token);
    setTracks(results);
    setLoading(false);
  };

  const handleTrackClick = (track) => {
    setSelectedTrack(track);
  };

  const handleHome = async () => {
  setQuery('')
  setResetTrigger(prev => prev + 1)
  setLoading(true)
  const defaultTracks = await getDefaultTracks(token)
  setTracks(defaultTracks)
  setLoading(false)
}

  return (
    <div className={`app app--${mode}`}>
      <Cursor />
      <Header mode={mode} onSearch={handleSearch} onHome={handleHome} resetTrigger={resetTrigger} />

      <div className="app-content">
        <TrackList
          tracks={tracks}
          loading={loading}
          query={query}
          onTrackClick={handleTrackClick}
        />
      </div>

      
      <Player track={selectedTrack} onClose={() => setSelectedTrack(null)} />

      <ThemeToggle mode={mode} setMode={setMode} />
    </div>
  );
}

export default App;
