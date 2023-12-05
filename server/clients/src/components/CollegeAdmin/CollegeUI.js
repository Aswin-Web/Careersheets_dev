import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import ReactGA from "react-ga";

const CollegeUI = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);
  return (
    <div>
      <Outlet />
    </div>
  );
};
export default CollegeUI;
