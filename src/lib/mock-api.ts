
import { addDays, addHours, format, isSameDay, parseISO, setHours, startOfDay } from "date-fns";

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  organizer: string;
  location: string;
  type: 'meeting' | 'music' | 'sport';
  color: string;
}

// Mock data events spanning multiple dates
const generateMockEvents = (): CalendarEvent[] => {
  const today = new Date();
  const startOfToday = startOfDay(today);
  
  return [
    {
      id: '1',
      title: 'Coding Workshop - David',
      start: addHours(startOfToday, 4), // 4:00 AM
      end: addHours(startOfToday, 12), // 12:00 PM
      organizer: 'David',
      location: 'Brine',
      type: 'music',
      color: '#ffeeee' // pink
    },
    {
      id: '2',
      title: 'Meeting with Client - Bob',
      start: addHours(startOfToday, 18), // 6:00 PM
      end: addHours(addDays(startOfToday, 1), 1), // 1:00 AM next day
      organizer: 'Bob',
      location: 'Brine',
      type: 'meeting',
      color: '#e5f2ff' // blue
    },
    {
      id: '3',
      title: 'Team Standup - Bob',
      start: setHours(addDays(startOfToday, 2), 0), // 12:00 AM
      end: setHours(addDays(startOfToday, 2), 7), // 7:00 AM
      organizer: 'Bob',
      location: 'Brine',
      type: 'music',
      color: '#ffeeee' // pink
    },
    {
      id: '4',
      title: 'Project Deadline - Charlie',
      start: setHours(today, 8), // 8:00 AM
      end: setHours(today, 10), // 10:00 AM
      organizer: 'Charlie',
      location: 'Brine',
      type: 'music',
      color: '#ffeeee' // pink
    },
    {
      id: '5',
      title: 'Project Deadline - Alice',
      start: setHours(addDays(today, 1), 11), // 11:00 AM tomorrow
      end: setHours(addDays(today, 1), 13), // 1:00 PM tomorrow
      organizer: 'Alice',
      location: 'Brine',
      type: 'meeting',
      color: '#e5f2ff' // blue
    },
    {
      id: '6',
      title: 'Yoga Class - Alice',
      start: setHours(today, 14), // 2:00 PM
      end: setHours(today, 15), // 3:00 PM
      organizer: 'Alice',
      location: 'Brine',
      type: 'music',
      color: '#ffeeee' // pink
    },
    {
      id: '7',
      title: 'Lunch Break - Charlie',
      start: setHours(addDays(today, 3), 2), // 2:00 AM
      end: setHours(addDays(today, 3), 10), // 10:00 AM
      organizer: 'Charlie',
      location: 'Brine',
      type: 'music',
      color: '#ffeeee' // pink
    },
    {
      id: '8',
      title: 'Weekend Trip - Emma',
      start: setHours(addDays(today, 5), 6), // 6:00 AM
      end: setHours(addDays(today, 6), 18), // 6:00 PM next day
      organizer: 'Emma',
      location: 'Brine',
      type: 'music',
      color: '#ffeeee' // pink
    }
  ];
};

// Create a bunch more events across different days of the month
const generateMonthEvents = (): CalendarEvent[] => {
  const baseEvents = generateMockEvents();
  const monthEvents: CalendarEvent[] = [...baseEvents];
  
  // Generate events for the entire month
  for (let i = 1; i <= 31; i++) {
    const eventDate = addDays(startOfDay(new Date()), i % 7);
    const eventType = i % 3 === 0 ? 'music' : i % 3 === 1 ? 'meeting' : 'sport';
    const color = eventType === 'music' ? '#ffeeee' : eventType === 'meeting' ? '#e5f2ff' : '#fff5e6';
    
    monthEvents.push({
      id: `month-${i}`,
      title: `Event ${i}`,
      start: addHours(eventDate, 8 + (i % 8)),
      end: addHours(eventDate, 9 + (i % 8)),
      organizer: i % 2 === 0 ? 'Alice' : 'Bob',
      location: 'Brine',
      type: eventType as any,
      color
    });
  }
  
  return monthEvents;
};

const allEvents = generateMonthEvents();

export const getEvents = async (start: Date, end: Date): Promise<CalendarEvent[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Filter events that fall within the requested date range
  return allEvents.filter(event => {
    const eventStart = new Date(event.start);
    const eventEnd = new Date(event.end);
    
    return (eventStart >= start && eventStart <= end) || 
           (eventEnd >= start && eventEnd <= end) ||
           (eventStart <= start && eventEnd >= end);
  });
};

export const getEventsByDay = async (day: Date): Promise<CalendarEvent[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Filter events for the specific day
  return allEvents.filter(event => {
    const eventStart = new Date(event.start);
    return isSameDay(eventStart, day);
  });
};
