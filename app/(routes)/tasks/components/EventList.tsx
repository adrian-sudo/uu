"use client";

import moment from "moment";
import React from "react";

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
}

interface EventListProps {
  events: Event[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  return (
    <div>
      {/* <h3>Eventos</h3> */}
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.title} - {moment(event.start).format("DD/MM/YYYY")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
