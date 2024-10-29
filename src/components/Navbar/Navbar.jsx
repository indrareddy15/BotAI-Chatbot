import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4 from "@mui/icons-material/Brightness4";
import Brightness7 from "@mui/icons-material/Brightness7";
import { ThemeContext } from "../../Themes/Contexts";
import { useMediaQuery } from "@mui/material";

const Navbar = ({ handleSidebar }) => {
  const screenSize = useMediaQuery("(max-width:768px)");
  const { mode, setMode } = useContext(ThemeContext);

  return (
    <Box sx={{ flexGrow: 0, background: "none" }}>
      <AppBar
        position="static"
        sx={{
          background: "transperent",
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          {screenSize && (
            <IconButton
              onClick={() => {
                handleSidebar(true);
              }}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h1" component="h1" sx={{ flexGrow: 1 }}>
            Bot AI
          </Typography>
          <Typography
            variant="span"
            fontSize={16}
            lineHeight={1}
            component="h3"
            sx={{
              display: "-webkit-inline-flex",
              alignItems: "center",
              justifyContent: "center",
              height: "fit-content",
              color: "primary",
            }}
          >
            {mode}
          </Typography>
          <IconButton
            onClick={() => {
              setMode((prev) => (prev === "dark" ? "light" : "dark"));
            }}
          >
            {mode === "dark" ? (
              <Brightness4 fontSize="large" />
            ) : (
              <Brightness7 color="white" fontSize="large" />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
