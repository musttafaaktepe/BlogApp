import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import NavbarLogin from "./NavbarLogin";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RateReviewIcon from "@mui/icons-material/RateReview";
const Navbar = () => {
  const { loginInformation } = useSelector((state) => state.loginInfos);
  const navigate = useNavigate();

  return (
    <>
      {loginInformation || (
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
              <RateReviewIcon />
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, cursor:"pointer"  }  }
          
                onClick={() => navigate("/")}
              >
                blog
              </Typography>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate("/register")}>
                register
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      )}

      {loginInformation && <NavbarLogin />}
    </>
  );
};

export default Navbar;
