
import { useState, useEffect } from 'react';
import { addDays, addMonths, endOfDay, endOfMonth, endOfWeek, format, startOfDay, startOfMonth, startOfWeek } from 'date-fns';
import { CalendarEvent, getEvents } from '@/lib/mock-api';

export type CalendarView = 'daily' | 'weekly' | 'monthly';

export const useCalendar = () => {
  const [view, setView] = useState<CalendarView>('daily');
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getDateRange = () => {
    switch (view) {
      case 'daily':
        return {
          start: startOfDay(currentDate),
          end: endOfDay(currentDate)
        };
      case 'weekly':
        return {
          start: startOfWeek(currentDate, { weekStartsOn: 0 }),
          end: endOfWeek(currentDate, { weekStartsOn: 0 })
        };
      case 'monthly':
        return {
          start: startOfMonth(currentDate),
          end: endOfMonth(currentDate)
        };
    }
  };

  const goToPrev = () => {
    switch (view) {
      case 'daily':
        setCurrentDate(prev => addDays(prev, -1));
        break;
      case 'weekly':
        setCurrentDate(prev => addDays(prev, -7));
        break;
      case 'monthly':
        setCurrentDate(prev => addMonths(prev, -1));
        break;
    }
  };

  const goToNext = () => {
    switch (view) {
      case 'daily':
        setCurrentDate(prev => addDays(prev, 1));
        break;
      case 'weekly':
        setCurrentDate(prev => addDays(prev, 7));
        break;
      case 'monthly':
        setCurrentDate(prev => addMonths(prev, 1));
        break;
    }
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const { start, end } = getDateRange();
      const fetchedEvents = await getEvents(start, end);
      setEvents(fetchedEvents);
    } catch (error) {
      console.error('Error fetching events', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [view, currentDate]);

  return {
    view,
    setView,
    currentDate,
    setCurrentDate,
    events,
    loading,
    goToPrev,
    goToNext,
    goToToday,
    fetchEvents
  };
};
