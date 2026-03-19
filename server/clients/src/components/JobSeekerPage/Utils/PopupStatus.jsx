import * as React from "react";
import ResuableButton from "./Button";
import { Box } from "@mui/material";

import AddStatus from "./AddStatus";

export default function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box onClick={handleClickOpen} sx={{ cursor: 'pointer', width: '100%' }}>
        {props.content || <ResuableButton content={props.titles || props.title} />}
      </Box>
      <AddStatus
        open={open}
        handleClose={handleClose}
        info={props.info}
      />
    </>
  );
}
