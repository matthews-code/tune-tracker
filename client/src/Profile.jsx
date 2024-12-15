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
    if (!token) {
      setToken(accessToken);
    }

    const fetchData = async () => {
      const [
        profileResponse,
        playlistsResponse,
        topArtistsResponse,
        topTracksResponse,
      ] = await Promise.all([
        getCurrentUserProfile(),
        getUserNumPlaylists(),
        getTopArtists(),
        getTopTracks(),
      ]);

      const [profile, playlists, topArtists, topTracks] = await Promise.all([
        profileResponse.json(),
        playlistsResponse.json(),
        topArtistsResponse.json(),
        topTracksResponse.json(),
      ]);

      // console.log(profile, playlists, topArtists, topTracks);

      setProfile({ ...profile, playlists });
      setTopArtists(topArtists.items);
      setTopTracks(topTracks.items);
    };

    if (token) {
      const wrappedFetchData = catchErrors(fetchData);
      wrappedFetchData();
    }
  }, [token]);

  const mapTopArtists = () => {
    if (topArtists && topArtists.length > 0) {
      return topArtists.map((artist) => {
        return <IndivArtist key={artist.id} artist={artist} grid={false} />;
      });
    }
  };

  const mapTopTracks = () => {
    if (topTracks && topTracks.length > 0) {
      return topTracks.map((track) => {
        return <IndivTrack key={track.id} track={track} />;
      });
    }
  };

  return (
    <>
      <section className="mx-auto flex w-[90%] max-w-[1240px] flex-col items-center xs:w-[75%]">
        <div className="h-[100px] w-[100px] xs:h-[130px] xs:w-[130px]">
          <img
            src={
              profile?.images[0]?.url ||
              "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
            }
            alt={`Profile Image of ${profile?.display_name}`}
            className="h-full rounded-full object-cover"
          />
        </div>
        <a
          href={profile?.external_urls.spotify}
          target="_blank"
          className="pt-4 text-2xl font-bold duration-100 ease-in-out hover:text-[#385844] xs:text-4xl"
        >
          <h1 className="text-center">
            {profile?.display_name || "Spotify User"}
          </h1>
        </a>
        <div className="mt-3 flex items-center gap-8">
          <div>
            <p className="text-center text-base font-bold text-[#1ed760] xs:text-lg">
              {profile?.followers.total || 0}
            </p>
            <p className="mt-1 text-xs font-semibold text-[#9b9b9b]">
              FOLLOWERS
            </p>
          </div>
          <div>
            <p className="text-center text-base font-bold text-[#1ed760] xs:text-lg">
              {profile?.playlists.total || 0}
            </p>
            <p className="mt-1 text-xs font-semibold text-[#9b9b9b]">
              PLAYLISTS
            </p>
          </div>
        </div>
        {token && (
          <button
            className="mt-5 w-28 rounded-full border border-white px-6 py-2.5 text-xs font-bold text-white duration-100 ease-in-out hover:bg-white hover:text-black xs:mt-8"
            onClick={logout}
          >
            LOGOUT
          </button>
        )}
        {!token && (
          <a
            className="mt-5 w-28 rounded-full border border-white px-6 py-2.5 text-center text-xs font-bold text-white duration-100 ease-in-out hover:bg-white hover:text-black xs:mt-8"
            href={`${import.meta.env.VITE_FRONTEND_URI}/login`}
          >
            LOGIN
          </a>
        )}
      </section>
      <section className="mx-auto mt-12 grid w-[90%] max-w-[1240px] grid-cols-1 gap-10 xs:mt-20 xs:w-[75%] md:grid-cols-2">
        <div>
          <div className="flex flex-col justify-between gap-2 sm:flex-row">
            <h2 className="text-base font-black xs:text-lg">
              Top Artists of All Time
            </h2>
            <Link
              to={"/artists"}
              className="h-fit whitespace-nowrap rounded-full border border-white px-6 py-2.5 text-center text-xs font-bold text-white duration-100 ease-in-out hover:bg-white hover:text-black"
            >
              SEE MORE
            </Link>
          </div>
          <div className="mt-6 flex flex-col gap-6">{mapTopArtists()}</div>
        </div>
        <div>
          <div className="flex flex-col justify-between gap-2 sm:flex-row">
            <h2 className="text-base font-black xs:text-lg">
              Top Tracks of All Time
            </h2>
            <Link
              to={"/tracks"}
              className="h-fit whitespace-nowrap rounded-full border border-white px-6 py-2.5 text-center text-xs font-bold text-white duration-100 ease-in-out hover:bg-white hover:text-black"
            >
              SEE MORE
            </Link>
          </div>
          <div className="mt-6 flex flex-col gap-6">{mapTopTracks()}</div>
        </div>
      </section>
    </>
  );
};

export default Profile;
