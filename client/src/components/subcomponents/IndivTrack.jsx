import React from "react";

const IndivTrack = ({ track }) => {
  return (
    <div className="flex gap-4">
      <div className="h-[50px] w-[50px]">
        <img
          src={track.album.images[2].url}
          alt={`Album Cover of ${track.album.name}`}
          className="h-full object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-1 justify-between">
        <div id="track" className="min-w-0 pr-2">
          <p className="truncate text-sm font-semibold">{track.name}</p>
          <p className="truncate text-sm text-[#9b9b9b]">
            {track.artists[0].name}{" "}
            <span className="text-lg">&nbsp;&#183;&nbsp;</span>{" "}
            {track.album.name}
          </p>
        </div>
        <p className="w-max text-sm font-semibold text-[#9b9b9b]">
          {Math.round(track.duration_ms / 1000 / 60)}:
          {(track.duration_ms / 1000) % 60 < 10 ? "0" : ""}
          {Math.round(track.duration_ms / 1000) % 60}
        </p>
      </div>
    </div>
  );
};

export default IndivTrack;
