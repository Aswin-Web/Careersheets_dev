import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Box } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Popup from "./Utils/Popup";
import AddApplication from "./AddApplication";
import Dropdown from './Utils/Dropdown'

export default function RowRadioButtonsGroup() {
 
  return (
    <>
      <Box
        sx={{
          padding: "0 20px",
          display: "flex",
          justifyContent: "flex-end",
          marginBottom:'1rem.30'

        }}
      >
        {/* <FormControl
          sx={{
            color: "white",
            accentColor: "red",
          }}
        >
          <FormLabel
            sx={{
              color: "white",
            }}
          ></FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            sx={{ color: "black" }}
          >
            <FormControlLabel
              value="all"
              control={<Radio />}
              label="All"
              sx={{ color: "black" }}
            />
            <FormControlLabel
              value="pending"
              control={<Radio />}
              label="Pending"
            />
            <FormControlLabel
              value="rejected"
              control={<Radio />}
              label="Rejected"
            />
            <FormControlLabel
              value="passed"
              control={<Radio />}
              label="Passed"
            />
          </RadioGroup>
        </FormControl> */}
        {/* <Dropdown
          title="Select One"
          options={["Today", "Yesterday", "Last 7 days", "Last 1 month"]}
          variant={"standard"}
        /> */}
        <Popup
          content={<AddCircleOutlineIcon />}
          body={<AddApplication />}
          titles={"Create New Application"}
        />
      </Box>
    </>
  );
}
