
import React from 'react';
import { useCalendar } from '@/hooks/useCalendar';
import CalendarHeader from './CalendarHeader';
import DailyView from './DailyView';
import WeeklyView from './WeeklyView';
import MonthlyView from './MonthlyView';

export const Calendar: React.FC = () => {
  const {
    view,
    setView,
    currentDate,
    setCurrentDate,
    events,
    loading,
    goToPrev,
    goToNext,
    goToToday
  } = useCalendar();

  const renderView = () => {
    if (loading) {
      return <div className="text-center py-20">Loading...</div>;
    }

    switch (view) {
      case 'daily':
        return (
          <DailyView 
            currentDate={currentDate} 
            events={events}
            onDateChange={setCurrentDate}
          />
        );
      case 'weekly':
        return <WeeklyView currentDate={currentDate} events={events} />;
      case 'monthly':
        return <MonthlyView currentDate={currentDate} events={events} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <CalendarHeader
        currentDate={currentDate}
        view={view}
        setView={setView}
        goToPrev={goToPrev}
        goToNext={goToNext}
        showMonthTitle={view !== 'daily'}
      />
      
      <div className="mt-4">
        {renderView()}
      </div>
    </div>
  );
};

export default Calendar;
