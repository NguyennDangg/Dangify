import axios from "axios";

const CLIENT_ID = "510dcc254a6e4d6c858afb64bf152462";
const CLIENT_SECRET = "5a957baf4c774cbb97010f9dfcf270c3";

// Get Spotify token
export const getSpotifyToken = async () => {
  try {
    const credentials = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({ grant_type: "client_credentials" }),
      {
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );
    return response.data.access_token;
  } catch (error) {
    return null;
  }
};

// Search tracks
export const searchTracks = async (query, token) => {
  try {
    const response = await axios.get("https://api.spotify.com/v1/search", {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        q: query,
        type: "track",
        limit: 10,
      },
    });
    return response.data.tracks.items;
  } catch (error) {
    console.error("Search error full:", error.response?.data);
    return [];
  }
};

// Get default tracks on load
export const getDefaultTracks = async (token) => {
  try {
    const randomQueries = [
      "Ryuichi Sakamoto",
      "Fujii Kaze",
      "Yoko Takahashi",
      "Evangelion soundtrack",
      "kessoku band",
      "ZUTOMAYO",
      "Yoasobi",
      "Kenshi Yonezu",
      "Sheena Ringo",
      "Bryant Barnes",
      "Steve Lacy",
      "INABAKUMORI",
    ];
    const randomQ =
      randomQueries[Math.floor(Math.random() * randomQueries.length)];

    const response = await axios.get("https://api.spotify.com/v1/search", {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        q: randomQ,
        type: "track",
        limit: 10,
      },
    });
    return response.data.tracks.items;
  } catch (error) {
    console.error("Default tracks error:", error.response?.data);
    return [];
  }
};
