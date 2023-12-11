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

    dataFetch();
    return;
  }, []);
};

export default UserSelect;
