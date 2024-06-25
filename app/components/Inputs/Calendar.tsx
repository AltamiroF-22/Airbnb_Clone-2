import React from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme css file

interface CalendarProps {
  value: Range;
  disabledDates: Date[];
  onChange: (ranges: RangeKeyDict) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  value,
  disabledDates,
  onChange,
}) => {
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  );
};

export default Calendar;
