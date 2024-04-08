import React from 'react';
import { DateTime } from 'luxon';

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
    () => month[0].map((day) => day.toFormat('ccc').toUpperCase()),
    [month],
  );
  return (
    <div className="flex h-full w-full flex-col items-center bg-white">
      <div className="w-full shrink-0 grow-0 basis-10">
        <div className="grid h-full w-full grid-cols-7 items-center">
          {daysOfWeek.map((day, i) => (
            <div key={i} className="flex-1 text-center">
              {day}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex-1 bg-blue-300">
        <div
          className={`grid h-full w-full grid-cols-7 grid-rows-${month.length} border-r-[1px]`}
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
    </div>
  );
}

function getMonthMatrixFromDay(day: DateTime): DateTime[][] {
  const month = day.startOf('month');
  const firstDay = month.startOf('week');
  const lastDay = month.endOf('month').endOf('week');
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

function MonthView({ selectedDate }: { selectedDate: DateTime }) {
  const monthMatrix = React.useMemo(
    () => getMonthMatrixFromDay(selectedDate),
    [selectedDate],
  );

  return <Month month={monthMatrix} />;
}

export default MonthView;
