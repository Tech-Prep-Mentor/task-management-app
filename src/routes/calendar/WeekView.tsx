import { DateTime } from "luxon";
import React from "react";
import TimeBar from "./TimeBar";
import SingleDay from "./SingleDay";

type Props = {
  week: DateTime[];
};

function Week({ week }: Props) {
  return (
    <div className="flex h-full min-w-[700px] max-w-full flex-col bg-purple-400">
      <div className="flex min-h-16 min-w-[700px] max-w-full flex-row ">
        <div className="h-16 w-16 border-b-[1px]" />
        <div className="grid h-16 flex-1 grid-cols-7 items-center bg-white">
          {week.map((day, i) => (
            <div key={i} className="flex flex-col items-center justify-center">
              <div>{day.toFormat("ccc").toUpperCase()}</div>
              <div>{day.toFormat("d")}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="max-h-full min-w-[700px] max-w-full overflow-y-auto">
        <div className="flex flex-row">
          <TimeBar />
          <div className="grid flex-1 grid-cols-7">
            {week.map((day, i) => (
              <SingleDay key={i} height="64px" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Week;
