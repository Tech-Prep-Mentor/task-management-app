import React from "react";
import { DateTime } from "luxon";

type CalendarProps = {
  month: DateTime[][];
};

type DayProps = {
  day: DateTime;
};

function Day({ day }: DayProps) {
  return <div className="flex-1 border-b-[1px] border-l-[1px]">{day.day}</div>;
}

function Month({ month }: CalendarProps) {
  const daysOfWeek = React.useMemo(
    () => month[0].map((day) => day.toFormat("ccc").toUpperCase()),
    [month],
  );
  return (
    <div className="h-full flex-1">
      <div className="grid grid-cols-7">
        {daysOfWeek.map((day, i) => (
          <div key={i} className="flex-1 text-center">
            {day}
          </div>
        ))}
      </div>
      <div
        className={`grid flex-1 grid-cols-7 grid-rows-${month.length} h-full border-r-[1px]`}
      >
        {month.map((week, i) => (
          <React.Fragment key={i}>
            {week.map((day, j) => (
              <Day key={j} day={day} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Month;
