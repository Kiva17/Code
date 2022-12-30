import Grid from '@mui/material/Grid';

import { blueGrey} from '@mui/material/colors';

import "./Footer.css"

export default function Footer() {
    return (
        <Grid container direction="row"
        justifyContent="center"
        alignItems="center" sx={{ width: '100%',height:'100%', bgcolor: blueGrey[900] }}><p className="footerText">&#169;Created by Avik</p></Grid>
    )

}