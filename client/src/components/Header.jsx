import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { PiMicrophoneStageFill } from "react-icons/pi";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { BiSolidPlaylist } from "react-icons/bi";
import { IoLogoGithub } from "react-icons/io";

const Header = () => {
  return (
    <section
      id="sidebar"
      className="m-2 flex h-[calc(100vh-16px)] w-[100px] flex-col justify-between rounded-sm bg-[#121212]"
    >
      <Link to="/">
        <img
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png"
          alt="Logo of Spotify"
          className="mx-auto mt-4 w-1/2"
        />
      </Link>
      <ul className="flex w-full flex-col items-center justify-center">
        <li className="w-full">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "border-l-2 border-l-green-400 bg-[#181818] text-white"
                : "border-l-2 border-l-[#121212] text-[#9b9b9b] hover:border-l-green-400 hover:bg-[#181818] hover:text-white"
            }
          >
            <div className="flex w-full flex-col items-center gap-1">
              <FaUserAlt size={18} />
              <p>Profile</p>
            </div>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink
            to="/artists"
            className={({ isActive }) =>
              isActive
                ? "border-l-2 border-l-green-400 bg-[#181818] text-white"
                : "border-l-2 border-l-[#121212] text-[#9b9b9b] hover:border-l-green-400 hover:bg-[#181818] hover:text-white"
            }
          >
            <div className="flex w-full flex-col items-center gap-1">
              <PiMicrophoneStageFill size={18} />
              <p>Top Artists</p>
            </div>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink
            to="/tracks"
            className={({ isActive }) =>
              isActive
                ? "border-l-2 border-l-green-400 bg-[#181818] text-white"
                : "border-l-2 border-l-[#121212] text-[#9b9b9b] hover:border-l-green-400 hover:bg-[#181818] hover:text-white"
            }
          >
            <div className="flex w-full flex-col items-center gap-1">
              <BsMusicNoteBeamed size={18} />
              <p>Top Tracks</p>
            </div>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink
            to="/playlists"
            className={({ isActive }) =>
              isActive
                ? "border-l-2 border-l-green-400 bg-[#181818] text-white"
                : "border-l-2 border-l-[#121212] text-[#9b9b9b] hover:border-l-green-400 hover:bg-[#181818] hover:text-white"
            }
          >
            <div className="flex w-full flex-col items-center gap-1">
              <BiSolidPlaylist size={18} />
              <p>Playlists</p>
            </div>
          </NavLink>
        </li>
      </ul>
      <a href="">
        <IoLogoGithub className="mx-auto mb-4" size={40} />
      </a>
    </section>
  );
};

export default Header;
