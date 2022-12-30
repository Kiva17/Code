import { createTheme } from "@mui/material/styles";
import { blueGrey,red  } from '@mui/material/colors';
const theme = createTheme({
  typography: {
    fontFamily: "Lato"
  },
  palette: {
    primary: {
    //   light: "#45c09f",
    //   main: "#00a278",
    //   dark: "#00845c",
    //   contrastText: "#fff",

    main: red[900] 
    },
    secondary: {
        // This is green.A700 as hex.
        main: blueGrey[900],
      },
  },
});

export default theme;
