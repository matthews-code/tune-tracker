import React, { useState } from "react";

const Artists = () => {
  const [timeFrame, setTimeFrame] = useState("all_time");
  return (
    <section className="mx-auto flex w-[88%] max-w-[1240px] flex-col items-center">
      <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
        <h1 className="text-2xl font-black">Top Artists</h1>
        <div className="flex items-center gap-6 font-semibold">
          <p
            className={
              timeFrame === "all_time"
                ? "cursor-pointer border-b-2 duration-200 ease-in-out"
                : "cursor-pointer border-b-2 border-b-[#0b0b0b] text-[#9b9b9b] duration-200 ease-in-out hover:text-white"
            }
            onClick={() => setTimeFrame("all_time")}
          >
            All Time
          </p>
          <p
            className={
              timeFrame === "six_months"
                ? "cursor-pointer border-b-2 duration-200 ease-in-out"
                : "cursor-pointer border-b-2 border-b-[#0b0b0b] text-[#9b9b9b] duration-200 ease-in-out hover:text-white"
            }
            onClick={() => setTimeFrame("six_months")}
          >
            Last 6 Months
          </p>
          <p
            className={
              timeFrame === "four_weeks"
                ? "cursor-pointer border-b-2 duration-200 ease-in-out"
                : "cursor-pointer border-b-2 border-b-[#0b0b0b] text-[#9b9b9b] duration-200 ease-in-out hover:text-white"
            }
            onClick={() => setTimeFrame("four_weeks")}
          >
            Last 4 Weeks
          </p>
        </div>
      </div>
    </section>
  );
};

export default Artists;
