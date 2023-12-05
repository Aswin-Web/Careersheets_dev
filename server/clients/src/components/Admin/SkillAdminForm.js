import React, { useEffect, useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
///Radio button//
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
//

import axios from "axios";

import { useSelector } from "react-redux";
// import { skillActions } from "../../../../redux/reducers/Skill-data";
// import { skillData } from "./skills";

const SkillAdminform = (props) => {
  // const skillItems = useSelector((state) => state.skill.skills);
  const [skillItems, setskillItems] = useState([]);


  const token = useSelector((state) => state.auth.value);

  const [inputs, setInputs] = useState();
  const [addedSkills, setaddedSkills] = useState([...props.SkillValues]);
  // console.log(addedSkills,"Please Verify")
  const [err, setErr] = useState(false);
  //
  const getAllSkills = async () => {
    const response = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/user/platformskills",

      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // console.log(response,"Skills From Backend");
    const data = await response.data;

    if (response.status === 200) {
      setskillItems([...response.data.skill]);
      return data;
    }
  };

  useEffect(() => {
    getAllSkills();
  }, []);

  // skills
  function compare(a, b) {
    if (a.skill < b.skill) {
      return -1;
    }
    if (a.skill > b.skill) {
      return 1;
    }
    return 0;
  }

  const skills = skillItems.sort(compare);

  //validating the form///
  let formValid = false;

  if (inputs) {
    formValid = true;
  }

  const handleDelete = (skill) => {
    const deleteSkill = addedSkills.filter((x) => x !== skill);
    setaddedSkills([...deleteSkill]);
  };
  const skillFormSubmitHandler = () => {
    // props.onClose

    if (formValid) {
      setaddedSkills((prev) => {
        if (prev.length !== 0) {
          const newArray = prev.filter((x) => x === inputs);
          if (newArray.length === 0) {
            return [...prev, inputs];
          } else {
            return prev;
          }
        } else {
          return [...[inputs]];
        }
      });
    //   setInputs("")
    }
  };

  const inputChangeHandler = (event, values) => {
    setInputs(values);
  };
  props.getSkills(addedSkills.toString())
    return (
    <div>
      <form
      //   onSubmit={skillFormSubmitHandler}
      >
        <DialogTitle>Add skills</DialogTitle>
        {addedSkills.length !== 0 ? (
          <div style={{ display: "flex", gap: "3px", flexWrap:"wrap"}}>
            {addedSkills.map((x,key) => {
              return (
                <div
                  style={{
                    border: "1px solid grey",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "3px",
                    margin: "2px",
                    gap:"5px"
                  }}
                  key={key}
                >
                  <p>{x}</p>
                  <p
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(x);
                    }}
                    style={{ color: "red", fontWeight: "bolder" }}
                  >
                    X
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
        <DialogContent>
          <DialogContentText>
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={skills.map((option) => option.skill)}
              onChange={inputChangeHandler}
              sx={{ width: "500px" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Skill"
                  variant="standard"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={!formValid}
            onClick={() => {
              skillFormSubmitHandler();
            }}
          >
            Add
          </Button>
        </DialogActions>
      </form>
    </div>
  );
};

export default SkillAdminform;
