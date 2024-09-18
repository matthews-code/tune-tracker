import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IndivArtist from "./components/subcomponents/IndivArtist";
import IndivTrack from "./components/subcomponents/IndivTrack";
import { catchErrors } from "./utils";
import {
  accessToken,
  logout,
  getCurrentUserProfile,
  getUserNumPlaylists,
  getTopArtists,
  getTopTracks,
} from "./spotify";

const Profile = () => {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [topTracks, setTopTracks] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      const profileResponse = await getCurrentUserProfile();
      const data = await profileResponse.json();

      const playlistsResponse = await getUserNumPlaylists();
      const playlists = await playlistsResponse.json();

      const topArtistsResponse = await getTopArtists();
      const topArtists = await topArtistsResponse.json();

      const topTracksResponse = await getTopTracks();
      const topTracks = await topTracksResponse.json();

      setProfile({ ...data, playlists });
      setTopArtists(topArtists.items);
      setTopTracks(topTracks.items);
      console.log(topTracks.items);
    };

    if (accessToken) {
      const wrappedFetchData = catchErrors(fetchData);
      wrappedFetchData();
    }
  }, []);

  const mapTopArtists = () => {
    if (topArtists) {
      return topArtists.map((artist) => {
        return <IndivArtist key={artist.id} artist={artist} />;
      });
    }
  };

  const mapTopTracks = () => {
    if (topTracks) {
      return topTracks.map((track) => {
        return <IndivTrack key={track.id} track={track} />;
      });
    }
  };

  return (
    <>
      <section className="mx-auto flex w-[88%] max-w-[1240px] flex-col items-center">
        {!token && <a href="http://localhost:3000/login">login</a>}
        <div className="h-[130px] w-[130px]">
          <img
            src={profile?.images[1].url}
            alt={`Profile Image of ${profile?.display_name}`}
            className="h-full rounded-full object-cover"
          />
        </div>
        <a
          href={profile?.external_urls.spotify}
          target="_blank"
          className="pt-6 text-4xl font-bold duration-100 ease-in-out hover:text-[#1ed760]"
        >
          <h1 className="text-center">{profile?.display_name}</h1>
        </a>
        <div className="mt-3 flex items-center gap-8">
          <div className="">
            <p className="text-center text-lg font-bold text-[#1ed760]">
              {profile?.followers.total}
            </p>
            <p className="mt-1 text-xs font-semibold text-[#9b9b9b]">
              FOLLOWERS
            </p>
          </div>
          <div>
            <p className="text-center text-lg font-bold text-[#1ed760]">
              {profile?.playlists.total}
            </p>
            <p className="mt-1 text-xs font-semibold text-[#9b9b9b]">
              PLAYLISTS
            </p>
          </div>
        </div>
        <button
          className="mt-8 rounded-full border border-white px-6 py-2.5 text-xs font-bold text-white duration-100 ease-in-out hover:bg-white hover:text-black"
          onClick={logout}
        >
          LOGOUT
        </button>
      </section>
      <section className="mx-auto mt-24 grid w-[88%] max-w-[1240px] gap-20 md:grid-cols-2">
        <div>
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-black">Top Artists of All Time</h2>
            <Link
              to={"/artists"}
              className="whitespace-nowrap rounded-full border border-white px-6 py-2.5 text-xs font-bold text-white duration-100 ease-in-out hover:bg-white hover:text-black"
            >
              SEE MORE
            </Link>
          </div>
          <div className="mt-8 flex flex-col gap-6">{mapTopArtists()}</div>
        </div>
        <div>
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-black">Top Tracks of All Time</h2>
            <Link
              to={"/tracks"}
              className="whitespace-nowrap rounded-full border border-white px-6 py-2.5 text-xs font-bold text-white duration-100 ease-in-out hover:bg-white hover:text-black"
            >
              SEE MORE
            </Link>
          </div>
          <div className="mt-8 flex flex-col gap-6">{mapTopTracks()}</div>
        </div>
      </section>
    </>
  );
};

export default Profile;
