import React, { useCallback, useState, useEffect } from "react";
import { Formik, FastField, Form, useFormikContext } from "formik";
import { TextField, Button, Grid, FormRow, Divider, Checkbox, Radio, FormControlLabel, FormControl, FormLabel, RadioGroup, IconButton, NotesAdornment, Box } from "@mui/material";
import { useProcessedDataBucket } from "../ProcessedDataBucketContext";
import { getProcessedDataBucket, updateProcessedDataBucket } from "../ProcessedDataBucket";
import { useLocalDb } from "../DbContext";
import { Link } from "react-router-dom";

const TeamListPage = () => {
  let { localdb, setLocaldb } = useLocalDb();
  //   let

  let panel_sx = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: "background.paper",
    p: 2,
    m: 1,
    gap: 2,
    maxWidth: "fit-content",
    borderRadius: "10px",
    boxShadow: 7,
  };
  const [teamList, setTeamList] = useState(null);

  useEffect(() => {
    localdb.all().then((res) => {
      // console.log(res["schedule"]);
      setTeamList(res["team_list"]);
    });
  }, [setTeamList]);
  if (teamList == null) return <div />;
  console.log("test");
  console.log(teamList);

  const TeamNumberComponent = (props) => {
    return (
      <Link to="/Team" state={{ team: props.number }} style={{ color: "inherit" }}>
        <h3>{props.number}</h3>
      </Link>
    );
  };

  const teamsListComponents = Object.keys(teamList.teams).map((item, index) => {
    return (
      <Box key={index}>
        <TeamNumberComponent number={item} />
      </Box>
    );
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Box sx={panel_sx}>{teamsListComponents}</Box>
    </Box>
  );
};
export default TeamListPage;
