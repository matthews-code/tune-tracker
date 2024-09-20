import React, { useState, useEffect } from "react";
import TimeFrameHeader from "./subcomponents/TimeFrameHeader";

const Tracks = () => {
  const [timeFrame, setTimeFrame] = useState("all_time");
  return (
    <section className="mx-auto flex w-[88%] max-w-[1240px] flex-col items-center gap-10">
      <TimeFrameHeader
        title="Tracks"
        timeFrame={timeFrame}
        setTimeFrame={setTimeFrame}
      />
      <div className="grid w-full grid-cols-[repeat(auto-fit,_minmax(170px,_1fr))] gap-6 md:grid-cols-[repeat(auto-fit,_minmax(210px,_1fr))]">
        {/* {mapTopArtists()} */}
      </div>
    </section>
  );
};

export default Tracks;
