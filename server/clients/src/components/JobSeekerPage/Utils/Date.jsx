import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function BasicDatePicker(props) {
  console.log("Props from Date", props);
  const { value, onChange } = props;

  const handleDateChange = (date) => {
    if (onChange) {
      onChange(date ? date.format("YYYY-MM-DD") : null);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} focused>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label={props.label}
          value={value}
          onChange={handleDateChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
