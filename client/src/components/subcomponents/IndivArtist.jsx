import React from "react";

const IndivArtist = ({ artist, grid }) => {
  return grid ? (
    <div className="flex flex-col items-center">
      <div className="h-[150px] w-[150px] md:h-[210px] md:w-[210px]">
        <img
          src={artist.images[1].url}
          alt={`Spotify Photo of ${artist.name}`}
          className="h-full w-full rounded-full object-cover"
        />
      </div>
      <p className="my-5 text-center text-lg font-semibold">{artist.name}</p>
    </div>
  ) : (
    <div className="flex gap-4">
      <div className="h-[50px] w-[50px]">
        <img
          src={artist.images[2].url}
          alt={`Spotify Photo of ${artist.name}`}
          className="h-full w-full rounded-full object-cover"
        />
      </div>
      <p className="inline pt-4 text-sm font-semibold">{artist.name}</p>
    </div>
  );
};

export default IndivArtist;
