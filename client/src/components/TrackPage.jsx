import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { catchErrors } from "../utils";
import { getTrack, accessToken } from "../spotify";

const TrackPage = () => {
  const { id } = useParams();
  const [token, setToken] = useState(null);
  const [track, setTrack] = useState(null);

  useEffect(() => {
    if (!token) {
      setToken(accessToken);
    }

    const fetchData = async () => {
      const getTrackRes = await getTrack(id);
      const [trackData, trackAudioFeatures] = await Promise.all([
        getTrackRes[0].json(),
        getTrackRes[1].json(),
      ]);
      console.log(trackData);
      console.log(trackAudioFeatures);
      setTrack({ trackData, trackAudioFeatures });
    };

    if (token) {
      const wrappedFetchData = catchErrors(fetchData);
      wrappedFetchData();
    }
  }, [token]);

  useEffect(() => {
    console.log(track);
  }, [track]);

  return (
    token &&
    track && (
      <>
        <section className="mx-auto flex w-[88%] max-w-[1240px] flex-col items-center">
          <div className="flex w-full flex-col items-center gap-8 md:flex-row">
            <div className="h-[180px] min-w-[180px] max-w-[180px] md:h-[260px] md:w-[260px]">
              <img
                src={track.trackData.album.images[0].url}
                alt={`Album Cover for ${track.trackData.name}`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex grow flex-col gap-2 text-center">
              <h1 className="text-3xl font-bold">{track.trackData.name}</h1>
              <h2 className="text-xl font-bold text-[#b3b3b3]">
                {track.trackData.artists[0].name}
              </h2>
              <h3 className="text-[#b3b3b3]">
                {track.trackData.album.name}{" "}
                <span className=" text-xl">&nbsp;&#183;&nbsp;</span>{" "}
                {track.trackData.album.release_date.split("-")[0]}
              </h3>
              <a
                href={track.trackData.external_urls.spotify}
                target="_blank"
                className="m-auto mt-5 w-fit rounded-full bg-[#1db954] px-6 py-2 text-sm font-bold text-white"
              >
                PLAY ON SPOTIFY
              </a>
            </div>
          </div>
        </section>
        <section className="mx-auto mt-24 grid w-[88%] max-w-[1240px] gap-20 md:grid-cols-2"></section>
      </>
    )
  );
};

export default TrackPage;
