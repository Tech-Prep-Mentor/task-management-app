import { DateTime } from 'luxon';
import React, { useMemo } from 'react';
import TimeBar from './TimeBar';
import SingleDay from './SingleDay';

type DayProps = {
  selectedDate: DateTime;
};

const HOUR_BLOCK_HEIGHT = 64;

function Day({ selectedDate }: DayProps) {
  const now = useMemo(() => DateTime.local(), []);
  const isToday = useMemo(
    () => now.hasSame(selectedDate, 'day'),
    [now, selectedDate],
  );

  const currentTimeLineOffset = useMemo(() => {
    if (isToday) {
      const minutes = now.minute + now.hour * 60;

      const res = Math.floor(minutes * (HOUR_BLOCK_HEIGHT / 60));
      console.log(res);
      return res;
    }
    return 0;
  }, [isToday, now]);

  return (
    <div className="w-full">
      <div className="sticky top-0 z-20 flex h-16 flex-col items-center border-b-2 bg-white">
        <div>{selectedDate.toFormat('EEE').toUpperCase()}</div>
        <div>{selectedDate.toFormat('d')}</div>
      </div>
      <div className="">
        <div className="flex flex-row">
          <TimeBar />
          <SingleDay height={`${HOUR_BLOCK_HEIGHT}px`} />
        </div>
        {isToday && (
          <>
            <div
              className={`absolute left-16 z-10 h-[2px] w-full bg-red-500`}
              style={{ top: currentTimeLineOffset }}
            />
            <div
              className="absolute left-[60px] z-10 h-2 w-2 rounded-full bg-red-500"
              style={{ top: currentTimeLineOffset - 3 }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Day;
