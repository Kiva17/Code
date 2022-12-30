import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { Grid } from '@mui/material';
import { blueGrey,red  } from '@mui/material/colors';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Box } from '@mui/system';

import FilterButton from './FilterButton'

// import Datepicker from './Datepicker'

export default function Dialogbox({ ColorFilterChange, state,GenderFilterChange,PriceFilterChange,TypeFilterChange }) {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ minWidth: '100vw'}} >
      <Button variant="contained" onClick={handleClickOpen} sx={{ color: red[900], bgcolor: blueGrey[900]  }} startIcon={<FilterAltIcon />}>
      </Button>
      <Dialog open={open} onClose={handleClose}>

        {/* Header of the dialog box */}

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{m:0,p:0,b:0,color: red[900], bgcolor: blueGrey[900]}}
          
        >
          <DialogTitle>
              Filter
          </DialogTitle>

          <DialogTitle> 

          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{m:1,p:0}}
          >
            <CloseIcon />

          </IconButton>

          </DialogTitle>

        </Grid>

        {/* calling the filter component*/}

        <DialogContent sx={{ color: red[900], bgcolor: blueGrey[900], minWidth: '30vw'  }}>

          <FilterButton  state={state} ColorFilterChange={ColorFilterChange} GenderFilterChange={GenderFilterChange} 
          TypeFilterChange={TypeFilterChange}  PriceFilterChange={PriceFilterChange}/>


        </DialogContent>

         {/* close button */}

        <DialogActions sx={{ color: red[900], bgcolor: blueGrey[900]  }}>
          <Button variant="contained" sx={{  color: red[800], bgcolor: blueGrey[900]}}  onClick={handleClose}>Close</Button>
        </DialogActions>


      </Dialog>
    </Box>
  );
}