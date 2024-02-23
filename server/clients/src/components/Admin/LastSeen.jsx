import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import axios from "axios";
import { REACT_APP_SERVER_URL } from "../../config";

const LastSeen = () => {
    const [list , setList]=useState([]);

    useEffect(() => {
        sendRequest();
    }, []);

    const sendRequest = async () => {
        try {
            const response = await axios.get(`${REACT_APP_SERVER_URL}/admin/lastseen`, {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("admin")}`,
                },
            });
            setList([...response.data.list]);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const formattedList = list.map(item => {
        try {
            return {
                name: item.user_id.name,
                email: item.user_id.email,
                createdAt: new Date(item.createdAt).toDateString(),
                time: new Date(item.createdAt).toLocaleTimeString()
            };
        } catch (error) {
            console.log("Error formatting item:", error);
            return null;
        }
    });

    const data = {
        columns: [
            { label: "Username", field: "name", sort: "asc", width: 250 },
            { label: "Email", field: "email", sort: "asc", width: 150 },
            { label: "Logged in", field: "createdAt", sort: "asc", width: 200 },
            { label: "Time", field: "time", sort: "asc", width: 200 }
        ],
        rows: formattedList.filter(item => item !== null) // Filter out any null items
    };

    return (
        <div className="container ">
            <MDBDataTable
                striped
                bordered
                small
                data={data}
                entriesOptions={[5, 10, 15, 20]}
                entries={5}
            />
        </div>
    );
};

export default LastSeen;
