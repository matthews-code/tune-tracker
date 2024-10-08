import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { catchErrors } from "../utils";
import { getArtist, accessToken } from "../spotify";

const ArtistPage = () => {
  const { id } = useParams();
  const [token, setToken] = useState(null);
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    if (!token) {
      setToken(accessToken);
    }

    const fetchData = async () => {
      const getArtistRes = await getArtist(id);
      const artistData = await getArtistRes.json();
      console.log(artistData);
      setArtist(artistData);
    };

    if (token) {
      const wrappedFetchData = catchErrors(fetchData);
      wrappedFetchData();
    }
  }, [token]);

  return (
    token &&
    artist && (
      <div className="flex h-[calc(100vh-152px)] flex-col items-center justify-center text-center">
        <div className="h-[140px] w-[140px] xs:h-[180px] xs:w-[180px] md:h-[220px] md:w-[220px]">
          <img
            src={artist.images[0].url}
            alt={`Spotify Photo of ${artist.name}`}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <div className="mt-4 flex flex-col gap-5 md:mt-6 md:gap-8">
          <a
            className="duration-100 ease-in-out hover:text-[#1db954]"
            href={artist.external_urls.spotify}
          >
            <h1 className="text-xl font-bold md:text-4xl">{artist.name}</h1>
          </a>
          <div className="pt-4">
            <p className="md:text-xl">
              {artist.followers.total.toLocaleString()}
            </p>
            <p className="text-sm text-[#9b9b9b] md:text-lg">Followers</p>
          </div>
          <div>
            <p className="md:text-xl">{artist.popularity}%</p>
            <p className="text-sm text-[#9b9b9b] md:text-lg">Popularity</p>
          </div>
          <div>
            {artist.genres.length > 0 ? (
              artist.genres.map((genre) => (
                <p key={genre} className="capitalize md:text-xl">
                  {genre}
                </p>
              ))
            ) : (
              <p className="md:text-xl">n/a</p>
            )}
            <p className="text-sm text-[#9b9b9b] md:text-lg">Genres</p>
          </div>
        </div>
      </div>
    )
  );
};

export default ArtistPage;
