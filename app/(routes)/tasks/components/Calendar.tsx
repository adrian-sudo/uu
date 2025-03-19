"use client";

import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";

const localizer = momentLocalizer(moment);

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
}

const MyCalendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Actualizar la fecha actual cada vez que se carga el componente
  useEffect(() => {
    setCurrentDate(new Date()); // Establece la fecha actual
  }, []);

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const title = window.prompt("New Event name");
    if (title) {
      setEvents([...events, { id: events.length + 1, title, start, end }]);
    }
  };

  const handleSelectEvent = (event: Event) => {
    if (window.confirm(`Are you sure you want to delete "${event.title}"?`)) {
      setEvents(events.filter((e) => e.id !== event.id));
    }
  };

  return (
    <div style={{ height: "500px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        defaultDate={currentDate} // Establece la fecha actual como la fecha predeterminada
        defaultView="month" // Muestra el mes por defecto
      />
    </div>
  );
};

export default MyCalendar;
