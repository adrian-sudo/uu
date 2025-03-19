"use client";

import React from "react";
import MyCalendar from "./components/Calendar";
import EventList from "./components/EventList";

const TasksPage: React.FC = () => {
  return (
    <div>
      <h1>Calendario</h1>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 3 }}>
          <MyCalendar />
        </div>
        <div style={{ flex: 1, marginLeft: "20px" }}>
          <EventList events={[]} />{" "}
          {/* Pasa los eventos aquí si es necesario */}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
