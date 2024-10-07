import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { catchErrors } from "../utils";
import { getTrack, accessToken } from "../spotify";
import BarChart from "./subcomponents/BarChart";

const pitchClassMap = {
  0: "C",
  1: "C#",
  2: "D",
  3: "D#",
  4: "E",
  5: "F",
  6: "F#",
  7: "G",
  8: "G#",
  9: "A",
  10: "A#",
  11: "B",
};

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

  const formatDuration = (durationMs) => {
    const totalSeconds = Math.floor(durationMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${formattedSeconds}`;
  };

  return (
    token &&
    track && (
      <section className="flex min-h-full flex-col ">
        <div className="mx-auto flex w-[75%] max-w-[1240px] flex-col items-center">
          <div className="flex w-full flex-col items-center gap-8 md:flex-row">
            <div className="h-[180px] min-w-[180px] max-w-[180px] md:h-[225px] md:w-[260px] md:min-w-[225px]">
              <img
                src={track.trackData.album.images[0].url}
                alt={`Album Cover for ${track.trackData.name}`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex grow flex-col gap-1 text-center md:text-left">
              <h1 className="text-3xl font-bold">{track.trackData.name}</h1>
              <h2 className="text-xl font-bold text-[#919191]">
                {track.trackData.artists[0].name}
              </h2>
              <h3 className="text-[#919191]">
                {track.trackData.album.name}{" "}
                <span className=" text-xl">&nbsp;&#183;&nbsp;</span>{" "}
                {track.trackData.album.release_date.split("-")[0]}
              </h3>
              <a
                href={track.trackData.external_urls.spotify}
                target="_blank"
                className="m-auto mt-5 w-fit rounded-full bg-[#1db954] px-6 py-2 text-sm font-bold text-white duration-100 ease-in-out hover:bg-[#1ed760] md:mx-0"
              >
                PLAY ON SPOTIFY
              </a>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-16 grid w-[75%] max-w-[700px] grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))] gap-10 md:gap-16">
          <div className="flex flex-col text-center">
            <p className="mb-1 text-2xl font-bold">
              {formatDuration(track.trackData.duration_ms)}
            </p>
            <p className="text-[#919191]">Duration</p>
          </div>
          <div className="flex flex-col text-center">
            <p className="mb-1 text-2xl font-bold">
              {track.trackData.popularity}%
            </p>
            <p className="text-[#919191]">Popularity</p>
          </div>
          <div className="flex flex-col text-center">
            <p className="mb-1 text-2xl font-bold">{`${
              pitchClassMap[track.trackAudioFeatures.key]
            } ${track.trackAudioFeatures.mode ? "Major" : "Minor"}`}</p>
            <p className="text-[#919191]">Key</p>
          </div>
          <div className="flex flex-col text-center">
            <p className="mb-1 text-2xl font-bold">
              {Number(track.trackAudioFeatures.tempo).toFixed(0)}
            </p>
            <p className="text-[#919191]">Tempo (BPM)</p>
          </div>
        </div>
        <div className="mx-auto mt-16 grid h-72 w-[75%] max-w-[1240px]">
          <BarChart features={track.trackAudioFeatures} />
          <a
            href="https://developer.spotify.com/documentation/web-api/reference/get-audio-features"
            target="_blank"
            className="mt-10 text-center text-[#919191] duration-100 ease-in-out hover:text-white hover:underline"
          >
            Full Description of Audio Features
          </a>
        </div>
      </section>
    )
  );
};

export default TrackPage;
