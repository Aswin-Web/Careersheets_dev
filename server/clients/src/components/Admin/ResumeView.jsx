import React, { useEffect, useState } from "react";
import DownloadButton from "./DownloadResume";
import Resume from "./Resume";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useNavigation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dataAction } from "../../redux/reducers/data";
import Button from "@mui/material/Button";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box } from "@mui/material";
import { REACT_APP_CLIENT_URL, REACT_APP_SERVER_URL } from "../../config";
const ResumeViewAdmin = () => {
  console.log(`${REACT_APP_CLIENT_URL}admin/profile/resume/pdf/`)

  const [data, SetData] = useState();
  console.log(data , "Please HElp")
  const navigate = useNavigate();
  const location=useLocation()
  const sendRequest = async () => {
    const response = await axios
      .get(`${REACT_APP_SERVER_URL}/admin/user/${location.pathname.split("/").pop()}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin")}`,
        },
      })
      .catch((err) => console.log(err));
    const data = await response.data;

     console.log(data,"sihfddiusfhush");

    return data;
  };
  
  const pageViewed=async ()=>{
    const response = await axios
      .post(`${REACT_APP_SERVER_URL}/admin/user/view`,
      {
        userId:location.pathname.split("/").pop(),
        jobId:location.pathname.split("/")[location.pathname.split("/").length -2]
      }, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin")}`,
        },
      })
      .catch((err) => console.log(err));
    
  }
  const wishlisted=async ()=>{
    const response = await axios
      .post(`${REACT_APP_SERVER_URL}/admin/user/wishlist`,
      {
        userId:location.pathname.split("/").pop(),
        jobId:location.pathname.split("/")[location.pathname.split("/").length -2],
        isWishlisted:false
      }, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin")}`,
        },
      })
      .catch((err) => console.log(err));
    
  }

  useEffect(() => {
    // pageViewed()
    sendRequest()
      .then((data) => {
        SetData(data);
        //  dispatch(dataAction.AddData(data));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="app">
      <Box sx={{display:'flex' ,padding:'1rem',gap:'1rem'}}>
        
      {data !== undefined ?<a className="app" href={`${REACT_APP_CLIENT_URL}/admin/profile/resume/pdf/${data._id}`}rel='noreferrer' target="_blank" style={{color:'black',textDecoration:'none'}}>
      <DownloadButton
        onClick={() => {
          // navigate(`pdf/${data._id}`,'_blank');
          // navigate("pdf");
        }}
      />
      </a>  :<></> } 

        {/* <Link to={`pdf/${data._id}`} target="_blank"> */}

        {/* <DownloadButton
          onClick={() => {
            console.log(data._id,"DATAS")
            
          }}
          /> */}

          
           {/* onClick={()=>window.open(`pdf/${data._id}`,'_blank', 'rel=noopener noreferrer')} */}
          {/* </Link> */}
        {/* <Button onClick={()=>{

        }}>
        <FavoriteBorderIcon sx={{color:'red'}}/>
        </Button> */}
      </Box>
      {/* <PDFGenerator /> */}
      <Resume data={data} />
    </div>
  );
};

export default ResumeViewAdmin;
