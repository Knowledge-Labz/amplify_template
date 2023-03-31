import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function SearchableDropdownSingle({ labelValue, placeholderValue, setFunction }) {
  return (
    <div
    // make sure this div leaves a margin equal to 20% each side of container
    style={{ width: '66%', margin: '0 auto' }}
    >
      <Autocomplete
        id="tags-standard"
        options={users}
        getOptionLabel={(option) => option}
        defaultValue={""}
        onChange={(event, newValue) => {
            console.log(newValue)
            setFunction(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label={labelValue}
            placeholder={placeholderValue}
          />
        )}
      />
    </div>
  );
}

const users = [
    "dummy1@egyde.ca",
    "dummy2@egyde.ca",
    "dummy3@egyde.ca",
    "dummy4@egyde.ca"
  ]