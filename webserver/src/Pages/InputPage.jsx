import React, { useCallback, useState, useEffect } from "react";
import { useLocalDb, useRemoteDb } from "../DbContext";
import "./InputPage.css";
import { Formik, FastField, Form } from "formik";
import InputNumberField from "../components/InputNumberField.jsx";
import { TextField, Button, Grid, FormRow, Divider, Checkbox, Radio, FormControlLabel, FormControl, FormLabel, RadioGroup, IconButton, InputAdornment, Box } from "@mui/material";
import { useProcessedDataBucket } from "../ProcessedDataBucketContext";
import { getProcessedDataBucket, updateProcessedDataBucket } from "../ProcessedDataBucket";
import { useLocation } from "react-router-dom";

const InputPage = () => {
  let panel_sx = {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
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

  let { localdb, setLocaldb } = useLocalDb();
  let { remotedb, setRemotedb } = useRemoteDb();
  const { processedDataBucket, setProcessedDataBucket } = useProcessedDataBucket();
  const location = useLocation();

  let id = "";
  if (location.state != null) {
    id = location.state.id;
  }
  console.log(id);

  const [oldDocExists, setOldDocExists] = useState(false);
  const [oldDoc, setOldDoc] = useState(null);
  const onSubmit = useCallback(
    // (old_doc, new_doc) => {
    (values, { setSubmitting, resetForm }) => {
      if (oldDocExists && oldDoc.$id == values.$id) {
        localdb
          .saveChanges(oldDoc, values)
          .then((result) => {
            alert("Changes Saved Successfully!");
            setSubmitting(false);
          })
          .then(localdb.sync(remotedb))
          .catch(console.log);
      } else {
        localdb
          .save(values)
          .then((result) => {
            alert("Saved Successfully!");
            setSubmitting(false);
          })
          .then(localdb.sync(remotedb))
          .catch(console.log);
      }
    },
    [localdb, oldDoc]
  );

  useEffect(() => {
    localdb.all().then((res) => {
      let old_doc = {
        $id: id,
        // type: "match",
        fouls: "0",
        fouls_tech: "0",
        flipped: false,
        red_cards: "0",
        yellow_cards: "0",
        disabled: false,
        taxi_auto: false,
        upper_hub_auto: "0",
        lower_hub_auto: "0",
        upper_hub_teleop: "0",
        lower_hub_teleop: "0",
        climb_level: "0",
        alliance: "",
        defence: "0",
        disabled: false,
      };
      if (id != null && typeof res[id] !== "undefined") {
        old_doc = res[id];
        setOldDocExists(true);
      }
      setOldDoc(old_doc);
    });
  }, [setOldDoc]);

  // const onSubmit = useCallback(
  //   (values, { setSubmitting, resetForm }) => {
  //     // setTimeout(() => {
  //     localdb
  //       .put({
  //         // _id: new Date().toISOString(),
  //         _id: "match_" + values.match_number + "_team_" + values.team_number,
  //         _rev: new Date().toISOString(),
  //         type: "match",
  //         ...values,
  //       })
  //       .then((result) => {
  //         alert("Input Saved Successfully!");
  //         console.log(result);
  //         console.log(localdb);
  //         localdb.replicate.to(remotedb, {
  //           retry: true,
  //         });
  //       })
  //       .catch((err) => {
  //         console.log("Failed To Save Input!");
  //         alert(err);
  //       });
  //     // alert(JSON.stringify(values, null, 2));
  //     resetForm(); //Hah tobad
  //     setSubmitting(false);
  //     // }, 400);
  //     updateProcessedDataBucket(localdb, setProcessedDataBucket);
  //   },
  //   [localdb, remotedb, setProcessedDataBucket, updateProcessedDataBucket]
  // );
  if (oldDoc == null) return null;
  console.log(oldDoc);
  return (
    <div>
      <br />
      <Formik initialValues={oldDoc} validateOnChange="false" onSubmit={onSubmit}>
        {({ values, setValues, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Form>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Box sx={panel_sx}>
                <FastField type="input" as={TextField} name="$id" label="Match Key" />
              </Box>

              <Box sx={panel_sx}>
                <InputNumberField name="upper_hub_auto" label="Upper Hub Auto" />
                <InputNumberField name="lower_hub_auto" label="Lower Hub Auto" />
                <FormControlLabel control={<FastField as={Checkbox} type="checkbox" name="taxi_auto" />} label="Auto Taxi" />
              </Box>

              <Box sx={panel_sx}>
                <InputNumberField name="upper_hub_teleop" label="Upper Hub Teleop" />
                <InputNumberField name="lower_hub_teleop" label="Lower Hub Teleop" />
              </Box>

              <Box sx={panel_sx}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Climbing</FormLabel>
                  <RadioGroup aria-label="Climbing" name="climb_level" row>
                    <FormControlLabel control={<FastField as={Radio} type="radio" name="climb_level" value="0" />} label="None" />
                    <FormControlLabel control={<FastField as={Radio} type="radio" name="climb_level" value="1" />} label="Low" />
                    <FormControlLabel control={<FastField as={Radio} type="radio" name="climb_level" value="2" />} label="Mid" />
                    <FormControlLabel control={<FastField as={Radio} type="radio" name="climb_level" value="3" />} label="High" />
                    <FormControlLabel control={<FastField as={Radio} type="radio" name="climb_level" value="4" />} label="Traversal" />
                  </RadioGroup>
                </FormControl>
              </Box>

              <Box sx={panel_sx}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <InputNumberField name="fouls" label="Fouls" />
                  <InputNumberField name="fouls_tech" label="Tech Fouls" />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <InputNumberField name="red_cards" label="Red Cards" />
                  <InputNumberField name="yellow_cards" label="Yellow Cards" />
                </Box>
              </Box>

              <Box sx={panel_sx}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Defense</FormLabel>
                  <RadioGroup aria-label="Defense" name="defence" row>
                    <FormControlLabel control={<FastField as={Radio} type="radio" name="defence" value="0" />} label="None" />
                    <FormControlLabel control={<FastField as={Radio} type="radio" name="defence" value="1" />} label="Poor" />
                    <FormControlLabel control={<FastField as={Radio} type="radio" name="defence" value="2" />} label="Good" />
                    <FormControlLabel control={<FastField as={Radio} type="radio" name="defence" value="3" />} label="Exceptional" />
                  </RadioGroup>
                </FormControl>
                <FormControlLabel control={<FastField as={Checkbox} type="checkbox" name="disabled" />} label="Disabled" />
              </Box>

              <Box sx={{ ...panel_sx, display: "flex", flexDirection: "column" }}>
                {/* <h2>What they _______</h2>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 2, p: 0, m: 0 }}>
                  <FastField type="input" as={TextField} multiline rows={3} name="team_abilities_well" label="did well" />
                  <FastField type="input" as={TextField} multiline rows={3} name="team_abilities_struggle" label="struggled with" />
                  <FastField type="input" as={TextField} multiline rows={3} name="team_abilities_cant" label="can't do" />
                </Box> */}
                <Button type="submit" disabled={isSubmitting}>
                  Save
                </Button>
              </Box>
            </Box>
            <div />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default InputPage;
