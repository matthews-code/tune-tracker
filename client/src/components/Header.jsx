import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <NavLink to="/">Profile</NavLink>
      <NavLink to="/artists">Artists</NavLink>
      <NavLink to="/tracks">Tracks</NavLink>
      <NavLink to="/playlists">Playlists</NavLink>
    </>
  );
};

export default Header;
