import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect(props) {
  const { title, options, variant, setdata } = props;

  const [status, setStatus] = React.useState(options[0]);

  const handleChange = (event) => {
    setStatus(event.target.value);
    setdata(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120,  flex:1,marginRight:'8px',width:'100%' }}>
      <FormControl fullWidth variant={variant}>
        <InputLabel
          id="demo-simple-select-label"
          sx={{
            width:'100%',
           
           
          }}
        >
          {title}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Status"
          value={status}
          onChange={handleChange}
        >
          {options.map((data) => {
            return (
              <MenuItem value={data} key={data}>
                {data}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
