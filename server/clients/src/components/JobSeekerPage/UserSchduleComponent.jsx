import { Box, Button, Typography } from "@mui/material";
import React from "react";
import Card from "./UserSchduleCards";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom'
const Main = () => {
  // Total Application From User
  const applicationData = useSelector((state) => state.application.value);

  // This is used to identify the last status of the application is pending. If pending it will be displayed in the schedule component
  const scheduleApplication = applicationData.filter((application) => {
    const statusArray = application.status;
    if (statusArray.length !== 0) {
      const isPending = statusArray[statusArray.length - 1].status;
      if (
        isPending === "Pending" &&
        new Date(statusArray[statusArray.length - 1].date) >=
          new Date(new Date().setDate(new Date().getDate() - 1))
      )
        return application;
    }
  });
  
  scheduleApplication.sort((a,b)=>{
    const lengthA=a.status.length
    const lengthB = b.status.length;
    const date1=new Date(a.status[lengthA-1].date)
    const date2 = new Date(b.status[lengthB - 1].date);
    if(date1 < date2 ){
      return -1
    }else if (date1 > date2){
      return +1
    };
    return 0;
  })
  return (
    <Box sx={{padding:"1rem"}}>
      {scheduleApplication.length === 0 ? (
        <Box
          sx={{
            margin:'1% 0',
            backgroundColor: "#d0e2f7",
            width: "100%",
            minHeight: "80vh",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box >
            <Typography variant="h2" color="initial">
              Hey Champ....!
            </Typography>
            <Typography variant="h6" component='h1' color="initial">
              Currently You don't have any scheduled events.
            </Typography>
            <Typography variant="h6" color="initial">
              Please do add an event by Clicking this button <br/>
              <Link to="/user">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#e90064",
                    "&:hover": {
                      backgroundColor: "#e90064",
                    },
                  }}
                >
                  Add Event
                </Button>
              </Link>
            </Typography>
          </Box>
        </Box>
      ) : null}
      {scheduleApplication.map((item, index) => (
        <Box key={index}>
          <Card info={item} key={index} />
          <br />
        </Box>
      ))}
    </Box>
  );
};

export default Main;
