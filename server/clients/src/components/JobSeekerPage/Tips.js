import React, { useEffect, useState } from "react";
import axios from "axios";
import { REACT_APP_SERVER_URL } from "../../config";

import { useSelector } from "react-redux";

import Navbar from "./Navbar";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
import { Box, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { BsHandThumbsUp, BsHandThumbsUpFill } from 'react-icons/bs';
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
    
            console.log("response form tips", response.data.message)
            if (response.status === 200) {
                const updatedData = data.map(item => {
                    if (item._id === tipId) {
                        return {
                            ...item,
                            likes: response.data.likes,
                            msg: response.data.message
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
      <div style={{fontFamily:"Arial", minWidth:"40rem", minHeight:"40rem"}}>
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
                                            {item.msg === "Liked" ? (
                                                <BsHandThumbsUpFill size={30} color="blue" />
                                            ) : (
                                                <BsHandThumbsUp size={30} color="gray" />
                                            )}
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
    );
};

export default Tips;