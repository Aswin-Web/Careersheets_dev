import React from "react";
import UseAuth from "../../hooks/auth";

const CollegeAdminController = (props) => {
  const { role, verification, name } = UseAuth();
  if (role === "collegeadmin" && verification === true) {
    return props.children;
  }
  return;
};

export default CollegeAdminController;
