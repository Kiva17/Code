import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import "./FilterButton.css"

export default function CheckboxesGroup({ ColorFilterChange,state,GenderFilterChange,PriceFilterChange,TypeFilterChange }) {

  return (
    <Box sx={{ display: 'flex' }} className="filter">

      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">

        {/* color filter checkbox */}

        <FormLabel component="legend">Color</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={state.Red} onChange={ColorFilterChange} name="Red" />
            }
            label="Red"
          />
          <FormControlLabel
            control={
              <Checkbox checked={state.Blue} onChange={ColorFilterChange} name="Blue" />
            }
            label="Blue"
          />
          <FormControlLabel
            control={
              <Checkbox checked={state.Green} onChange={ColorFilterChange} name="Green" />
            }
            label="Green"
          />
        </FormGroup>

      {/* gender filter checkbox */}

        <FormLabel component="legend">Gender</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={state.Men} onChange={GenderFilterChange} name="Men" />
            }
            label="Men"
          />
          <FormControlLabel
            control={
              <Checkbox checked={state.Women} onChange={GenderFilterChange} name="Women" />
            }
            label="Women"
          />
        </FormGroup>

       {/* price filter checkbox */}

        <FormLabel component="legend">Price</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={state["0-250"]} onChange={PriceFilterChange} name="0-250" />
            }
            label="0-Rs250"
          />
          <FormControlLabel
            control={
              <Checkbox checked={state["251-450"]} onChange={PriceFilterChange} name="251-450" />
            }
            label="Rs251-450"
          />
          <FormControlLabel
            control={
              <Checkbox checked={state["450-1000"]} onChange={PriceFilterChange} name="450-1000" />
            }
            label="Rs450"
          />
        </FormGroup>

        {/* type filter checkbox */}

        <FormLabel component="legend">Type</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={state.Polo} onChange={TypeFilterChange} name="Polo" />
            }
            label="Polo"
          />
          <FormControlLabel
            control={
              <Checkbox checked={state.Hoodie} onChange={TypeFilterChange} name="Hoodie" />
            }
            label="Hoodie"
          />
          <FormControlLabel
            control={
              <Checkbox checked={state.Basic} onChange={TypeFilterChange} name="Basic" />
            }
            label="Basic"
          />
        </FormGroup>

      </FormControl>



    </Box>
  );
}
