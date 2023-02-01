import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, FastField, Form, useFormikContext } from "formik";
import { TextField, Button, Grid, FormRow, Divider, Checkbox, Radio, FormControlLabel, FormControl, FormLabel, RadioGroup, IconButton, NotesAdornment, Box } from "@mui/material";
import { useLocalDb, useRemoteDb } from "../DbContext";
import { useProcessedDataBucket } from "../ProcessedDataBucketContext";

const Schedule = (props) => {
  let { localdb, setLocaldb } = useLocalDb();
  //   let

  let panel_sx = {
    display: "flex",
    flexDirection: "row",
    alignItems: { xs: "center", sm: "center" },
    justifyContent: { xs: "flex-start", sm: "center" },
    bgcolor: "background.paper",
    p: 2,
    m: 1,
    gap: 2,
    maxWidth: "fit-content",
    borderRadius: "10px",
    boxShadow: 7,
  };
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    localdb.all().then((res) => {
      // console.log(res["schedule"]);
      setSchedule(res["schedule"]);
    });
  }, [setSchedule]);
  if (schedule == null) return <div />;

  const TeamNumberComponent = (props) => {
    return (
      // <Link to="/Input" state={{ id: props.match_id + "_" + props.number }} style={{ color: "inherit" }}>
      <Link to="/Team" state={{ team: props.number }} style={{ color: "inherit" }}>
        <h3>{props.number}</h3>
      </Link>
    );
  };

  const scheduleList = schedule.matches.map((item, index) => {
    // console.log(item);
    return (
      <Box sx={panel_sx} key={index}>
      <Link to="/Match" state={{ teams: [
        item.red[0],
        item.red[1],
        item.red[2],
        item.blue[0],
        item.blue[1],
        item.blue[2],
      ]}} style={{ color: "inherit" }}>
        <h3>{item.match_id}</h3>
      </Link>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: { xs: 0, sm: 1.5 }, color: "red_alliance", textDecoration: "none" }}>
          <TeamNumberComponent number={item.red[0]} match_id={item.match_id} />
          <TeamNumberComponent number={item.red[1]} match_id={item.match_id} />
          <TeamNumberComponent number={item.red[2]} match_id={item.match_id} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: { xs: 0, sm: 1.5 }, color: "blue_alliance" }}>
          {/* <li> */}
          <TeamNumberComponent number={item.blue[0]} match_id={item.match_id} />
          <TeamNumberComponent number={item.blue[1]} match_id={item.match_id} />
          <TeamNumberComponent number={item.blue[2]} match_id={item.match_id} />
        </Box>
      </Box>
    );
  });
  return <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>{scheduleList}</Box>;
  // console.log(schedule);

  //   superagent
  //     .get("https://www.thebluealliance.com/api/v3" + "/event/2022code/matches")
  //     .set("X-TBA-Auth-Key", "6aXgVYCAcyy4O7FwCGLqj5ATcima5k25smssLqUuHAHTCvGtCWXX7aoM9xNWfaSm")
  //     .end((err, res) => {
  //       console.log(JSON.parse(res.text));
  //     });

  //   const { values, submitForm } = useFormikContext();
  //   const { processedDataBucket, setProcessedDataBucket } = useProcessedDataBucket();
  //   if (processedDataBucket == null) {
  //     return null;
  //   }

  //   //   console.log(values);
  //   if (typeof processedDataBucket.teamData[values.team_number] === "undefined") {
  //     return null;
  //   } else {
  //     // let notesList = processedDataBucket.teamData[values.team_number].notes;
  //     let notesList = processedDataBucket.teamData[values.team_number].notes;
  //     // let notesComponents = notesList.map((item, index)=>{
  //     return notesList.map((item, index) => {
  //       return <h3 key={index}>{item}</h3>;
  //     });
  //     // return (
  //     //     // <h2>{processedDataBucket.teamData[values.team_number].Name</h2>
  //     //     {notesComponents}
  //     // )
  //   }
};

export default Schedule;
