import React from "react";
import { Formik, FastField, Form, useFormikContext } from "formik";
import { TextField, Button, Grid, FormRow, Checkbox, Radio, FormControlLabel, FormControl, FormLabel, RadioGroup, IconButton, InputAdornment } from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";

const InputNumberField = (props) => {
  const { values, setFieldValue } = useFormikContext();
  return (
    <FastField
      //https://stackoverflow.com/questions/50823182/material-ui-remove-up-down-arrow-dials-from-textview
      type="tel" //telephone numbers because 'number' creates unwanted arrows
      as={TextField}
      name={props.name}
      label={props.label}
      InputProps={{
        style: { fontSize: 40, maxWidth: 300 },
        startAdornment: (
          <InputAdornment position="start">
            <IconButton
              onClick={() => {
                setFieldValue(props.name, Math.max(parseInt(values[props.name]) - 1, 0));
              }}
              touch="true"
            >
              <RemoveCircleOutline style={{ fontSize: 50 }} />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => {
                setFieldValue(props.name, Math.max(parseInt(values[props.name]) + 1, 0));
              }}
              touch="true"
            >
              <AddCircleOutline style={{ fontSize: 50 }} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default InputNumberField;
