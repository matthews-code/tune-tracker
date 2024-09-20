import React from "react";

const obj = {
  collaborative: false,
  description: "",
  external_urls: {
    spotify: "https://open.spotify.com/playlist/6sMttNAtdTrRK51vr13cfu",
  },
  href: "https://api.spotify.com/v1/playlists/6sMttNAtdTrRK51vr13cfu",
  id: "6sMttNAtdTrRK51vr13cfu",
  images: [
    {
      height: null,
      url: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84936c176c10be19a3ba86997b",
      width: null,
    },
  ],
  name: "Old but Gold",
  owner: {
    display_name: "Matthew Buensalida",
    external_urls: {
      spotify: "https://open.spotify.com/user/oou8ymqpda0tyxqkedxd6f0qe",
    },
    href: "https://api.spotify.com/v1/users/oou8ymqpda0tyxqkedxd6f0qe",
    id: "oou8ymqpda0tyxqkedxd6f0qe",
    type: "user",
    uri: "spotify:user:oou8ymqpda0tyxqkedxd6f0qe",
  },
  primary_color: null,
  public: true,
  snapshot_id: "AAAAQOBPKVl33h8SCHEKxP+QDiqsjkjW",
  tracks: {
    href: "https://api.spotify.com/v1/playlists/6sMttNAtdTrRK51vr13cfu/tracks",
    total: 49,
  },
  type: "playlist",
  uri: "spotify:playlist:6sMttNAtdTrRK51vr13cfu",
};

const IndivPlaylist = ({ playlist }) => {
  console.log(playlist);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-[140px] w-[140px] md:h-[220px] md:w-[220px]">
        <img
          src={playlist.images[0].url}
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
