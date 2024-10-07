import React from "react";

const IndivPlaylist = ({ playlist }) => {
  // console.log(playlist);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-[120px] w-[120px] md:h-[160px] md:w-[160px]">
        <img
          src={playlist.images ? playlist.images[0].url : null}
          alt={`Playlist Photo of ${playlist.name}`}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="text-center">
        <p className="font-bold">{playlist.name}</p>
        <p className="text-sm text-[#9b9b9b]">{playlist.tracks.total} Tracks</p>
      </div>
    </div>
  );
};

export default IndivPlaylist;
