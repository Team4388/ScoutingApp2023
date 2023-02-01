import React, { useCallback, useEffect, useState } from "react";
import { useLocalDb, useRemoteDb } from "../DbContext";
import { Formik, FastField, Form, useFormikContext } from "formik";
import { TextField, Button, Grid, FormRow, Divider, Checkbox, Radio, FormControlLabel, FormControl, FormLabel, RadioGroup, IconButton, NotesAdornment, Box } from "@mui/material";
import { useProcessedDataBucket } from "../ProcessedDataBucketContext";
import { getProcessedDataBucket, updateProcessedDataBucket } from "../ProcessedDataBucket";
import { useLocation } from "react-router-dom";
import TeamInfo from "../components/TeamInfo";

const TeamPage = () => {
  const location = useLocation();
  const { team } = location.state;
  return (
    <div>
      <TeamInfo team={team}/>
    </div>
  );
};

export default TeamPage;
