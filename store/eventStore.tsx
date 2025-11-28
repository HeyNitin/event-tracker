import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Event = {
  id: string;
  name: string;
  count: number;
  createdAt: number;
};

const STORAGE_KEY = '@events_data';

interface EventContextType {
  events: Event[];
  loading: boolean;
  addEvent: (name: string) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  incrementEvent: (id: string) => Promise<void>;
  decrementEvent: (id: string) => Promise<void>;
  refreshEvents: () => Promise<void>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) {
        setEvents(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error('Failed to load events', e);
    } finally {
      setLoading(false);
    }
  };

  const saveEvents = async (newEvents: Event[]) => {
    try {
      setEvents(newEvents);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newEvents));
    } catch (e) {
      console.error('Failed to save events', e);
    }
  };

  const addEvent = useCallback(async (name: string) => {
    const newEvent: Event = {
      id: Date.now().toString(),
      name,
      count: 0,
      createdAt: Date.now(),
    };
    const updatedEvents = [newEvent, ...events];
    await saveEvents(updatedEvents);
  }, [events]);

  const deleteEvent = useCallback(async (id: string) => {
    const updatedEvents = events.filter((e) => e.id !== id);
    await saveEvents(updatedEvents);
  }, [events]);

  const incrementEvent = useCallback(async (id: string) => {
    const updatedEvents = events.map((e) =>
      e.id === id ? { ...e, count: e.count + 1 } : e
    );
    await saveEvents(updatedEvents);
  }, [events]);

  const decrementEvent = useCallback(async (id: string) => {
    const updatedEvents = events.map((e) =>
      e.id === id ? { ...e, count: Math.max(0, e.count - 1) } : e
    );
    await saveEvents(updatedEvents);
  }, [events]);

  return (
    <EventContext.Provider
      value={{
        events,
        loading,
        addEvent,
        deleteEvent,
        incrementEvent,
        decrementEvent,
        refreshEvents: loadEvents,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within a EventProvider');
  }
  return context;
};
