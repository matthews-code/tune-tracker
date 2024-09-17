import React, { useEffect, useState } from "react";
import { catchErrors } from "./utils";
import {
  accessToken,
  logout,
  getCurrentUserProfile,
  getUserNumPlaylists,
} from "./spotify";

const Profile = () => {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      const profileResponse = await getCurrentUserProfile();
      const data = await profileResponse.json();

      const playlistsResponse = await getUserNumPlaylists();
      const playlists = await playlistsResponse.json();

      setProfile({ ...data, playlists });
    };

    if (accessToken) {
      const wrappedFetchData = catchErrors(fetchData);
      wrappedFetchData();
    }
  }, []);

  console.log(profile);

  return (
    <section className="w-full py-14">
      <div className="mx-auto flex w-[90%] flex-col items-center">
        {!token && <a href="http://localhost:3000/login">login</a>}
        <div className="h-[150px] w-[150px]">
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
          {profile?.display_name}
        </a>
        <div className="flex items-center gap-2">
          <p>Followers: {profile?.followers.total}</p>
          <p>Playlists: {profile?.playlists.total}</p>
        </div>
        <button className="bg-slate-500" onClick={logout}>
          Logout
        </button>
      </div>
    </section>
  );
};

export default Profile;
