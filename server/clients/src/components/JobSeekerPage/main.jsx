import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
import { Box } from "@mui/material";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet-async";

const JobseekerPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, []);

    const sidebarWidth = isSidebarOpen ? 260 : 72;

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#f1f5f9", display: "flex", flexDirection: "column" }}>
            <Helmet>
                <title>CareerSheets - User Dashboard</title>
                <link
                    rel="icon"
                    type="image/x-icon"
                    href="https://yt3.googleusercontent.com/JSKcgbOwC9er1na2B_jWU9OsNfouSfm_bs1CASylTw9cHZEycRixrqpJIMoNoU7QpEtPPTWxysw=s176-c-k-c0x00ffffff-no-rj"
                />
            </Helmet>

            <Navbar />

            <Box sx={{ display: 'flex', flexGrow: 1, position: 'relative' }}>
                <LeftSideBar
                    isOpen={isSidebarOpen}
                    setIsOpen={setIsSidebarOpen}
                />

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        ml: { xs: 0, md: `${sidebarWidth}px` },
                        pt: "64px",
                        minHeight: "calc(100vh - 64px)",
                        transition: "margin 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        width: { xs: '100%', md: `calc(100% - ${sidebarWidth}px)` },
                        display: "flex",
                        flexDirection: "column",
                        overflowX: 'hidden'
                    }}
                >
                    <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 } }}>
                        <RightSideBar />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default JobseekerPage;
