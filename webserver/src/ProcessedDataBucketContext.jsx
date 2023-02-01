import React, { useContext, useState, useEffect} from "react";
import { useLocalDb } from "./DbContext.jsx";
import { ProcessedDataBucket } from "./ProcessedDataBucket.jsx";
import { getProcessedDataBucket, updateProcessedDataBucket } from "./ProcessedDataBucket";

export const ProcessedDataBucketContext = React.createContext();
export function useProcessedDataBucket() {
  return useContext(ProcessedDataBucketContext);
}

export function ProcessedDataBucketProvider({ children }) {
  //create the processed data bucket object
  const { localdb } = useLocalDb();
  const [processedDataBucket, setProcessedDataBucket] = useState(null);
  localdb.delta.on("update", (changes) => {
    // console.log("CHANGES");
    updateProcessedDataBucket(localdb, setProcessedDataBucket);
  });
  // useEffect(()=>{
  //   updateProcessedDataBucket(localdb, setProcessedDataBucket);
  // }, [setProcessedDataBucket]);
  return <ProcessedDataBucketContext.Provider value={{ processedDataBucket, setProcessedDataBucket }}>{children}</ProcessedDataBucketContext.Provider>;
}
