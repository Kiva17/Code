import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SnackbarProvider } from 'notistack';
import Theme from './Theme';
import { ThemeProvider } from "@mui/system";
import { BrowserRouter,Routes,Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
       <SnackbarProvider  autoHideDuration={1000}
    maxSnack={1}
    anchorOrigin={{
      vertical:"bottom",
      horizontal:"center"
    }}  
    preventDuplicate
    >
       <BrowserRouter>
    <App />
    </BrowserRouter>
     </SnackbarProvider>
     </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
