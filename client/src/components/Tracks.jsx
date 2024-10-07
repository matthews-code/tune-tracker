import React, { useState, useEffect } from "react";
import { accessToken, getTopTracks } from "../spotify";
import { catchErrors } from "../utils";
import TimeFrameHeader from "./subcomponents/TimeFrameHeader";
import IndivTrack from "./subcomponents/IndivTrack";

const Tracks = () => {
  const [timeFrame, setTimeFrame] = useState("all_time");
  const [token, setToken] = useState(null);
  const [topTracks, setTopTracks] = useState(null);
  const [topTracksMedTerm, setTopTracksMedTerm] = useState(null);
  const [topTracksShortTerm, setTopTracksShortTerm] = useState(null);

  useEffect(() => {
    if (!token) {
      setToken(accessToken);
    }

    const fetchData = async () => {
      const [allTime, medTerm, shortTerm] = await Promise.all([
        getTopTracks(50),
        getTopTracks(50, "medium_term"),
        getTopTracks(50, "short_term"),
      ]);

      const [allTimeData, mediumTermData, shortTermData] = await Promise.all([
        allTime.json(),
        medTerm.json(),
        shortTerm.json(),
      ]);

      setTopTracks(allTimeData.items);
      setTopTracksMedTerm(mediumTermData.items);
      setTopTracksShortTerm(shortTermData.items);
    };

    if (token) {
      const wrappedFetchData = catchErrors(fetchData);
      wrappedFetchData();
    }
  }, [token]);

  const mapTopTracks = () => {
    if (timeFrame === "all_time") {
      if (topTracks) {
        return topTracks.map((track) => {
          return <IndivTrack key={track.id} track={track} />;
        });
      }
    } else if (timeFrame === "six_months") {
      if (topTracksMedTerm) {
        return topTracksMedTerm.map((track) => {
          return <IndivTrack key={track.id} track={track} />;
        });
      }
    } else if (timeFrame === "four_weeks") {
      if (topTracksShortTerm) {
        return topTracksShortTerm.map((track) => {
          return <IndivTrack key={track.id} track={track} />;
        });
      }
    }
  };

  return (
    <section className="mx-auto flex w-[75%] max-w-[1240px] flex-col items-center gap-10">
      <TimeFrameHeader
        title="Tracks"
        timeFrame={timeFrame}
        setTimeFrame={setTimeFrame}
      />
      <div className="flex w-full flex-col gap-6">{mapTopTracks()}</div>
    </section>
  );
};

export default Tracks;
