import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";

const UseAuth = () => {
  // const token = useSelector((state) => state.auth.value.token);
  const token = JSON.parse(localStorage.getItem("user"));
  // const token=useSelector(state=>state.auth.value)
  if (token !== undefined || token !== "" || token !== null) {
    try {
      var decoded = jwt_decode(token);

      return { ...decoded, token };
    } catch (error) {
      return {
        email: "",
        name: "",
        role: "none",
        verification: false,
        _id: "",
        displayPicture: "",

        token: "",
      };
    }
  } else {
    return {
      email: "",
      name: "",
      role: "none",
      verification: false,
      _id: "",
      displayPicture: "",

      token: "",
    };
  }
};
export default UseAuth;
