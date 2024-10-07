import React, { useState, useEffect } from "react";
import { accessToken, getPlaylists } from "../spotify";
import { catchErrors } from "../utils";
import IndivPlaylist from "./subcomponents/IndivPlaylist";

const Playlists = () => {
  const [token, setToken] = useState(null);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (!token) {
      setToken(accessToken);
    }

    const fetchData = async () => {
      const playlistResponse = await getPlaylists();
      const playlistData = await playlistResponse.json();

      console.log(playlistData.items);
      setPlaylists(playlistData.items);
    };

    if (token) {
      const wrappedFetchData = catchErrors(fetchData);
      wrappedFetchData();
    }
  }, [token]);

  const mapPlaylists = () => {
    return playlists.map((playlist) => {
      return <IndivPlaylist key={playlist.id} playlist={playlist} />;
    });
  };

  return (
    <section className="mx-auto flex w-[75%] max-w-[1240px] flex-col items-center gap-10">
      <div className="w-full">
        <h1 className="text-2xl font-black">Your Playlists</h1>
      </div>
      <div className="grid w-full grid-cols-[repeat(auto-fit,_minmax(140px,_1fr))] gap-8 md:grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))]">
        {mapPlaylists()}
      </div>
    </section>
  );
};

export default Playlists;
