"use client";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css fileimport 'react-date-range/dist/styles.css'; // main css file

import { DateRange } from "react-date-range";
import { useState } from "react";
import { eachDayOfInterval } from "date-fns";

const Calander = ({
  reservation,
}: {
  reservation:
    | {
        startDate: Date;
        endDate: Date;
      }[]
    | undefined;
}) => {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  let disabledDate : Date[] = []
  reservation?.forEach((reservationItem)=>{
    const DateRange=eachDayOfInterval({
        start:new Date(reservationItem.startDate),
        end:new Date(reservationItem.endDate)
    })
    disabledDate = [...disabledDate,...DateRange]
  })
  return (
    <>
      <input
        type="hidden"
        name="startDate"
        value={date[0].startDate.toISOString()}
      />
      <input
        type="hidden"
        name="endDate"
        value={date[0].endDate.toISOString()}
      />
      <DateRange
        date={new Date()}
        showDateDisplay={false}
        rangeColors={["#FF5A5F"]}
        ranges={date}
        onChange={(item) => setDate([item.selection] as any)}
        minDate={new Date()}
        direction="vertical"
        disabledDates={disabledDate}
      />
    </>
  );
};

export default Calander;
