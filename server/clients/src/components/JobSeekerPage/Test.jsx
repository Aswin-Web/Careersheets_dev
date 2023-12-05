import { Box } from "@mui/material";
import React from "react";

 const Test = () => {
  console.log("Render");
  return (
    <div>
      <Box sx={{backgroundColor:'red',height:'100vh',width:'100vw'}}>
        <h1>Test</h1>
      </Box>
    </div>
  );
};
export default Test

