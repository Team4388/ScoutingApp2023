import React from "react";
import "./WelcomePage.css";
import "../App.css";
import DbChooser from "../components/DbChooser";
import { Box, Button } from "@mui/material";

const WelcomePage = () => {
  return (
    <div className="welcome">
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1>Welcome to Ridgebotics Scouting Web Application 2022</h1>
        {/* <img src="/WelcomePageImage.webp" /> */}
        <img src="/picgoeshard.jpg" />
        <DbChooser />
      </Box>
    </div>
  );
};

export default WelcomePage;
