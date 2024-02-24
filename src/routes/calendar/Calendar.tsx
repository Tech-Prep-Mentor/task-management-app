import { DateTime } from "luxon";
import React from "react";
import Month from "./Month";

function getMonthMatrixFromDay(day: DateTime): DateTime[][] {
  const month = day.startOf("month");
  const firstDay = month.startOf("week");
  const lastDay = month.endOf("month").endOf("week");
  const monthMatrix: DateTime[][] = [];
  let week: DateTime[] = [];
  for (let i = firstDay; i <= lastDay; i = i.plus({ days: 1 })) {
    if (week.length === 7) {
      monthMatrix.push(week);
      week = [];
    }
    week.push(i);
  }
  monthMatrix.push(week);
  return monthMatrix;
}

function Calendar() {
  const month = React.useMemo(
    () => getMonthMatrixFromDay(DateTime.local()),
    [],
  );
  return (
    <div className="h-screen p-10">
      <Month month={month} />
    </div>
  );
}

export default Calendar;
