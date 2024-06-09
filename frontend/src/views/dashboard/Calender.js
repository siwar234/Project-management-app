import React from "react";
import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views,
} from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

export default function Calendar(props) {
  return (
    <BigCalendar
      {...props}
      localizer={localizer}
      views={[Views.DAY, Views.WEEK, Views.MONTH]}
    />
  );
}
