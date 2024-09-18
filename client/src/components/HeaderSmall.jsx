import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { PiMicrophoneStageFill } from "react-icons/pi";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { BiSolidPlaylist } from "react-icons/bi";
import { IoLogoGithub } from "react-icons/io";

const HeaderSmall = () => {
  return (
    <section
      id="sidebar"
      className="fixed bottom-0 flex w-screen justify-between rounded-sm bg-[#121212] md:hidden"
    >
      <ul className="flex w-full items-center justify-center">
        <li className="w-full">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `border-2 border-[#121212]   ${
                isActive
                  ? "border-t-green-400 bg-[#181818] text-white"
                  : "border-t-[#121212] text-[#9b9b9b] hover:border-t-green-400 hover:bg-[#181818] hover:text-white"
              }`
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
              `border-2 border-[#121212]   ${
                isActive
                  ? "border-t-green-400 bg-[#181818] text-white "
                  : "border-t-[#121212] text-[#9b9b9b] hover:border-t-green-400 hover:bg-[#181818] hover:text-white"
              }`
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
              `border-2 border-[#121212]   ${
                isActive
                  ? "border-t-green-400 bg-[#181818] text-white "
                  : "border-t-[#121212] text-[#9b9b9b] hover:border-t-green-400 hover:bg-[#181818] hover:text-white"
              }`
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
              `border-2 border-[#121212]   ${
                isActive
                  ? "border-t-green-400 bg-[#181818] text-white "
                  : "border-t-[#121212] text-[#9b9b9b] hover:border-t-green-400 hover:bg-[#181818] hover:text-white"
              }`
            }
          >
            <div className="flex w-full flex-col items-center gap-1">
              <BiSolidPlaylist size={18} />
              <p>Playlists</p>
            </div>
          </NavLink>
        </li>
      </ul>
    </section>
  );
};

export default HeaderSmall;
