import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function BasicDatePicker(props) {
  const [value, setvalue] = React.useState("");
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} focused>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label={props.label}
          value={value}
          onChange={(value) => {
            setvalue(value);
           
            props.onchange(value["$d"]);
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
