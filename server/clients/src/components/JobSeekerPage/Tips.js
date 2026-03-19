import React, { useEffect, useState } from "react";
import axios from "axios";
import { REACT_APP_SERVER_URL } from "../../config";
import { useSelector } from "react-redux";
import {
    Box,
    Typography,
    Rating,
    Container,
    Paper,
    Avatar,
    Stack,
    Divider,
    Tooltip
} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ToastContainer, toast } from "react-toastify";

const Tips = () => {
    const [data, setData] = useState([]);
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);

    const labels = {
        0.5: 'Useless', 1: 'Useless+', 1.5: 'Poor', 2: 'Poor+', 2.5: 'Ok',
        3: 'Ok+', 3.5: 'Good', 4: 'Good+', 4.5: 'Excellent', 5: 'Excellent+',
    };

    function getLabelText(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }

    const token = useSelector((state) => state.auth.value);
    const eduItems = useSelector((state) => state.edu.items);

    const incrementViews = async (tipId) => {
        try {
            await axios.put(`${REACT_APP_SERVER_URL}/user/status/incrementViews`, { tipId }, {
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
        } else {
            const collegeName = eduItems[0].collegeName;
            try {
                const response = await axios.get(`${REACT_APP_SERVER_URL}/user/status/getTips`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    params: { collegeName }
                });
                if (response.status === 200) {
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

            if (response.status === 200) {
                toast.success("Ratings Submitted Successfully");
                const updatedData = data.map(item => {
                    if (item._id === tipId) {
                        return { ...item, rating: [{ rating: value }] };
                    }
                    return item;
                });
                setData(updatedData);
            }
        } catch (error) {
            console.error("Error submitting rating:", error);
        }
    };

    useEffect(() => {
        handleGetStatus();
    }, [eduItems]);

    useEffect(() => {
        const incrementAllViews = async () => {
            for (const item of data) {
                incrementViews(item._id);
            }
        };
        if (data.length > 0) {
            incrementAllViews();
        }
    }, [data]);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Typography
                    variant="h3"
                    fontWeight="800"
                    sx={{
                        color: '#1e293b',
                        letterSpacing: '-0.03em',
                        mb: 1.5,
                        fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' }
                    }}
                >
                    Campus Feed & Tips
                </Typography>
                <Typography variant="h6" sx={{ color: '#64748b', fontWeight: 500, maxWidth: 800, mx: 'auto' }}>
                    Insights and feedback from your peers at {eduItems[0]?.collegeName || 'your college'}.
                </Typography>
            </Box>

            <Stack spacing={4} alignItems="center">
                {data.length === 0 ? (
                    <Paper
                        elevation={0}
                        sx={{
                            // p: 6,
                            // textAlign: 'center',
                            // borderRadius: 4,
                            // border: '1px solid #eef2f6',
                            // bgcolor: '#ffffff',
                            // width: '100%',
                            // maxWidth: 800
                        }}
                    >
                        <Typography variant="h6" color="text.secondary"></Typography>
                    </Paper>
                ) : (
                    data.map((item) => (
                        <Paper
                            key={item._id}
                            elevation={0}
                            sx={{
                                p: { xs: 2.5, sm: 4 },
                                borderRadius: 4,
                                border: "1px solid #eef2f6",
                                bgcolor: "#ffffff",
                                width: "100%",
                                maxWidth: 800,
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    boxShadow: "0 12px 40px -12px rgba(0,0,0,0.08)",
                                    borderColor: "#e2e8f0"
                                }
                            }}
                        >
                            <Stack direction="row" spacing={{ xs: 1.5, sm: 2 }} alignItems="center" sx={{ mb: 3 }}>
                                <Avatar
                                    src={item.displayPicture}
                                    sx={{ width: { xs: 48, sm: 56 }, height: { xs: 48, sm: 56 }, border: '2px solid #f1f5f9' }}
                                />
                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                    <Typography variant="h6" fontWeight="800" color="#1e293b" sx={{ wordBreak: 'break-word', lineHeight: 1.2, mb: 0.5, fontSize: { xs: '1rem', sm: '1.25rem' } }}>{item.studentName}</Typography>
                                    <Typography variant="body2" color="#64748b" fontWeight="600" sx={{ wordBreak: 'break-word' }}>{item.college}</Typography>
                                </Box>
                            </Stack>

                            <Stack spacing={3}>
                                <Box>
                                    <Typography variant="subtitle2" sx={{ color: '#155dfc', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', mb: 1 }}>Skills</Typography>
                                    <Typography variant="body1" sx={{ color: '#334155', lineHeight: 1.6, wordBreak: 'break-word' }}>{item.skills}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" sx={{ color: '#155dfc', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', mb: 1 }}>Interview Tips</Typography>
                                    <Typography variant="body1" sx={{ color: '#334155', lineHeight: 1.6, wordBreak: 'break-word' }}>{item.tips}</Typography>
                                </Box>
                            </Stack>

                            <Divider sx={{ my: { xs: 2, sm: 3 }, borderColor: '#f1f5f9' }} />

                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }}>
                                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                                    <Rating
                                        name={`rating-${item._id}`}
                                        value={item.rating?.[0]?.rating || 0}
                                        precision={0.5}
                                        onChange={(event, newValue) => handleSubmitRating(item._id, newValue)}
                                        emptyIcon={<StarIcon style={{ opacity: 0.2 }} fontSize="inherit" />}
                                    />
                                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, whiteSpace: 'nowrap' }}>
                                        {item.rating?.[0]?.rating ? labels[item.rating[0].rating] : 'Rate this'}
                                    </Typography>
                                </Stack>

                                <Stack direction="row" spacing={1} alignItems="center" sx={{ color: '#64748b' }}>
                                    <VisibilityIcon sx={{ fontSize: 18 }} />
                                    <Typography variant="body2" fontWeight="700">{item.views}</Typography>
                                    <Typography variant="body2" fontWeight="600">Views</Typography>
                                </Stack>
                            </Stack>
                        </Paper>
                    ))
                )}
            </Stack>
            <ToastContainer />
        </Container>
    );
};

export default Tips;