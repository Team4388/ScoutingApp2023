import logo from "./logo.svg";
import Navigation from "./components/Navigation/Navigation";
import { DbProvider } from "./DbContext";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import "./App.css";
// const Cushion = require('cushiondb-client');

//Pages
import NotFoundPage from "./Pages/NotFoundPage";
import DashboardPage from "./Pages/DashboardPage/DashboardPage";
import WelcomePage from "./Pages/WelcomePage";
import SchedulePage from "./Pages/SchedulePage";
import InputPage from "./Pages/InputPage";
import TeamListPage from "./Pages/TeamListPage";
import DevPage from "./Pages/DevPage";
import TeamPage from "./Pages/TeamPage";
import MatchPage from "./Pages/MatchPage";
import { createTheme, ThemeProvider } from "@mui/material";
import { ProcessedDataBucketProvider } from "./ProcessedDataBucketContext";
import NotesPage from "./Pages/NotesPage";

function App() {
  console.log("WHAT THE FUCK")
  const darkTheme = createTheme({
    // Theme settings
    palette: {
      mode: "dark",
      background: {
        paper: "#203030",
      },
      text: {
        primary: "#edf8f3",
        secondary: "#acd3bf",
      },
      red_alliance: "#ec2e63",
      blue_alliance: "#2d74eb",
    },
    typography: {
      fontSize: 18,
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <DbProvider>
        <ProcessedDataBucketProvider>
          <Router>
            <Navigation />
            <div className="App">
              <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/Dashboard" element={<DashboardPage />} />
                <Route path="/Input" element={<InputPage />} />
                <Route path="/Notes" element={<NotesPage />} />
                <Route path="/Schedule" element={<SchedulePage />} />
                <Route path="/TeamList" element={<TeamListPage />} />
                <Route path="/Dev" element={<DevPage />} />
                <Route path="/Team" element={<TeamPage />} />
                <Route path="/Match" element={<MatchPage />} />
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
          </Router>
        </ProcessedDataBucketProvider>
      </DbProvider>
    </ThemeProvider>
  );
}

export default App;
