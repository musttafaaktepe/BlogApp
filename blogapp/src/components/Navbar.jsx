import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import NavbarLogin from "./NavbarLogin";
import { useState } from "react";

const Navbar = () => {
  const [navbarInfo, setNavbarInfo] = useState(true);

  return (
    <>
      {navbarInfo || (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                bloggapp
              </Typography>
              <Button color="inherit">Login</Button>
              <Button color="inherit">logout</Button>
            </Toolbar>
          </AppBar>
        </Box>
      )}

      {navbarInfo && <NavbarLogin />}
    </>
  );
};

export default Navbar;
