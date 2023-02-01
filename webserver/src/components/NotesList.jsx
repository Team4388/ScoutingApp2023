import React from "react";
import { Formik, FastField, Form, useFormikContext } from "formik";
import { useProcessedDataBucket } from "../ProcessedDataBucketContext";

const NotesList = (props) => {
  const { values, submitForm } = useFormikContext();
  const { processedDataBucket, setProcessedDataBucket } = useProcessedDataBucket();
  if (processedDataBucket == null) {
     return null;
  }

//   console.log(values);
  if (typeof processedDataBucket.teamData[values.team_number] === "undefined") {
      return null;
  } else {
    // let notesList = processedDataBucket.teamData[values.team_number].notes;
    let notesList = processedDataBucket.teamData[values.team_number].notes;
    // let notesComponents = notesList.map((item, index)=>{
    return notesList.map((item, index)=>{
        return <h3 key={index}>{item}</h3>
    });
    // return (
    //     // <h2>{processedDataBucket.teamData[values.team_number].Name</h2>
    //     {notesComponents}
    // )
  }
}

export default NotesList;