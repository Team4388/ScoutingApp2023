import React, { useCallback } from "react";
import { useLocalDb, useRemoteDb } from "../DbContext";
import "./NotesPage.css";
import { Formik, FastField, Form, useFormikContext } from "formik";
import { TextField, Button, Grid, FormRow, Divider, Checkbox, Radio, FormControlLabel, FormControl, FormLabel, RadioGroup, IconButton, NotesAdornment, Box } from "@mui/material";
import { useProcessedDataBucket } from "../ProcessedDataBucketContext";
import { getProcessedDataBucket, updateProcessedDataBucket } from "../ProcessedDataBucket";
import NotesList from "../components/NotesList";

const NotesPage = () => {
  let { localdb, setLocaldb } = useLocalDb();
  let { remotedb, setRemotedb } = useRemoteDb();
  const { processedDataBucket, setProcessedDataBucket } = useProcessedDataBucket();

  let panel_sx = {
    display: "flex",
    flexDirection: "column",
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
  

  const onSubmit = useCallback(
    (values, { setSubmitting, resetForm }) => {
      // setTimeout(() => {
      localdb
        .put({
          // _id: new Date().toISOString(),
          _id: "notes_team_" + values.team_number + (new Date().toISOString()),
          type: "notes",
          ...values,
        })
        .then((result) => {
          alert("Notes Saved Successfully!");
          console.log(result);
          console.log(localdb);
          localdb.replicate.to(remotedb, {
            retry: true,
          });
        })
        .catch((err) => {
          console.log("Failed To Save Notes!");
          alert(err);
        });
      // alert(JSON.stringify(values, null, 2));
      resetForm(); //Hah tobad
      setSubmitting(false);
      // }, 400);
      updateProcessedDataBucket(localdb, setProcessedDataBucket);
    },
    [localdb, remotedb, setProcessedDataBucket, updateProcessedDataBucket]
  );

  return (
    <div>
      <br />
      <Formik
        initialValues={{
          team_number: "",
          notes: ""
        }}
        validateOnChange="false"
        onSubmit={onSubmit}
      >
        {({ values, setValues, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Form>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {/* <Box sx={{ display: "flex", flexDirection: "row", gap: 2, p: 0, m: 0 }}> */}
              {/* <Box sx={{...panel_sx, flexDirection: "column"}} fullWidth> */}
              <Box sx={panel_sx} >
                <FastField type="input" as={TextField} name="team_number" label="Team #" />
                  <FastField type="input" as={TextField} multiline rows={3} name="notes" label="Notes" />
                <Button type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </Box>
              <Box sx={panel_sx} >
                <NotesList/>
                {/* {
                  processedDataBucket[] .map((item, index)=>{
                    return <h1 key={index}>{item}</h1>
                  })
                } */}
              </Box>
            </Box>
            <div />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NotesPage;
