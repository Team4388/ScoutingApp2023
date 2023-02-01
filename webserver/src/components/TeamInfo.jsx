import React, { useCallback, useEffect, useState } from "react";
import { useLocalDb, useRemoteDb } from "../DbContext";
import { Formik, FastField, Form, useFormikContext } from "formik";
import { TextField, Button, Grid, FormRow, Divider, Checkbox, Radio, FormControlLabel, FormControl, FormLabel, RadioGroup, IconButton, NotesAdornment, Box } from "@mui/material";
import { useProcessedDataBucket } from "../ProcessedDataBucketContext";
import { getProcessedDataBucket, updateProcessedDataBucket } from "../ProcessedDataBucket";
import { useLocation } from "react-router-dom";

const TeamInfo = (props) => {
  let { localdb, setLocaldb } = useLocalDb();
  let { remotedb } = useRemoteDb();
  const team = props.team;
  console.log(team);

  let panel_sx = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    bgcolor: "background.paper",
    p: 2,
    m: 1,
    gap: 2,
    maxWidth: "fit-content",
    borderRadius: "10px",
    boxShadow: 7,
    minWidth: 200,
  };

  const [oldDoc, setOldDoc] = useState(null);
  const [teamName, setTeamName] = useState("");
  const onSubmit = useCallback(
    // (old_doc, new_doc) => {
    (values, { setSubmitting, resetForm }) => {
      localdb
        .saveChanges(oldDoc, values)
        .then((result) => {
          alert("Saved Successfully!");
          setSubmitting(false);
        })
        .then(localdb.sync(remotedb))
        .catch(console.log);
    },
    [localdb, oldDoc]
  );

  useEffect(() => {
    localdb.all().then((res) => {
      let old_doc = {
        $id: team,
        weight: "",
        drive_train: "",
        drive_motors: "",
        wheels: "",
        climb_level: "",
	which_hub: "",
	shooter_type: "",
	alignment_strategy: "",
        misc_design: "",
      };
      if (typeof res[team] !== "undefined") {
        old_doc = res[team];
      }
      if (typeof res["team_list"] !== undefined) {
        console.log("team list");
          console.log(res["team_list"]);
        if (typeof res["team_list"]["teams"][team] !== undefined) {
          const teamData = res["team_list"]["teams"][team];
          // console.log(res["team_list"]["teams"][team]);
          setTeamName(teamData.number + " " + teamData.nickname);
        }
      }
      setOldDoc(old_doc);
    });
  }, [setOldDoc]);

  if (oldDoc == null) return null;
  console.log(oldDoc);
  return (
    <Box>
            <Box sx={panel_sx}>
      <h3>
        {teamName}
      </h3>
      <Formik initialValues={oldDoc} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form>
              <FastField type="input" as={TextField} name="weight" label="Weight" />
              <FastField type="input" as={TextField} name="drive_train" label="Drive Train Type" />
              <FastField type="input" as={TextField} name="drive_motors" label="# of Drive Motors" />
              <FastField type="input" as={TextField} name="wheels" label="Wheels" />
              <FastField type="input" as={TextField} name="climb_level" label="Climb Level" />
              <FastField type="input" as={TextField} name="which_hub" label="Which Hub" />
              <FastField type="input" as={TextField} name="shooter_type" label="Shooter Type" />
              <FastField type="input" as={TextField} name="alignment_strategy" label="Alignment Strat" />
              <FastField type="input" as={TextField} name="misc_design" label="Misc" />
            <Box sx={{ ...panel_sx, display: "flex", flexDirection: "column" }}>
              <Button type="submit" disabled={isSubmitting}>
                Save
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
            </Box>
      </Box>
  );
};

export default TeamInfo;
