import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import axios from "axios";
import { REACT_APP_SERVER_URL } from "../../config";
// import classes from "./Table.module.css";

const LastSeen = () => {
    const [list , setList]=useState([])
    const newArray=list.map(x=>{
      try {
        return {
          name:x.user_id.name,
          email:x.user_id.email,
          createdAt:new Date(x.createdAt).toDateString(),
          time:new Date(x.createdAt).toLocaleTimeString()
          
                      
      }
      } catch (error) {
       console.log(error) 
      }

        
    })
    console.log(newArray)
  const data = {
    columns: [
      {
        label: "Username",
        field: "name",
        sort: "asc",
        width: 250,
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
        width: 150,
      },
      {
        label: "Logged in",
        field: "createdAt",
        sort: "asc",
        width: 200,
      },
      {
        label: "Time",
        field: "time",
        sort: "asc",
        width: 200,
      },
     
     
    ],
    rows: newArray
  };

  const sendRequest=async ()=>{
    const data=await axios.get(`${REACT_APP_SERVER_URL}/admin/lastseen`,
    
     {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("admin")}`,
      },
    })
    console.log(data.data.list)
    setList([...data.data.list])
    return data.data.list
  }

  useEffect(() => {
    sendRequest()

}, [])
  

  return (
    <div  style={{
        marginTop: "5em"
    }}>
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

export default LastSeen