import { DateTime } from 'luxon';
import React from 'react';
import Month from './MonthView';
import Week from './WeekView';
import Day from './DayView';

enum CalendarDropdownOption {
  Month = 'Month',
  Week = 'Week',
  Day = 'Day',
}

function Calendar() {
  const today = React.useMemo(() => DateTime.local(), []);

  const [selectedDate, setSelectedDate] = React.useState<DateTime>(today);

  const [calendarType, setCalendarType] =
    React.useState<CalendarDropdownOption>(CalendarDropdownOption.Month);

  return (
    <div className="flex h-screen w-screen flex-col bg-red-200 p-0">
      <div className="w-full shrink-0 grow-0 basis-20">
        <select
          value={calendarType}
          onChange={(e) =>
            setCalendarType(e.target.value as CalendarDropdownOption)
          }
        >
          <option value={CalendarDropdownOption.Month}>Month</option>
          <option value={CalendarDropdownOption.Week}>Week</option>
          <option value={CalendarDropdownOption.Day}>Day</option>
        </select>
      </div>
      <div className="w-5/6 flex-1 overflow-clip">
        {calendarType === CalendarDropdownOption.Month && (
          <Month selectedDate={selectedDate} />
        )}
        {calendarType === CalendarDropdownOption.Week && (
          <Week selectedDate={selectedDate} />
        )}
        {calendarType === CalendarDropdownOption.Day && (
          <Day selectedDate={selectedDate} />
        )}
      </div>
    </div>
  );
}

export default Calendar;
