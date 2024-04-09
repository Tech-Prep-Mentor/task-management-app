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

  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="flex w-full shrink-0 grow-0 basis-16 flex-col items-center border-b-2 bg-white">
        <div>{selectedDate.toFormat('EEE').toUpperCase()}</div>
        <div>{selectedDate.toFormat('d')}</div>
      </div>
      <div className="w-full flex-1 overflow-y-auto">
        <div className="flex flex-row">
          <TimeBar />
          <SingleDay height={`${HOUR_BLOCK_HEIGHT}px`} isToday={isToday} />
        </div>
      </div>
    </div>
  );
}

export default Day;
