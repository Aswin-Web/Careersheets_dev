import React, { useEffect, useState } from "react";
import axios from "axios";
import { REACT_APP_SERVER_URL } from "../../config";

import { useSelector } from "react-redux";

import Navbar from "./Navbar";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
import { Box } from "@mui/material";
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

    useEffect(()=>{
        handleGetStatus(); 
    },[]);

    /* useEffect(()=>{
        data.forEach((item) => {
            incrementViews(item._id);
        });
    },[data]); */

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
      <div style={{marginTop:"10rem", marginLeft:"50rem", marginRight:"20rem"}}>
            <ul style={{listStyle:"none"}}>
                {data.map((item) => (
                    <li key={item._id}>
                        <Card>
                            <Card.Header as="h5">Tips</Card.Header>
                            <Card.Body>
                                <Card.Title>Skills: {item.skills}</Card.Title>
                                <Card.Title>Tips: {item.tips}</Card.Title>
                                <Card.Title>College: {item.college}</Card.Title>
                                <Card.Title>Name of the student: {item.studentName}</Card.Title>
                                <Card.Title>Views: {item.views}</Card.Title>
                            </Card.Body>
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