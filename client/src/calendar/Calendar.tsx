import { DateTime } from 'luxon';
import React from 'react';
import Month from './MonthView';
import Week from './WeekView';
import Day from './DayView';

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

function getWeekFromDay(day: DateTime): DateTime[] {
  const week = day.startOf('week');
  return Array.from({ length: 7 }).map((_, i) => week.plus({ days: i }));
}

enum CalendarDropdownOption {
  Month = 'Month',
  Week = 'Week',
  Day = 'Day',
}

function Calendar() {
  const month = React.useMemo(
    () => getMonthMatrixFromDay(DateTime.local()),
    [],
  );

  const today = React.useMemo(() => DateTime.local(), []);

  const [calendarType, setCalendarType] =
    React.useState<CalendarDropdownOption>(CalendarDropdownOption.Month);

  return (
    <div className="h-screen w-screen bg-red-200 p-10">
      <div>
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
      <Day day={today} />
    </div>
  );
}

export default Calendar;
