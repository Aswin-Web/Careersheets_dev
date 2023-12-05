import React from 'react';
import { Outlet } from 'react-router-dom';
const H = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

const RightSideBar = () => {
  return (
    <div className="RightSide" id='right_id'>
      <H/>
    </div>
  );
}







 
export default RightSideBar