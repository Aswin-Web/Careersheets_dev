import React, { useState } from "react";
import Axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import { REACT_APP_SERVER_URL } from "../../config";
const centerItems = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "10px",
  margin: "0.5rem 0",
};

let pages = 0;
let time = 0;
const SearchUser = () => {
  const [keyword, setkeyword] = useState("");
  const [users, setusers] = useState([]);
  const [outputNumber, setoutputNumber] = useState(0);
  const [fromDate, setfromDate] = useState("");
  const [ToDate, setToDate] = useState("");
  const NetworkRequest = async () => {
    console.log(outputNumber);
    // console.log(users, "ANALYZE");
    console.log(fromDate, ToDate); 
    const resp = await Axios.post(
      // `${REACT_APP_SERVER_URL}/admin/getusers?key=${keyword}&page=${pages}`,
      `${REACT_APP_SERVER_URL}/admin/getusers?key=${keyword}&page=${pages}`,
      
      
      {
        fromDate,
        ToDate,
      }
    );
    if (resp.status === 200) {
      console.log(resp.data.users);
      if (pages === 0) {
        setusers([...resp.data.users]);
        setoutputNumber(resp.data.total);
      } else {
        console.log(resp.data.total);
        setoutputNumber(resp.data.total);
        setusers([...users, ...resp.data.users]);
      }
      // console.log(resp.data.users, "USER LISTTTT", resp);
    }
  };
  // console.log(pages);

  return (
    <div style={{ padding: "1rem" }}>
      <div>
        <div style={{ display: "flex", alignItems: "end", gap: "16px" }}>
          <div>
            <div>
              <label>Search</label>
            </div>
            <input
              type="text"
              value={keyword}
              onChange={(e) => {
                setkeyword(e.target.value);

                if (time > 0) {
                  clearTimeout(time);
                }
                setusers([]);
                pages = 0;

                time = setTimeout(() => {
                  //   console.log("Hello");
                  //   console.log("Hi bro");
                  console.log(users, pages, "hhhhh");
                  NetworkRequest();
                }, 500);
              }}
            />
            {/* <button
              onClick={() => {
                if (keyword !== "") {
                  console.log(keyword);
                  NetworkRequest();
                }
              }}
            >
              Search
            </button> */}
          </div>
          <div>
            <label>From</label>
            <div>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => {
                  setfromDate(e.target.value);
                }}
              ></input>
            </div>
          </div>

          <div>
            <label>To</label>
            <div>
              <input
                type="date"
                value={ToDate}
                onChange={(e) => {
                  setToDate(e.target.value);
                }}
              ></input>
            </div>
          </div>
          <div>
            <button
              style={{ padding: "0.25rem" }}
              onClick={() => {
                pages = 0;
                if (true) {
                  console.log(fromDate, ToDate);
                  console.log(keyword);
                  NetworkRequest();
                }
              }}
            >
              Search
            </button>
          </div>
        </div>
        <div>
          {" "}
          {outputNumber === 0
            ? "No results found"
            : `Showing : ${outputNumber}`}
        </div>
        {users.length !== 0 ? (
          <>
            {users.map((x, i) => {
              return (
                // <div key={i}>
                //   <h5 style={{ margin: "1rem" }}>
                //     {" "}
                //     <img
                //       referrerPolicy="no-referrer"
                //       style={{ borderRadius: "50%" }}
                //       src={x._source.displayPicture}
                //       alt={x._source.name}
                //     />{" "}
                //     {x._source.name + " " + x._source.email}
                //   </h5>
                // </div>
                <Box
                  key={Math.random() * 0.9999}
                  sx={{
                    width: "20vw",
                    backgroundColor: "white",
                    padding: "1rem",
                    border: "1px solid black",
                    display: "inline-block",
                    margin: "1rem",
                    borderRadius: "10px",
                    overflow: "hidden",
                    height: "35vh",
                  }}
                >
                  {/* Heading */}
                  <Box>
                    <h5>
                      {" "}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                        }}
                      >
                        <img
                          referrerPolicy="no-referrer"
                          style={{ borderRadius: "50%", height: "2rem" }}
                          src={x._source.displayPicture}
                          alt={x._source.name}
                        />
                        <h6>{x._source.name}</h6>
                      </Box>
                    </h5>
                  </Box>
                  {/* Horizontal Columns */}
                  <Box>
                    <Box sx={centerItems}>
                      {" "}
                      {/* <WorkOutlineIcon /> {x._source.name} years */}
                    </Box>
                    <Box sx={centerItems}>
                      {/* <CurrencyRupeeIcon /> */}
                      Type: {x._source.role}
                    </Box>
                  </Box>
                  <Box sx={centerItems}>
                    College:
                    {x._source.education[0]?.collegeName || "Not Disclosed"}
                  </Box>
                  <Box
                    sx={{
                      margin: "0.5rem 0",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={centerItems}>
                      Skills:{" "}
                      {x._source.skill.length > 15
                        ? x._source.skill.split(",").toString().slice(0, 25) +
                          "...."
                        : x._source.skill || "none"}
                    </Box>
                    <Box sx={centerItems}>created:{x._source.createdAt}</Box>
                    {/* <Box>
                    <Link to={`/admin/jobs/${item._id}`}>
                      <Button>View</Button>
                    </Link>
                  </Box> */}
                  </Box>
                </Box>
              );
            })}
          </>
        ) : (
          <></>
        )}
        <div>
          <button
            hidden={users.length === outputNumber ? true : false}
            onClick={() => {
              pages = pages + 1;
              NetworkRequest(pages);
            }}
          >
            Load More{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
