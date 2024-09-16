import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <section
      id="sidebar"
      className="m-2 flex h-[calc(100vh-16px)] w-[100px] rounded-sm bg-[#121212]"
    >
      <ul className="flex w-full flex-col items-center justify-center">
        <li className="w-full text-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "border-l-2 border-l-green-400 bg-[#181818]"
                : "border-l-2 border-l-[#121212] hover:border-l-green-400 hover:bg-[#181818]"
            }
          >
            Profile
          </NavLink>
        </li>
        <li className="w-full text-center">
          <NavLink
            to="/artists"
            className={({ isActive }) =>
              isActive
                ? "border-l-2 border-l-green-400 bg-[#181818]"
                : "border-l-2 border-l-[#121212] hover:border-l-green-400 hover:bg-[#181818]"
            }
          >
            Top Artists
          </NavLink>
        </li>
        <li className="w-full text-center">
          <NavLink
            to="/tracks"
            className={({ isActive }) =>
              isActive
                ? "border-l-2 border-l-green-400 bg-[#181818]"
                : "border-l-2 border-l-[#121212] hover:border-l-green-400 hover:bg-[#181818]"
            }
          >
            Top Tracks
          </NavLink>
        </li>
        <li className="w-full text-center">
          <NavLink
            to="/playlists"
            className={({ isActive }) =>
              isActive
                ? "border-l-2 border-l-green-400 bg-[#181818]"
                : "border-l-2 border-l-[#121212] hover:border-l-green-400 hover:bg-[#181818]"
            }
          >
            Playlists
          </NavLink>
        </li>
      </ul>
    </section>
  );
};

export default Header;
