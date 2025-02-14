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

import { useDispatch, useSelector } from "react-redux";
import { skillActions } from "../../../../redux/reducers/Skill-data";
import { REACT_APP_SERVER_URL } from "../../../../config";
// import { skillData } from "./skills";

const Skillform = (props) => {
  // const skillItems = useSelector((state) => state.skill.skills);
  const [skillItems, setskillItems] = useState([]);
  const token = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState("");
  const [level, setLevel] = useState("");
  const [id, setId] = useState("");

  // const [err, setErr] = useState(false);
  //
  const getAllSkills = async () => {
    const response = await axios.get(
      REACT_APP_SERVER_URL + "/user/platformskills",

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

  if (inputs && level) {
    formValid = true;
  }

  const postRequest = async () => {
    const response = await axios
      .post(
        REACT_APP_SERVER_URL + "/user/profile/skill",
        {
          skill: inputs,
          level: level,
          id: props.editdata ? id : "",
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((error) => {
        return error.response.data.message;
      });

    const data = await response.data;

    if (data) {
      return data;
    }
  };

  const skillFormSubmitHandler = (event) => {
    event.preventDefault();

    if (formValid) {
      if (props.onClose) {
        props.onClose();
      }

      postRequest()
        .then((data) => {
          if (!data) {
            // setErr(true);
            dispatch(
              skillActions.skillError(
                "This skill is already in your skill list.\n Try to add new Skill!!"
              )
            );
          } else {
            if (props.editdata) {
              dispatch(skillActions.updateSkill({ id, skill: inputs, level }));
            } else {
              dispatch(skillActions.addSkill({ ...data.newSkill }));
            }
            props.onClose();
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log("falseee");
    }
  };

  useEffect(() => {
    if (props.editdata) {
      const skillData = props.editdata;
      setInputs(skillData.skillName);
      setLevel(skillData.level);
      setId(skillData.id);
    }
  }, [props.editdata]);

  const inputChangeHandler = (event, values) => {
    setInputs(values);
  };
  const levelChange = (event) => {
    setLevel(event.target.value);
  };
  return (
    <div>
      <form onSubmit={skillFormSubmitHandler}>
        <DialogTitle>{props.editdata ? "Edit Skill" : "Add Skill"}</DialogTitle>

        <DialogContent>
          <DialogContentText>
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={skills.map((option) => option.skill)}
              onChange={inputChangeHandler}
              value={inputs}
              // sx={{ width: "500px" }}
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
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={levelChange}
                value={level}
              >
                <FormControlLabel
                  value="Beginner"
                  control={<Radio />}
                  label="Beginner"
                />
                <FormControlLabel
                  value="Intermediate"
                  control={<Radio />}
                  label="Intermediate"
                />
                <FormControlLabel
                  value="Advanced"
                  control={<Radio />}
                  label="Advanced"
                />
              </RadioGroup>
            </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={!formValid} type="submit">
            {props.editdata ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </form>
    </div>
  );
};

export default Skillform;
