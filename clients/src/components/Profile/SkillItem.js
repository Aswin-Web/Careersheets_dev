import React from "react";
import axios from "axios";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { skillActions } from "../../redux/reducers/Skill-data";

/////css////
import classes from "./SkillItem.module.css";
const SkillItem = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.value);
  const { skillName, id, level } = props;
  

  const deleteRequest = async () => {
    const response = await axios.delete(
      process.env.REACT_APP_SERVER_URL + "/user/profile/skill/" + id,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.data;

    return data;
  };

  const removeSkillHandler = () => {
    deleteRequest()
      .catch((error) => console.log(error))
      .then((data) => {
        const deletedSkill = data.existingSkill;
        dispatch(skillActions.removeSkill(deletedSkill));
      });
  };

  let levelClass;
  if(level==="Beginner"){
    levelClass=classes.Beginner
  }else if(level==="Intermediate"){
    levelClass=classes.Intermediate
  }else{
    levelClass=classes.Advanced
  }
 
  return (
    <div  className={classes.item}>
      <div>
        <h3>{skillName}</h3>
        <p ><span>Level : </span><span className={levelClass}>{level}</span></p>
      </div>
      <IconButton onClick={removeSkillHandler}>
        <ClearIcon />
        
      </IconButton>
    </div>
  );
};

export default SkillItem;
