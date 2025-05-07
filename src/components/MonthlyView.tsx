
import React from 'react';
import { format, isSameMonth, isSameDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isToday } from 'date-fns';
import { CalendarEvent } from '@/lib/mock-api';
import EventIcon from './EventIcon';
import { cn } from '@/lib/utils';

interface MonthlyViewProps {
  currentDate: Date;
  events: CalendarEvent[];
}

export const MonthlyView: React.FC<MonthlyViewProps> = ({ currentDate, events }) => {
  // Get the days for the current month view
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  // Create date range for the calendar grid
  const dateRange = [];
  let day = startDate;
  
  while (day <= endDate) {
    dateRange.push(day);
    day = addDays(day, 1);
  }

  // Group events by day
  const eventsByDay = dateRange.map(day =>
    events.filter(event => isSameDay(new Date(event.start), day))
  );

  // Generate weeks for the grid
  const weeks = [];
  let days = [];

  dateRange.forEach((day, i) => {
    if (i % 7 === 0 && days.length > 0) {
      weeks.push(days);
      days = [];
    }
    days.push(day);
    if (i === dateRange.length - 1) {
      weeks.push(days);
    }
  });

  // Determine cell background color for alternating patterns
  const getCellBackgroundColor = (day: Date, index: number): string => {
    if (!isSameMonth(day, currentDate)) return 'bg-gray-50';
    
    const rowIndex = Math.floor(index / 7);
    const colIndex = index % 7;
    
    // Alternating colors based on position
    if (rowIndex % 2 === 0) {
      if (colIndex % 2 === 0) return 'bg-calendar-pink';
      return 'bg-calendar-blue';
    } else {
      if (colIndex % 2 === 0) return 'bg-calendar-blue';
      return 'bg-calendar-peach';
    }
  };

  return (
    <div className="calendar-monthly">
      <div className="grid grid-cols-7 gap-1 mb-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
          <div key={i} className="text-center text-sm text-gray-500 py-1">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {dateRange.map((day, i) => {
          const dayEvents = eventsByDay[i];
          const isCurrentMonth = isSameMonth(day, currentDate);
          
          return (
            <div
              key={i}
              className={cn(
                "p-1 h-20 rounded-md",
                getCellBackgroundColor(day, i),
                !isCurrentMonth && "opacity-40"
              )}
            >
              <div className={cn(
                "text-base",
                !isCurrentMonth && "text-gray-400",
                isToday(day) && "text-green-600 font-bold",
                format(day, 'EEE') === 'Sun' && "text-gray-400",
                format(day, 'EEE') === 'Sat' && "text-gray-600"
              )}>
                {format(day, 'd')}
              </div>
              
              {/* Show event icons */}
              <div className="flex flex-col gap-1 mt-1">
                {dayEvents.slice(0, 3).map((event, index) => (
                  <div key={index} className="flex justify-center">
                    <EventIcon type={event.type} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthlyView;
