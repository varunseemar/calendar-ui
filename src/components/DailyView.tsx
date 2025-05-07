
import React, { useState, useEffect } from 'react';
import { format, isSameDay, addDays, startOfWeek, isToday } from 'date-fns';
import { CalendarEvent } from '@/lib/mock-api';
import EventIcon from './EventIcon';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DailyViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDateChange: (date: Date) => void;
}

const DayHeader: React.FC<{ date: Date; isSelected: boolean; onClick: () => void }> = ({ date, isSelected, onClick }) => {
  const dayName = format(date, 'EEE');
  const dayNumber = format(date, 'd');
  const isTodayDate = isToday(date);
  
  const getDayColor = () => {
    if (isSelected) return 'text-pink-500';
    if (format(date, 'EEE') === 'Sun') return 'text-gray-400';
    if (format(date, 'EEE') === 'Sat') return 'text-gray-600';
    return 'text-gray-500';
  };

  return (
    <div 
      className={cn(
        "flex flex-col items-center w-14 cursor-pointer px-2 py-1 rounded-md",
        isSelected && "bg-pink-100",
      )}
      onClick={onClick}
    >
      <div className={cn("text-sm", getDayColor())}>
        {dayName}
      </div>
      <div className={cn(
        "text-2xl", 
        isSelected ? "text-pink-500 font-bold" : "text-gray-900",
        isTodayDate && "text-green-600"
      )}>
        {dayNumber}
      </div>
      {isSelected && <div className="w-1.5 h-1.5 bg-pink-500 rounded-full mt-1"></div>}
    </div>
  );
};

const EventCard: React.FC<{ event: CalendarEvent }> = ({ event }) => {
  return (
    <div 
      className="rounded-lg p-4 mb-4 relative"
      style={{ backgroundColor: event.color }}
    >
      <div className="flex items-start">
        <div className="text-sm text-blue-600 mb-1">
          {format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}
        </div>
      </div>
      <div className="flex items-center mb-1">
        <EventIcon type={event.type} className="mr-2" />
        <h3 className="text-lg font-medium">{event.title}</h3>
        <Button variant="ghost" className="ml-auto h-8 w-8 p-0">
          <span className="text-gray-400">⋮</span>
        </Button>
      </div>
      <div className="text-sm text-gray-500">{event.location}</div>
    </div>
  );
};

export const DailyView: React.FC<DailyViewProps> = ({ currentDate, events, onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(currentDate);
  
  useEffect(() => {
    setSelectedDate(currentDate);
  }, [currentDate]);

  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));
  
  const filteredEvents = events.filter(event => 
    isSameDay(new Date(event.start), selectedDate)
  );

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <div>
      <div className="flex justify-between space-x-1 mb-6">
        {weekDays.map((day, i) => (
          <DayHeader
            key={i}
            date={day}
            isSelected={isSameDay(day, selectedDate)}
            onClick={() => handleDateClick(day)}
          />
        ))}
      </div>
      
      <div className="space-y-2">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
        
        {filteredEvents.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No events scheduled for this day
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyView;
