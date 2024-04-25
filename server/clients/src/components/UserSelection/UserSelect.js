// import React from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeUserInfo } from "../../redux/reducers/auth.data";
import React, { useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { REACT_APP_SERVER_URL } from "../../config";

const UserSelect = () => {
  const [searchParams] = useSearchParams();
  const cookies = new Cookies();

  if (searchParams.get("token") !== null) {
    cookies.set("email", searchParams.get("token"), {
      path: "/",
      sameSite: "none",
      secure: true,
    });
  }

  const token = searchParams.get("token") || cookies.get("email");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const dataFetch = async () => {
      const data = await axios.get(
        `${REACT_APP_SERVER_URL}/auth/google/test/${token}`,
        {
          withCredentials: true,
        }
      );
      const userInfo = await {
        email: data.data.email,
        name: data.data.name,
        role: data.data.role,
        verification: data.data.verification,
        _id: data.data._id,
        token: data.data.token,
        userType: data.data.userType,
      };

      localStorage.setItem("user", JSON.stringify(userInfo.token));
      dispatch(changeUserInfo(userInfo.token));
      const unauthorizedPath = localStorage.getItem("unauthorizedPath");
      console.log("Unauthorized", unauthorizedPath)

      if((await userInfo.verification) === true && (unauthorizedPath)){
          navigate(unauthorizedPath);
          console.log("In unauthorized url Block");
          console.log("role from unauthorized url block",userInfo.role);

          if (
            (await userInfo.role) === "superuser"
          ) {
            localStorage.setItem("admin", userInfo.token);
          }

          if (userInfo.role === "recruiter") {
            localStorage.setItem("recruiter", userInfo.token);
          }

      localStorage.removeItem("unauthorizedPath");

      } else {  
            if (
              (await userInfo.role) === "user" &&
              (await userInfo.verification) === true
            ) {
              navigate("/user");
            }

            if (
              (await userInfo.role) === "superuser" &&
              (await userInfo.verification) === true
            ) {
              console.log("In Super User Block")
              localStorage.setItem("admin", userInfo.token);
              navigate("/user");
            }

            if (userInfo.role === "collegeadmin" && userInfo.verification === true) {
              <Navigate to="/" />;
              navigate("/collegeadmin");
            }
            if (userInfo.role === "recruiter") {
              localStorage.setItem("recruiter", userInfo.token);
              navigate("/recruiter");
            }
            if (userInfo.role !== "recruiter" && userInfo.verification === false) {
              navigate("/selectuser");
            }
          };
        }
    dataFetch();
    return;
  }, []);
};

export default UserSelect;
