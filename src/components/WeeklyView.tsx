
import React from 'react';
import { format, isSameDay, addDays, startOfWeek, addHours, startOfDay, isWithinInterval, areIntervalsOverlapping, isToday } from 'date-fns';
import { CalendarEvent } from '@/lib/mock-api';
import EventIcon from './EventIcon';
import { cn } from '@/lib/utils';

interface WeeklyViewProps {
  currentDate: Date;
  events: CalendarEvent[];
}

export const WeeklyView: React.FC<WeeklyViewProps> = ({ currentDate, events }) => {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));
  
  const hours = Array.from({ length: 24 }).map((_, i) => i);

  // Group events by day and sort by start time
  const eventsByDay = weekDays.map(day => {
    return events.filter(event => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      return isWithinInterval(day, { start: startOfDay(eventStart), end: eventEnd }) ||
             isWithinInterval(eventStart, { start: startOfDay(day), end: addDays(startOfDay(day), 1) });
    }).sort((a, b) => a.start.getTime() - b.start.getTime());
  });

  // Function to position events
  const getEventPosition = (event: CalendarEvent, dayIndex: number) => {
    const eventStart = new Date(event.start);
    const eventStartHour = eventStart.getHours() + eventStart.getMinutes() / 60;
    const eventEnd = new Date(event.end);
    const eventDuration = (eventEnd.getTime() - eventStart.getTime()) / (1000 * 60 * 60); // duration in hours
    
    const top = `${eventStartHour * 60}px`;
    const height = `${eventDuration * 60}px`;
    
    return { top, height };
  };

  return (
    <div className="flex flex-col">
      <div className="flex border-b">
        <div className="w-16"></div>
        {weekDays.map((day, i) => (
          <div 
            key={i} 
            className={cn(
              "flex-1 text-center py-2 border-r last:border-r-0",
              isToday(day) && "bg-pink-100"
            )}
          >
            <div className="text-xs text-gray-500">{format(day, 'EEE')}</div>
            <div className={cn(
              "text-base font-medium",
              isToday(day) && "text-pink-500"
            )}>
              {format(day, 'd')}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex relative" style={{ height: '1440px' }}> {/* 24 hours * 60px */}
        <div className="w-16 relative">
          {hours.map((hour) => (
            <div 
              key={hour} 
              className="border-b h-[60px] text-xs text-gray-500 text-right pr-2"
              style={{ position: 'absolute', top: `${hour * 60}px`, width: '100%' }}
            >
              {format(addHours(startOfDay(new Date()), hour), 'ha')}
            </div>
          ))}
        </div>
        
        <div className="flex-1 grid grid-cols-7">
          {weekDays.map((day, dayIndex) => (
            <div key={dayIndex} className="border-r relative">
              {eventsByDay[dayIndex].map((event, eventIndex) => {
                const { top, height } = getEventPosition(event, dayIndex);
                return (
                  <div
                    key={eventIndex}
                    className="absolute left-0 right-0 mx-1 rounded p-1 overflow-hidden text-xs"
                    style={{ 
                      top, 
                      height, 
                      backgroundColor: event.color,
                      zIndex: 10
                    }}
                  >
                    <div className="flex items-center">
                      <EventIcon type={event.type} className="mr-1" />
                      <div className="font-medium">{event.title}</div>
                    </div>
                    <div className="text-gray-600 text-xs">{event.location}</div>
                  </div>
                );
              })}
              
              {/* Hour grid lines */}
              {hours.map((hour) => (
                <div 
                  key={hour} 
                  className="border-b h-[60px] w-full"
                  style={{ position: 'absolute', top: `${hour * 60}px` }}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyView;
