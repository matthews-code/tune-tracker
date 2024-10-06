import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillInfoCircle } from "react-icons/ai";

const IndivArtist = ({ artist, grid }) => {
  const [hover, setHover] = useState(false);

  return grid ? (
    <Link
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      to={`/artists/${artist.id}`}
      className="flex flex-col items-center gap-4"
    >
      <div className="relative h-[130px] w-[130px] md:h-[210px] md:w-[210px]">
        <AiFillInfoCircle
          size={60}
          className={`absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 duration-100 ease-in-out ${
            hover ? "opacity-100" : "opacity-0"
          }`}
        />
        <img
          src={artist.images[1].url}
          alt={`Spotify Photo of ${artist.name}`}
          className={`h-full w-full rounded-full object-cover duration-200 ease-in-out ${
            hover ? "opacity-60" : ""
          }`}
        />
      </div>
      <p className="pb-4 text-center text-lg font-bold">{artist.name}</p>
    </Link>
  ) : (
    // <div className="flex gap-4 hover:cursor-pointer">
    <Link
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      to={`/artists/${artist.id}`}
      className="flex gap-4"
    >
      <div className="relative h-[50px] w-[50px]">
        <AiFillInfoCircle
          size={28}
          className={`absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 duration-100 ease-in-out ${
            hover ? "opacity-100" : "opacity-0"
          }`}
        />
        <img
          src={artist.images[2].url}
          alt={`Spotify Photo of ${artist.name}`}
          className={`h-full w-full rounded-full object-cover duration-200 ease-in-out ${
            hover ? "opacity-60" : ""
          }`}
        />
      </div>
      <p
        className={`inline pt-4 text-sm font-semibold ${
          hover ? "underline" : ""
        }`}
      >
        {artist.name}
      </p>
    </Link>
    // </div>
  );
};

export default IndivArtist;
