import React from "react";
import Day from "./routes/calendar/DayView";
import { DateTime } from "luxon";

function App() {
  return (
    <div className="App">
      <Day day={DateTime.local()} />
    </div>
  );
}

export default App;
