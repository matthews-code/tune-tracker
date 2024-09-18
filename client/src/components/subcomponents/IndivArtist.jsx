import React from "react";

const IndivArtist = ({ artist }) => {
  return (
    <div className="flex gap-4">
      <div className="min-w-[50px] max-w-[50px]">
        <img
          src={artist.images[2].url}
          alt={`Spotify Photo of ${artist.name}`}
          className="h-full rounded-full object-cover"
        />
      </div>
      <p className="inline pt-4 text-sm font-semibold">{artist.name}</p>
    </div>
  );
};

export default IndivArtist;
