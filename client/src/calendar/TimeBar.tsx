import React from "react";

function TimeBar() {
  return (
    <div className="w-16 border-b-[1px] pr-1">
      <div className="h-8 bg-inherit"></div>
      {Array.from({ length: 23 }).map((_, i) => (
        <div key={i} className="flex h-16 items-center justify-end border-0">
          {i < 9 ? `0${i + 1}:00` : `${i + 1}:00` /* 1:00, 2:00, 3:00, ... */}
        </div>
      ))}
    </div>
  );
}

export default TimeBar;
