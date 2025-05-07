
import React from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { CalendarView } from '@/hooks/useCalendar';

interface CalendarHeaderProps {
  currentDate: Date;
  view: CalendarView;
  setView: (view: CalendarView) => void;
  goToPrev: () => void;
  goToNext: () => void;
  showMonthTitle?: boolean;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  view,
  setView,
  goToPrev,
  goToNext,
  showMonthTitle = false
}) => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Calendar</h1>
        <Button variant="link" className="text-pink-500">+ New event</Button>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-2 mb-4 flex justify-between">
        <div className="flex space-x-2">
          <Button
            variant={view === 'daily' ? "default" : "ghost"}
            className={`bg-transparent ${view === 'daily' ? 'bg-white shadow-sm text-black' : 'text-gray-500'}`}
            onClick={() => setView('daily')}
          >
            Daily
          </Button>
          <Button
            variant={view === 'weekly' ? "default" : "ghost"}
            className={`bg-transparent ${view === 'weekly' ? 'bg-white shadow-sm text-black' : 'text-gray-500'}`}
            onClick={() => setView('weekly')}
          >
            Weekly
          </Button>
          <Button
            variant={view === 'monthly' ? "default" : "ghost"}
            className={`bg-transparent ${view === 'monthly' ? 'bg-white shadow-sm text-black' : 'text-gray-500'}`}
            onClick={() => setView('monthly')}
          >
            Monthly
          </Button>
        </div>
      </div>
      
      {showMonthTitle && (view === 'monthly' || view === 'weekly') && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{format(currentDate, 'MMMM yyyy')}</h2>
          <div className="flex">
            <Button variant="ghost" onClick={goToPrev}>&lt;</Button>
            <Button variant="ghost" onClick={goToNext}>&gt;</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default CalendarHeader;
