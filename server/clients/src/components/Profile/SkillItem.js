import React from "react";
import axios from "axios";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useDispatch, useSelector } from "react-redux";
import { skillActions } from "../../redux/reducers/Skill-data";
import Add from "./ProfileEdit/Add/Add";

/////css////
import classes from "./SkillItem.module.css";
import { REACT_APP_SERVER_URL } from "../../config";
import { useState } from "react";
const SkillItem = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.value);
  const { skillName, id, level } = props;
  const [isEdit, setIsEdit] = useState(false);

  const deleteRequest = async () => {
    const response = await axios.delete(
      REACT_APP_SERVER_URL + "/user/profile/skill/" + id,
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
  if (level === "Beginner") {
    levelClass = classes.Beginner;
  } else if (level === "Intermediate") {
    levelClass = classes.Intermediate;
  } else {
    levelClass = classes.Advanced;
  }

  const editSkillHandler = async () => {
    console.log("ssssaaaaaaaaaaa", isEdit);
    try {
      setIsEdit(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseAdd = () => {
    setIsEdit(false);
  };

  return (
    <div className={classes.item} >
      <div>
        <h3>{skillName}</h3>
        <p>
          <span>Level : </span>
          <span className={levelClass}>{level}</span>
        </p>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          onClick={editSkillHandler}
        >
          <EditOutlinedIcon />
        </IconButton>
        <IconButton onClick={removeSkillHandler}>
          <ClearIcon />
        </IconButton>
      </div>

      {isEdit && (
        <Add Card={"skills"} editdata={props} onCloseEdit={handleCloseAdd} />
      )}
    </div>
  );
};

export default SkillItem;
