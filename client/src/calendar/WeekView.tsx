import { DateTime } from 'luxon';
import React from 'react';
import TimeBar from './TimeBar';
import SingleDay from './SingleDay';

type Props = {
  selectedDate: DateTime;
};

// random rgb color for each day of the week
// const colors = [
//   'rgb(255, 99, 132)',
//   'rgb(54, 162, 235)',
//   'rgb(255, 206, 86)',
//   'rgb(75, 192, 192)',
//   'rgb(153, 102, 255)',
//   'rgb(255, 159, 64)',
//   'rgb(255, 99, 132)',
// ];

function Week({ selectedDate }: Props) {
  const week = React.useMemo(
    () => getWeekFromDay(selectedDate),
    [selectedDate],
  );

  const today = DateTime.local();

  return (
    <div className="flex max-h-full min-w-[700px] max-w-full flex-col bg-white">
      <div className="flex min-w-[700px] max-w-full shrink-0 grow-0 basis-16 flex-row">
        <div className="h-full shrink-0 grow-0 basis-16 border-b-[1px] bg-purple-400" />
        <div className="grid h-full flex-1 grid-cols-7 items-center bg-white">
          {week.map((day, i) => (
            <div key={i} className="flex flex-col items-center justify-center">
              <div>{day.toFormat('ccc').toUpperCase()}</div>
              <div>{day.toFormat('d')}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="min-w-[700px] max-w-full flex-1 overflow-y-scroll bg-blue-300">
        <div className="flex flex-row">
          <TimeBar />
          <div className="grid flex-1 grid-cols-7">
            {week.map((day, i) => (
              <SingleDay key={i} height="64px" isToday={day.equals(today)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function getWeekFromDay(day: DateTime): DateTime[] {
  const week = day.startOf('week');
  return Array.from({ length: 7 }).map((_, i) => week.plus({ days: i }));
}

export default Week;
