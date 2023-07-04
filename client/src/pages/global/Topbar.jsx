import { Link } from "react-router-dom";
import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { ThemeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SearchIcon from "@mui/icons-material/Search";
import AuthService from "../../utils/auth";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";

const Topbar = () => {
  const [loggedIn, setLoggedIn] = useState(AuthService.isUserLoggedIn());
  const [openDialog, setOpenDialog] = useState(false); // State for controlling Dialog open/close
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ThemeContext);

  useEffect(() => {
    setLoggedIn(AuthService.isUserLoggedIn());
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    setLoggedIn(false);
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* search bar */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* icons */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <Link to="/form">
          <IconButton>
            <PersonOutlinedIcon />
          </IconButton>
        </Link>
        {/* <IconButton></IconButton> */}
        {loggedIn && (
          <>
            <IconButton onClick={() => setOpenDialog(true)}>
              <LogoutOutlinedIcon />
            </IconButton>
            <Dialog
              open={openDialog}
              onClose={() => setOpenDialog(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to log out?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)} sx={{ color: colors.greenAccent[600] }}>Cancel</Button>
                <Button onClick={handleLogout} color="primary" autoFocus sx={{ color: colors.greenAccent[600] }} >
                  Logout
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Topbar;
