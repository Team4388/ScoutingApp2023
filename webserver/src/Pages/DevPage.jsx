import React, { useCallback } from "react";
import { Formik, FastField, Form, useFormikContext } from "formik";
import { TextField, Button, Grid, FormRow, Divider, Checkbox, Radio, FormControlLabel, FormControl, FormLabel, RadioGroup, IconButton, NotesAdornment, Box } from "@mui/material";
import { useLocalDb, useRemoteDb } from "../DbContext";
import { useProcessedDataBucket } from "../ProcessedDataBucketContext";
import { getProcessedDataBucket, updateProcessedDataBucket } from "../ProcessedDataBucket";
import Schedule from "../components/Schedule";
import superagent from "superagent";

const DevPage = () => {
  let { localdb, setLocaldb } = useLocalDb();
  const putScheduleDoc = useCallback(
    (doc) => {
      localdb.save({
        $id: "schedule",
        type: "schedule",
        matches: doc,
      });
    },
    [localdb]
  );
  const putTeamListDoc = useCallback(
    (doc) => {
      localdb.save({
        $id: "team_list",
        type: "team_list",
        teams: doc,
      });
    },
    [localdb]
  );
  const processScheduleData = (data) => {
    data.sort((a, b) => a.predicted_time - b.predicted_time);
    let ret = [];
    console.log(data);
    for (let match of data) {
      // console.log(match);
      let red = [];
      let blue = [];

      for (let team_key of match.alliances.red.team_keys) {
        red.push(team_key.substring(3));
      }
      for (let team_key of match.alliances.blue.team_keys) {
        blue.push(team_key.substring(3));
      }

      ret.push({
        match_id: match.key.split("_")[1],
        // ret[match.key.split("_")[1]] = {
        // ret["yo"] = {
        red: red,
        blue: blue,
        score_breakdown: match.score_breakdown,
      });
      // console.log(match);
    }
    // console.log(ret);
    return ret;
  };

  const processTeamData = (data) => {
    data.sort((a, b) => a.key > b.key);
    let ret = {};
    for (let team of data) {
      ret[team.team_number] = {
        nickname: team.nickname,
        number: team.team_number,
        website: team.website,
      };
    }
    return ret;
  };

  const updateScheduleDoc = useCallback(() => {
    //gets the matches list from the blue alliance api
    superagent
      //.get("https://www.thebluealliance.com/api/v3" + "/event/2022code/matches")
      .get("https://www.thebluealliance.com/api/v3" + "/event/2022utwv/matches")
      // .get("https://www.thebluealliance.com/api/v3" + "/event/2022cala/matches")
      // .get("https://www.thebluealliance.com/api/v3" + "/events/2022/keys")
      .set("X-TBA-Auth-Key", "6aXgVYCAcyy4O7FwCGLqj5ATcima5k25smssLqUuHAHTCvGtCWXX7aoM9xNWfaSm")
      .end((err, res) => {
        //parse the resulting json and send it to the db
        putScheduleDoc(processScheduleData(JSON.parse(res.text)));
      });
    superagent
      .get("https://www.thebluealliance.com/api/v3" + "/event/2022utwv/teams")
      .set("X-TBA-Auth-Key", "6aXgVYCAcyy4O7FwCGLqj5ATcima5k25smssLqUuHAHTCvGtCWXX7aoM9xNWfaSm")
      .end((err, res) => {
        //parse the resulting json and send it to the db
        putTeamListDoc(processTeamData(JSON.parse(res.text)));
      });
  });

  const cleanDB = useCallback(() => {
    localdb.cleanup();
  }, [localdb]);
  return (
    <Box>
      <Button onClick={updateScheduleDoc}>Update Matches Doc</Button>
      <Button onClick={cleanDB}>Cleanup DB</Button>
    </Box>
  );
};

export default DevPage;
