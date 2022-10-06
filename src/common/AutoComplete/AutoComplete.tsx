import React from "react";
import { Autocomplete as MUIAutoComplete, TextField } from "@mui/material";
import "./AutoComplete.scss";

function AutoComplete({ inputProps, autoCompleteProps }: { inputProps?: any; autoCompleteProps?: any }) {
	return <MUIAutoComplete {...autoCompleteProps}  renderInput={(props) => <TextField {...props} {...inputProps} />} />;
}

export default AutoComplete;
