import { DateTime } from 'luxon';
import React, { useMemo } from 'react';

type InDayEvent = {
  start: DateTime;
  end: DateTime;
  title: string;
};

type Props = {
  height: string; // height of each hour block in pixels
  isToday: boolean;
};

const data: InDayEvent[] = [
  {
    start: DateTime.local(2024, 4, 10, 10, 0),
    end: DateTime.local(2024, 4, 10, 11, 0),
    title: 'Meeting',
  },
  {
    start: DateTime.local(2024, 4, 10, 12, 0),
    end: DateTime.local(2024, 4, 10, 13, 45),
    title: 'Lunch',
  },
  {
    start: DateTime.local(2024, 4, 10, 14, 30),
    end: DateTime.local(2024, 4, 10, 23, 0),
    title: 'Workshop',
  },
  {
    start: DateTime.local(2024, 4, 10, 8, 0),
    end: DateTime.local(2024, 4, 10, 9, 0),
    title: 'Breakfast',
  },
  {
    start: DateTime.local(2024, 4, 10, 15, 0),
    end: DateTime.local(2024, 4, 10, 16, 0),
    title: 'Coffee',
  },
  {
    start: DateTime.local(2024, 4, 10, 18, 0),
    end: DateTime.local(2024, 4, 10, 19, 0),
    title: 'Dinner',
  },
];

function compareEvents(a: InDayEvent, b: InDayEvent) {
  return a.start.valueOf() - b.start.valueOf();
}

function EventCard({
  event,
  minuteHeight,
}: {
  event: InDayEvent;
  minuteHeight: number;
}) {
  return (
    <div
      className="absolute w-full overflow-hidden rounded-lg bg-blue-500 p-2 text-white hover:border-2 hover:border-white hover:shadow-lg"
      style={{
        top: minuteHeight * (event.start.hour * 60 + event.start.minute),
        height: minuteHeight * event.end.diff(event.start, 'minutes').minutes,
      }}
    >
      {event.title}
    </div>
  );
}

function SingleDay({ height, isToday }: Props) {
  const now = useMemo(() => DateTime.local(), []);

  const sortedData = useMemo(() => data.sort(compareEvents), []);

  const minuteHeight = useMemo(() => parseFloat(height) / 60, [height]);

  const currentTimeLineOffset = useMemo(() => {
    if (isToday) {
      const minutes = now.minute + now.hour * 60;

      const res = Math.floor(minutes * minuteHeight);
      console.log(res);
      return res;
    }
    return 0;
  }, [isToday, now, minuteHeight]);

  return (
    <div className="relative flex-1 border-b-[1px] border-l-[1px] bg-white">
      <div className="grid grid-rows-[24]">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className={`static items-center justify-center border-t-[1px]`}
            style={{ height: height }}
          ></div>
        ))}
      </div>
      {/* <div className="absolute top-0 h-10 w-full bg-violet-500"></div> */}
      {sortedData.map((event, i) => (
        <EventCard key={i} event={event} minuteHeight={minuteHeight} />
      ))}
      {isToday && (
        <>
          <div
            className={`absolute z-10 h-[2px] w-full bg-red-500`}
            style={{ top: currentTimeLineOffset }}
          />
          <div
            className="absolute -left-1 z-10 h-2 w-2 rounded-full bg-red-500"
            style={{ top: currentTimeLineOffset - 3 }}
          />
        </>
      )}
    </div>
  );
}

export default SingleDay;
