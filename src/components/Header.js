import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { blueGrey} from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Search } from "@mui/icons-material";
import {
    InputAdornment,
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "./Header.css"
import { Link } from "react-router-dom";


export default function Header({ searchData, setSearchData, isCart }) {
    return (

        <Box sx={{ width: '100%', bgcolor: blueGrey[900] }}>

            <Grid container direction="row"
                justifyContent="space-between"
                alignItems="center">

                <Grid item xs={3} >
                    {/* clicking on Store text will navigate user to the Home page.  */}

                    <Link to={"/"} style={{ textDecoration: 'none' }} >
                        <Grid container
                            sx={{ p: 2 }} >
                            <h5 className="Store">Store</h5>
                        </Grid>
                    </Link>

                </Grid>

                {/* searchbar */}

                <Grid item xs={4}>
                    <Grid container>
                        {!isCart && <Grid item sx={{ width: '100%' }}>
                            <TextField id="outlined-basic" fullWidth variant="outlined" margin="dense" color="primary" size="small"

                                value={searchData} onChange={(e) => { setSearchData(e.target.value); }}

                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Search color="primary" />
                                        </InputAdornment>
                                    ),
                                }}

                            />

                        </Grid >}

                    </Grid>
                </Grid>
               

               {/* Shopping cart Icon */}

                <Grid item xs={3}>
                    <Grid container direction="row"
                        justifyContent="space-evenly">

                        <Button href={`/cart/`} startIcon={<ShoppingCartIcon fontSize="large" />}></Button>

                    </Grid>

                </Grid>

            </Grid>
        </Box>
    );
}
