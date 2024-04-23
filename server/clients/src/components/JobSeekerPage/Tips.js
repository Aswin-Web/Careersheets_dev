import React, { useEffect, useState } from "react";
import axios from "axios";
import { REACT_APP_SERVER_URL } from "../../config";

import { useSelector } from "react-redux";

import Navbar from "./Navbar";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
import { Box, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Card from 'react-bootstrap/Card';

const Tips = () => {
    const [data, setData] = useState([]);
    console.log("data from tips",data);

    const token = useSelector((state) => state.auth.value);

    const eduItems = useSelector((state) => state.edu.items);
    console.log("Edu Items",eduItems);
    
    
    const incrementViews = async (tipId) => {
        try {
            const requestdata ={
                tipId: tipId
            }
            await axios.put(`${REACT_APP_SERVER_URL}/user/status/incrementViews`,requestdata, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }, 
            });
        } catch (error) {
            console.error("Error incrementing views:", error);
        }
    };

    const handleGetStatus = async () => {

        if (eduItems.length === 0) {
            setData([]); 
        } else{
    
        const collegeName = eduItems[0].collegeName;

        try {
            const response = await axios.get(`${REACT_APP_SERVER_URL}/user/status/getTips`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    collegeName: collegeName,
                }
            });
    
            if (response.status === 200) {
                setData(response.data);
            }
        } catch (error) {
            console.error("Error fetching tips:", error);
        }
    }
    };

    /* const handleLike = async () => {
        for (const item of data) {
            try {
                const tipId = item._id;
                try {
                    const response = await axios.post(`${REACT_APP_SERVER_URL}/user/status/toggleLike`, {
                        tipId: tipId,
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    });
            
                    if (response.status === 200) {
                        const updatedTip = data.find(item => item._id === tipId);
                        updatedTip.likes = response.data.likes;
                        updatedTip.likesCount = response.data.likesCount;
                        setData([...data]);
                    }
                } catch (error) {
                    console.error("Error toggling like status:", error);
                }

            } catch (error) {
                console.error(`Error incrementing likes for item ID ${item._id}:`, error);
            }
        }
    }; */
    const handleLike = async (tipId) => {
        try {
            const response = await axios.post(`${REACT_APP_SERVER_URL}/user/status/toggleLike`, {
                tipId: tipId,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (response.status === 200) {
                const updatedData = data.map(item => {
                    if (item._id === tipId) {
                        return {
                            ...item,
                            likes: response.data.likes
                        };
                    }
                    return item;
                });
                setData(updatedData);
            }
        } catch (error) {
            console.error("Error toggling like status:", error);
        }
    };

    useEffect(()=>{
        handleGetStatus(); 
    },[]);

    useEffect(() => {
        const incrementAllViews = async () => {
            for (const item of data) {
                try {
                    await incrementViews(item._id);
                } catch (error) {
                    console.error(`Error incrementing views for item ID ${item._id}:`, error);
                }
            }
        };
    
        if (data.length > 0) {
            incrementAllViews();
        }
    }, [data]);

    return (
        <div>
        <Helmet>
        <title>CareerSheets-User</title>
        <link
          rel="icon"
          type="image/x-icon"
          href="https://yt3.googleusercontent.com/JSKcgbOwC9er1na2B_jWU9OsNfouSfm_bs1CASylTw9cHZEycRixrqpJIMoNoU7QpEtPPTWxysw=s176-c-k-c0x00ffffff-no-rj"
        />
      </Helmet>
      <Navbar className="Navbar" />
      <div style={{marginTop:"10rem", marginLeft:"50rem", marginRight:"20rem", fontFamily:"Arial"}}>
            <ul style={{listStyle:"none"}}>
                {data.map((item) => (
                    <li key={item._id}>
                        <Card>
                            <div style={{display:"flex",flexDirection:"row", justifyContent:"space-between", marginLeft:"3rem", marginRight:"3rem", marginTop:"3rem"}}>
                            <span>
                                <img style={{borderRadius:"3rem"}} src={item.displayPicture} alt="profile" />
                                <span style={{fontSize:"2rem", marginLeft:"1rem"}}><b>{item.studentName}</b></span>
                            </span>
                            <span style={{fontSize:"1rem", alignContent:"center"}}>
                            {item.college}
                            </span>
                            </div>
                            
                            <Card.Body>
                                <Card.Title style={{margin:"2rem"}}>
                                    <span><b>Skills</b></span> 
                                    <br /><br /> 
                                    <span style={{fontSize:"1rem"}}>{item.skills}</span>
                                </Card.Title>
                                <Card.Title style={{margin:"2rem"}}>
                                    <span><b>Tips</b></span> 
                                    <br /><br /> 
                                    <span style={{fontSize:"1rem"}}>{item.tips}</span>
                                </Card.Title>
                            </Card.Body>
                            <div style={{marginRight:"3rem",marginBottom:"2rem",marginLeft:"3rem", display:"flex", justifyContent:"space-between"}}>
                                <span style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                                    <span>
                                        <button style={{border:"none", backgroundColor:"white"}} onClick={() => handleLike(item._id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                                                <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                                            </svg>
                                        </button>
                                    </span>
                                    <span>
                                    { item.likes.length <= 1 ? ( 
                                        <Typography style={{fontSize:"0.8rem", marginTop:"0.5rem"}}><b>{item.likes.length}</b> Like</Typography>
                                    ) : (
                                        <Typography style={{fontSize:"0.8rem", marginTop:"0.5rem"}}><b>{item.likes.length}</b> Likes</Typography>
                                    )}
                                    </span>
                                </span>
                                <Typography>Views:&ensp;<b>{item.views}</b></Typography>
                            </div>
                        </Card>
                        <br/><br/>
                    </li>
                ))}
            </ul>
            </div>
            <Box className="UserBody">
        <Box>
          <LeftSideBar />
        </Box>
        <RightSideBar />
      </Box>
        </div>
    );
};

export default Tips;