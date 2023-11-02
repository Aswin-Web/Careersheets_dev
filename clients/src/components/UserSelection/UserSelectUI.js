import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, CircularProgress } from "@mui/material";
import classes from "./UserSelect.module.css";
import UseAuth from "../../hooks/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Careersheets from "../../images/Careersheets-logo.png";
import { Helmet } from "react-helmet-async";
const UserSelectUI = () => {
  const navigate = useNavigate();
  const [selectUser, setSelectUser] = React.useState("");
  const [loading, setloading] = React.useState(false);
  const token = JSON.parse(localStorage.getItem("user"));

  return (
    <div className={classes.contianer}>
      <Helmet>
        <title>CareerSheets-SelectUser</title>
        <link
          rel="icon"
          type="image/x-icon"
          href="https://yt3.googleusercontent.com/JSKcgbOwC9er1na2B_jWU9OsNfouSfm_bs1CASylTw9cHZEycRixrqpJIMoNoU7QpEtPPTWxysw=s176-c-k-c0x00ffffff-no-rj"
        />
      </Helmet>
      <div className={classes.logo}>
        <img src={Careersheets} alt="app-logo" />
        <h2>Careersheets</h2>
      </div>
      <div className={classes.title}>
        <h1>Choose your role </h1>
      </div>

      <div className={classes.users}>
        <div className={classes.userCards}>
          <Card
            sx={{
              maxWidth: 175,
              maxHeight: 250,
              padding: "1em",
              marginBottom: "1em",
              borderRadius: "40px",
              backgroundColor: selectUser === "user" ? "#ADE792" : "",
            }}
            onClick={() => {
              return setSelectUser("user");
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                image="https://static.vecteezy.com/system/resources/thumbnails/011/280/129/small/student-holding-degree-flat-long-shadow-icon-vector.jpg"
                alt="job seeker"
                sx={{ marginBottom: "1em", borderRadius: "50%" }}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                    textTransform: "capitalize",
                  }}
                >
                  Job Seeker
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
        <div className={classes.userCards}>
          <Card
            sx={{
              maxWidth: 175,
              maxHeight: 250,
              padding: "1em",
              marginBottom: "1em",
              borderRadius: "40px",
              backgroundColor: selectUser === "collegeadmin" ? "#F7A4A4" : "",
            }}
            onClick={() => {
              return setSelectUser("collegeadmin");
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqRe34P0nKF0Euaz4DLlj3WN4rcAuZGHnUicHoa8B2V5AqgEGfK3eX9ZekUcX3e_jRlm8&usqp=CAU"
                alt="collegeAdmin"
                sx={{ marginBottom: "1em", borderRadius: "50%" }}
              />
              <CardContent sx={{ paddingBottom: "2em" }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                    textTransform: "capitalize",
                  }}
                >
                  College Admin
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
        <div className={classes.userCards}>
          <Card
            sx={{
              maxWidth: 175,
              maxHeight: 450,
              padding: "1em",
              marginBottom: "1em",
              borderRadius: "40px",
              backgroundColor: selectUser === "recruiter" ? "#B0578D" : "",
            }}
            onClick={() => {
              return setSelectUser("recruiter");
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                image="https://media.istockphoto.com/id/1337620061/vector/outstanding-winner-candidate-for-job-position-stand-out-from-the-crowd-notable-different-or.jpg?s=612x612&w=0&k=20&c=2DQFZZNCu8xwTkC4oLIOj9LJrBmnVT745RbDpV-Xi98="
                alt="collegeAdmin"
                sx={{ marginBottom: "1em", borderRadius: "50%" }}
              />
              <br />
              <CardContent sx={{ paddingBottom: "2em" }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                    textTransform: "capitalize",
                  }}
                >
                  Recruiter
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </div>
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
        }}
      >
        <Button
          variant="outlined"
          disabled={selectUser === "" ? true : false}
          onClick={async () => {
            if (selectUser !== "") {
              try {
                setloading(!loading);
                axios
                  .put(
                    `${process.env.REACT_APP_SERVER_URL}/auth/google/verify`,
                    {
                      ...(selectUser === "recruiter"
                        ? { type: selectUser, recruiterVerification: false }
                        : { type: selectUser }),
                    },
                    {
                      headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  )
                  .then((resp) => {
                    return navigate("/authredirect");
                  });
              } catch (err) {
                return;
              }
            }
          }}
        >
          {loading ? <CircularProgress /> : "Save"}
        </Button>
      </Box>
    </div>
  );
};
// if (verification===true && role==='user'){
//   return navigate('/user')
// }
// if (verification === true && role === "collegeadmin") {
//   return navigate("/collegeadmin");
// }

// return navigate('/')

export default UserSelectUI;
