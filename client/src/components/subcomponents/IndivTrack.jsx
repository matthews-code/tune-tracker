import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillInfoCircle } from "react-icons/ai";

const IndivTrack = ({ track }) => {
  const [hover, setHover] = useState(false);

  const formatDuration = (durationMs) => {
    const totalSeconds = Math.floor(durationMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${formattedSeconds}`;
  };

  return (
    <Link
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      to={`/tracks/${track.id}`}
      className="flex gap-3"
    >
      <div className="relative h-[50px] w-[50px]">
        <AiFillInfoCircle
          size={28}
          className={`absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 duration-100 ease-in-out ${
            hover ? "opacity-100" : "opacity-0"
          }`}
        />
        <img
          src={track.album.images[2].url}
          alt={`Album Cover of ${track.album.name}`}
          className={`h-full object-cover duration-200 ease-in-out ${
            hover ? "opacity-60" : ""
          }`}
        />
      </div>
      <div className="flex min-w-0 flex-1 justify-between">
        <div id="track" className="min-w-0 pr-2">
          <p
            className={`truncate text-sm font-semibold ${
              hover ? "underline" : ""
            }`}
          >
            {track.name}
          </p>
          <p className="truncate text-sm text-[#9b9b9b]">
            {track.artists[0].name}{" "}
            <span className="text-lg">&nbsp;&#183;&nbsp;</span>{" "}
            {track.album.name}
          </p>
        </div>
        <p className="w-max text-sm font-semibold text-[#9b9b9b]">
          {formatDuration(track.duration_ms)}
        </p>
      </div>
    </Link>
  );
};

export default IndivTrack;
