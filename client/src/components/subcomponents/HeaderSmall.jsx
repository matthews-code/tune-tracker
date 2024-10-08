import React from "react";
import { NavLink } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { BsStars } from "react-icons/bs";
import { FaMicrophoneLines } from "react-icons/fa6";

const HeaderSmall = () => {
  return (
    <section
      // id="sidebar"
      className="sidebar fixed bottom-0 z-10 flex w-screen justify-between rounded-sm bg-[#121212] md:hidden"
    >
      <ul className="flex w-full items-center justify-center">
        <li className="w-full">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "border-t-2 border-t-green-400 bg-[#181818] text-white"
                : "border-t-2 border-t-[#121212] text-[#9b9b9b] hover:border-t-green-400 hover:bg-[#181818] hover:text-white"
            }
          >
            <div className="flex w-full flex-col items-center gap-1">
              <FaUserAlt size={15} />
              <p>Profile</p>
            </div>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink
            to="/artists"
            end
            className={({ isActive }) =>
              isActive
                ? "border-t-2 border-t-green-400 bg-[#181818] text-white"
                : "border-t-2 border-t-[#121212] text-[#9b9b9b] hover:border-t-green-400 hover:bg-[#181818] hover:text-white"
            }
          >
            <div className="flex w-full flex-col items-center gap-1">
              <FaMicrophoneLines size={15} />
              <p>Top Artists</p>
            </div>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink
            to="/tracks"
            end
            className={({ isActive }) =>
              isActive
                ? "border-t-2 border-t-green-400 bg-[#181818] text-white"
                : "border-t-2 border-t-[#121212] text-[#9b9b9b] hover:border-t-green-400 hover:bg-[#181818] hover:text-white"
            }
          >
            <div className="flex w-full flex-col items-center gap-1">
              <BsMusicNoteBeamed size={15} />
              <p>Top Tracks</p>
            </div>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink
            to="/playlists"
            className={({ isActive }) =>
              isActive
                ? "border-t-2 border-t-green-400 bg-[#181818] text-white"
                : "border-t-2 border-t-[#121212] text-[#9b9b9b] hover:border-t-green-400 hover:bg-[#181818] hover:text-white"
            }
          >
            <div className="flex w-full flex-col items-center gap-1">
              <BsStars size={15} />
              <p>Playlists</p>
            </div>
          </NavLink>
        </li>
      </ul>
    </section>
  );
};

export default HeaderSmall;
