import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Profile from "./Profile";
import Artists from "./components/Artists";
import Tracks from "./components/Tracks";
import Playlists from "./components/Playlists";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Profile />} />
          <Route path="artists" element={<Artists />} />
          <Route path="tracks" element={<Tracks />} />
          <Route path="playlists" element={<Playlists />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
