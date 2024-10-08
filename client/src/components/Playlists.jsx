import React, { useState, useEffect } from "react";
import {
  accessToken,
  getPlaylists,
  getSpotRecommendations,
  addSpotPlaylist,
} from "../spotify";
import { catchErrors } from "../utils";
import IndivPlaylist from "./subcomponents/IndivPlaylist";
import Hover from "./subcomponents/Hover";
import IndivTrack from "./subcomponents/IndivTrack";

const Playlists = () => {
  const [token, setToken] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [featuredHoveredComponent, setFeaturedHoveredComponent] =
    React.useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = React.useState(null);
  const [popularity, setPopularity] = React.useState(25);
  const [recommendations, setRecommendations] = React.useState(null);
  const [latestSearchedPlaylist, setLatestSearchedPlaylist] =
    React.useState(null);
  const [createdPlaylist, setCreatedPlaylist] = React.useState(null);

  useEffect(() => {
    if (!token) {
      setToken(accessToken);
    }

    const fetchData = async () => {
      const playlistResponse = await getPlaylists();
      const playlistData = await playlistResponse.json();

      setPlaylists(playlistData.items);
    };

    if (token) {
      const wrappedFetchData = catchErrors(fetchData);
      wrappedFetchData();
    }
  }, [token]);

  const getRecommendations = () => {
    const fetchData = async () => {
      const recommendedResponse = await getSpotRecommendations(
        selectedPlaylist,
        popularity,
      );
      const recommendedData = await recommendedResponse.json();

      setRecommendations(recommendedData.tracks);
    };

    if (selectedPlaylist) {
      setLatestSearchedPlaylist(selectedPlaylist);
      const wrappedFetchData = catchErrors(fetchData);
      wrappedFetchData();
    }
  };

  const addPlaylist = () => {
    const fetchData = async () => {
      const createPlaylistData = await addSpotPlaylist(
        latestSearchedPlaylist,
        recommendations,
      );

      // console.log(createPlaylistData);

      setCreatedPlaylist(createPlaylistData);
    };

    if (latestSearchedPlaylist && recommendations) {
      const wrappedFetchData = catchErrors(fetchData);
      wrappedFetchData();
    }
  };

  const mapPlaylists = () => {
    return playlists.map((playlist) => {
      return (
        <Hover
          key={playlist.id}
          id={playlist.id}
          onClick={() => setSelectedPlaylist(playlist)}
          hoveredComponent={featuredHoveredComponent}
          setHoveredComponent={setFeaturedHoveredComponent}
          selectedPlaylist={selectedPlaylist}
        >
          <IndivPlaylist playlist={playlist} />
        </Hover>
      );
    });
  };

  const mapTopTracks = () => {
    if (recommendations) {
      return recommendations.map((track) => {
        return <IndivTrack key={track.id} track={track} />;
      });
    }
  };

  // console.log(selectedPlaylist);

  return (
    <section className="mx-auto flex w-[90%] max-w-[1240px] flex-col items-center gap-6 xs:w-[75%] xs:gap-10">
      <div className="w-full">
        <h1 className="text-lg font-black xs:text-2xl">Select Base Playlist</h1>
      </div>
      <div
        onMouseEnter={() =>
          selectedPlaylist === null && setFeaturedHoveredComponent(999)
        }
        onMouseLeave={() =>
          selectedPlaylist === null && setFeaturedHoveredComponent(null)
        }
        className="grid w-full grid-cols-[repeat(auto-fit,_minmax(140px,_1fr))] gap-5 xs:gap-8 md:grid-cols-[repeat(auto-fit,_minmax(190px,_1fr))]"
      >
        {mapPlaylists()}
      </div>
      <div className="w-full">
        <h1 className="text-lg font-black xs:text-2xl">Select Popularity</h1>
      </div>
      <div className="w-full">
        <input
          type="range"
          min={25}
          max="100"
          value={popularity}
          className="range [--range-shdw:#1ed760]"
          step="25"
          onChange={(e) => setPopularity(e.target.value)}
        />
        <div className="flex w-full justify-between px-2 text-xs">
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
        <button
          className="mx-auto mt-8 block rounded-full bg-[#1db954] px-6 py-2 text-sm font-bold text-white duration-100 ease-in-out hover:bg-[#1ed760] disabled:bg-[#1ed75f5c] disabled:text-[#ababab99] xs:mt-14"
          disabled={
            !selectedPlaylist ||
            (selectedPlaylist && selectedPlaylist.tracks.total < 1)
          }
          onClick={getRecommendations}
        >
          DISCOVER MUSIC
        </button>
      </div>{" "}
      {recommendations && (
        <div className="mt-4 flex w-full flex-col gap-6">
          <div className="flex w-full flex-col justify-between gap-3 sm:flex-row">
            <h1 className="text-lg font-black xs:text-2xl">
              Suggestions based on {latestSearchedPlaylist.name}
            </h1>
            {createdPlaylist ? (
              <a
                className="h-fit min-w-fit rounded-full border border-[#1db954] bg-[#1db954]  px-6 py-2 text-center text-xs font-bold text-white duration-100 ease-in-out hover:border-[#1ed760] hover:bg-[#1ed760]"
                href={`https://open.spotify.com/playlist/${createdPlaylist.id}`}
                target="_blank"
              >
                OPEN IN SPOTIFY
              </a>
            ) : (
              <button
                className="h-fit min-w-fit rounded-full border border-white bg-[#000000] px-6 py-2 text-xs font-bold text-white duration-100 ease-in-out hover:bg-[#ffffff] hover:text-[#000000]"
                onClick={addPlaylist}
              >
                SAVE TO SPOTIFY
              </button>
            )}
          </div>
          {mapTopTracks()}
        </div>
      )}
    </section>
  );
};

export default Playlists;
