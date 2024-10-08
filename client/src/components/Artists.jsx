import React, { useState, useEffect } from "react";
import { accessToken, getTopArtists } from "../spotify";
import { catchErrors } from "../utils";
import TimeFrameHeader from "./subcomponents/TimeFrameHeader";
import IndivArtist from "./subcomponents/IndivArtist";

const Artists = () => {
  const [timeFrame, setTimeFrame] = useState("all_time");
  const [token, setToken] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [topArtistsMedTerm, setTopArtistsMedTerm] = useState(null);
  const [topArtistsShortTerm, setTopArtistsShortTerm] = useState(null);

  useEffect(() => {
    if (!token) {
      setToken(accessToken);
    }

    const fetchData = async () => {
      const [allTime, medTerm, shortTerm] = await Promise.all([
        getTopArtists(50),
        getTopArtists(50, "medium_term"),
        getTopArtists(50, "short_term"),
      ]);

      const [allTimeData, mediumTermData, shortTermData] = await Promise.all([
        allTime.json(),
        medTerm.json(),
        shortTerm.json(),
      ]);

      setTopArtists(allTimeData.items);
      setTopArtistsMedTerm(mediumTermData.items);
      setTopArtistsShortTerm(shortTermData.items);
    };

    if (token) {
      const wrappedFetchData = catchErrors(fetchData);
      wrappedFetchData();
    }
  }, [token]);

  const mapTopArtists = () => {
    if (timeFrame === "all_time") {
      if (topArtists) {
        return topArtists.map((artist) => {
          return <IndivArtist key={artist.id} artist={artist} grid={true} />;
        });
      }
    } else if (timeFrame === "six_months") {
      if (topArtistsMedTerm) {
        return topArtistsMedTerm.map((artist) => {
          return <IndivArtist key={artist.id} artist={artist} grid={true} />;
        });
      }
    } else if (timeFrame === "four_weeks") {
      if (topArtistsShortTerm) {
        return topArtistsShortTerm.map((artist) => {
          return <IndivArtist key={artist.id} artist={artist} grid={true} />;
        });
      }
    }
  };

  return (
    <section className="mx-auto flex w-[90%] max-w-[1240px] flex-col items-center gap-10 xs:w-[75%]">
      <TimeFrameHeader
        title="Artists"
        timeFrame={timeFrame}
        setTimeFrame={setTimeFrame}
      />
      <div className="grid w-full grid-cols-[repeat(auto-fit,_minmax(110px,_1fr))] gap-4 xs:grid-cols-[repeat(auto-fit,_minmax(140px,_1fr))] xs:gap-8 md:grid-cols-[repeat(auto-fit,_minmax(190px,_1fr))]">
        {mapTopArtists()}
      </div>
    </section>
  );
};

export default Artists;
