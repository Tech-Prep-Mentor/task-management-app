import { DateTime } from "luxon";
import React from "react";

type Props = {
  day: DateTime;
};

function Day({ day }: Props) {
  return <div className="flex-1 border-b-[1px] border-l-[1px]">{day.day}</div>;
}

export default Day;
