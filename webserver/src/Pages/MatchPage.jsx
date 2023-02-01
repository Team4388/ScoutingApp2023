
import React, { useCallback, useEffect, useState } from "react";
import { useLocalDb, useRemoteDb } from "../DbContext";
import { Formik, FastField, Form, useFormikContext } from "formik";
import { TextField, Button, Grid, FormRow, Divider, Checkbox, Radio, FormControlLabel, FormControl, FormLabel, RadioGroup, IconButton, NotesAdornment, Box } from "@mui/material";
import { useProcessedDataBucket } from "../ProcessedDataBucketContext";
import { getProcessedDataBucket, updateProcessedDataBucket } from "../ProcessedDataBucket";
import { useLocation } from "react-router-dom";
import TeamInfo from "../components/TeamInfo";

const MatchPage= () => {
  const location = useLocation();
  const { teams } = location.state;
  return (
    <div>
    <Box sx={{display: "flex", flexDirection: "row", gap: 1, overflowX: "scroll"}}>
      <TeamInfo team={teams[0]}/>
      <TeamInfo team={teams[1]}/>
      <TeamInfo team={teams[2]}/>
      <TeamInfo team={teams[3]}/>
      <TeamInfo team={teams[4]}/>
      <TeamInfo team={teams[5]}/>
    </Box>
    </div>
  );
};

export default MatchPage;
