import React, { useEffect, useState } from "react";
import axios from "axios";
import { REACT_APP_SERVER_URL } from "../../config";
import { useSelector } from "react-redux";
import {Box, Typography, Rating } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import Card from 'react-bootstrap/Card';
import { ToastContainer, toast } from "react-toastify";

const Tips = () => {
    const [data, setData] = useState([]);
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);

    const labels = {
        0.5: 'Useless',
        1: 'Useless+',
        1.5: 'Poor',
        2: 'Poor+',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Excellent+',
      };
      
    function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }

    const token = useSelector((state) => state.auth.value);

    const eduItems = useSelector((state) => state.edu.items);
    
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
                console.log("response data from get ", response.data)
                setData(response.data);
            }
        } catch (error) {
            console.error("Error fetching tips:", error);
        }
    }
    };

    const handleSubmitRating = async (tipId, value) => {
        try {
            const response = await axios.post(`${REACT_APP_SERVER_URL}/user/status/rating`, {
                tipId: tipId,
                rating: value
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("response from submitRating", response.data.message);
            if (response.status === 200) {
                toast("Ratings Submitted Successfully");
                const updatedData = data.map(item => {
                    if (item._id === tipId) {
                        return {
                            ...item,
                            rating: [{ rating: value }]
                        };
                    }
                    return item;
                });
                setData(updatedData);
            }
        } catch (error) {
            console.error("Error submitting rating:", error);
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
                            <div style={{ marginRight: "3rem", marginBottom: "2rem", marginLeft: "3rem", display: "flex", justifyContent: "space-between" }}>
                                <span style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    {item.rating.length > 0 ? (
                                            <Rating
                                                name="hover-feedback"
                                                getLabelText={getLabelText}
                                                value={item.rating[0].rating}
                                                precision={0.5}
                                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                onChange={(event, newValue) => {
                                                    setValue(newValue)
                                                    handleSubmitRating(item._id, newValue)
                                                }}
                                                onChangeActive={(event, newHover) => {
                                                    setHover(newHover);
                                                }}
                                            />
                                    ) : (
                                            <Rating
                                                name="hover-feedback"
                                                value={value}
                                                precision={0.5}
                                                getLabelText={getLabelText}
                                                onChange={(event, newValue) => {
                                                    setValue(newValue)
                                                    handleSubmitRating(item._id, newValue)
                                                }}
                                                onChangeActive={(event, newHover) => {
                                                    setHover(newHover);
                                                }}
                                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                            />
                                    )}
                                </span>
                                <Typography>Views:&ensp;<b>{item.views}</b></Typography>
                            </div>
                        </Card>
                        <br/><br/>
                    </li>
                ))}
            </ul>
            <ToastContainer />
        </div>
    );
};

export default Tips;