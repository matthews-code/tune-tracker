import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Profile from "./Profile";
import Artists from "./components/Artists";
import ArtistPage from "./components/ArtistPage";
import Tracks from "./components/Tracks";
import TrackPage from "./components/TrackPage";
import Playlists from "./components/Playlists";

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Profile />} />
          <Route path="artists" element={<Artists />} />
          <Route path="artists/:id" element={<ArtistPage />} />
          <Route path="tracks" element={<Tracks />} />
          <Route path="tracks/:id" element={<TrackPage />} />
          <Route path="playlists" element={<Playlists />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
