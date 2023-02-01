import React, { useCallback } from "react";
import { Box, InputLabel, MenuItem, FormControl, Select, Button } from "@mui/material";
import { setDatabaseName, useLocalDb, useRemoteDb } from "../DbContext";
import { useProcessedDataBucket } from "../ProcessedDataBucketContext";

const DbChooser = (props) => {
  const { localdb, setLocaldb } = useLocalDb();
  const { remotedb, setRemotedb } = useRemoteDb();
  const { processedDataBucket, setProcessedDataBucket } = useProcessedDataBucket();

  const [dbname, setDbName] = React.useState(localdb.name);

  const sync = useCallback(() => {
    localdb.sync(remotedb, {
      // live:true,
      retry: true,
    });
  }, [localdb, remotedb]);

  const handleChange = useCallback((event) => {
    console.log(event.target.value);
    // setAge(event.target.value);
    setDbName(event.target.value);
    setDatabaseName(event.target.value, setLocaldb, setRemotedb, setProcessedDataBucket);
  });
  return (
    <div>
      {/* <Box sx={{ width: 400 }}>
        <FormControl fullWidth>
          <InputLabel>Database</InputLabel>
          <Select value={dbname} label="Database Name" onChange={handleChange}>
            <MenuItem value={"denver_practice"}>Denver Practice Matches</MenuItem>
            <MenuItem value={"denver_fr"}>Denver For Real</MenuItem>
            <MenuItem value={"utah_practice"}>Utah Practice Matches</MenuItem>
            <MenuItem value={"utah_fr"}>Utah For Real</MenuItem>
            <MenuItem value={"testdata"}>Test Data</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={sync}>Force Sync</Button>
      </Box> */}
    </div>
  );
};

export default DbChooser;
