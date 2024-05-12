import React from 'react';
import { DateTime } from 'luxon';

type CalendarProps = {
  month: DateTime[][];
};

type DayProps = {
  day: DateTime;
};

type InMonthEvent = {
  start: DateTime;
  end: DateTime;
  title: string;
};

const sortedEvents: InMonthEvent[] = [
  {
    start: DateTime.local(2024, 4, 1, 10, 0),
    end: DateTime.local(2024, 4, 1, 11, 0),
    title: 'Meeting',
  },
  {
    start: DateTime.local(2024, 4, 1, 12, 0),
    end: DateTime.local(2024, 4, 1, 13, 45),
    title: 'Lunch',
  },
  {
    start: DateTime.local(2024, 4, 1, 14, 30),
    end: DateTime.local(2024, 4, 1, 23, 0),
    title: 'Workshop',
  },
  {
    start: DateTime.local(2024, 4, 1, 8, 0),
    end: DateTime.local(2024, 4, 1, 9, 0),
    title: 'Breakfast',
  },
  {
    start: DateTime.local(2024, 4, 1, 15, 0),
    end: DateTime.local(2024, 4, 1, 16, 0),
    title: 'Coffee',
  },
  {
    start: DateTime.local(2024, 4, 1, 18, 0),
    end: DateTime.local(2024, 4, 1, 19, 0),
    title: 'Dinner',
  },
  {
    start: DateTime.local(2024, 4, 1, 10, 0),
    end: DateTime.local(2024, 4, 1, 11, 0),
    title: "Hey I'm dead",
  },
  {
    start: DateTime.local(2024, 4, 1, 12, 0),
    end: DateTime.local(2024, 4, 1, 13, 45),
    title: 'Lunch',
  },
];

function Day({ day }: DayProps) {
  // TODO: Update to use event data from props
  const events = sortedEvents.filter((event) =>
    event.start.hasSame(day, 'day'),
  );
  // take first 4 events for display
  const truncatedData = events.slice(0, 4);
  const numberOfEventsNotDisplayed = events.length - truncatedData.length;
  return (
    <div className="flex-1 border-b-[1px] border-l-[1px]">
      <div className="flex h-7 w-full items-center justify-center bg-blue-100">
        {day.toFormat('d')}
      </div>
      <div className="flex-1 overflow-y-clip">
        {truncatedData.map((event, i) => (
          <div key={i} className="flex h-6 flex-col bg-red-300">
            <div className="flex items-center justify-start">{event.title}</div>
          </div>
        ))}
        {numberOfEventsNotDisplayed > 0 && (
          <div className="h-7 bg-cyan-300">
            <div className="flex items-center justify-start">{`${numberOfEventsNotDisplayed} more...`}</div>
          </div>
        )}
      </div>
    </div>
  );
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
      <div className="w-full flex-1 bg-white">
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
