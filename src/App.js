import React, { useEffect, useMemo, useState } from "react";

import { Outlet } from 'react-router-dom';
import { ThemeContext } from './Themes/Contexts';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getPallete } from './Themes/Pallate';
import { defaultChats } from './AIData/defaultChat';

import CssBaseline from "@mui/material/CssBaseline";
import Grid from '@mui/material/Grid2';
import AIData from './AIData/ai-data.json';
import SideMenu from './components/SideMenu/SideMenu';
import './App.css';



function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");
  const [chats, setChats] = useState([])

  const theme = useMemo(() => createTheme(getPallete(mode)), [mode]);
  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode: mode, setMode: setMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container sx={{
          background:
            "linear-gradient(rgba(215, 199, 244, 0.2), rgba(151, 133, 186, 0.2))",
        }} className={''}
        >
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              bgcolor: 'primary.light',
              '@media (max-width:768px)': {
                width: '75%',
                transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
                transition: 'transform 300ms ease',
              },
            }}
            position={{ xs: 'fixed', md: 'relative' }}
            height={'100vh'}
            zIndex={{ xs: 2, md: 1 }}
            boxShadow={{ xs: isOpen ? "10" : 0, md: 'none' }}
          ><SideMenu handleClose={setIsOpen} setChats={setChats} ></SideMenu></Grid>
          <Grid item xs={12} md={9}>
            <Outlet context={{ isOpen: isOpen, handleSidebar: setIsOpen, defaultChats: defaultChats, AIData, chats, setChats }}></Outlet>
          </Grid>
        </Grid>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
export default App;
