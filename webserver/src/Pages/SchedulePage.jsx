import React, { useCallback } from "react";
import { Formik, FastField, Form, useFormikContext } from "formik";
import { TextField, Button, Grid, FormRow, Divider, Checkbox, Radio, FormControlLabel, FormControl, FormLabel, RadioGroup, IconButton, NotesAdornment, Box } from "@mui/material";
import { useProcessedDataBucket } from "../ProcessedDataBucketContext";
import { getProcessedDataBucket, updateProcessedDataBucket } from "../ProcessedDataBucket";
import Schedule from "../components/Schedule";

const SchedulePage = () => {
  return (
    <Box>
      <Schedule />
    </Box>
  );
};

export default SchedulePage;
