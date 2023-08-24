import React, { useState, useEffect, useContext } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Link } from "react-router-dom";
import { tokens, ThemeContext } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { GET_PROFILEPICTURE } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import AUTH from "../../utils/auth";
import { ADD_PROFILEPICTURE } from "../../utils/mutations";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  // Sidebar states and functions
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const { loading, data, refetch } = useQuery(GET_PROFILEPICTURE, {
    variables: {
      _id: AUTH.getProfile().data._id,
    },
  });

  useEffect(() => {
    refetch().then((newData) => {
      if (newData?.data?.profilePicture.profilePicture[0]) {
        setProfilePictureUrl(
          newData.data.profilePicture.profilePicture[0].pictureUrl
        );
      }
    });
  }, []);

  console.log("Profile picture data:", data);

  let profilePicture = "";
  if (data?.profilePicture.profilePicture[0]) {
    profilePicture = data?.profilePicture.profilePicture[0].pictureUrl;
  } else {
    profilePicture =
      "https://static.vecteezy.com/system/resources/previews/008/302/512/original/eps10-grey-user-solid-icon-or-logo-in-simple-flat-trendy-modern-style-isolated-on-white-background-free-vector.jpg";
  }
  // FormDialog states and functions
  const [open, setOpen] = useState(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState(profilePicture);
  const [addProfilePicture] = useMutation(ADD_PROFILEPICTURE);
  const navigate = useNavigate();

  const handleFormSubmit = async (values) => {
    try {
      const { data } = await addProfilePicture({
        variables: {
          _id: AUTH.getProfile().data._id,
          pictureUrl: values.pictureUrl,
        },
      });
      if (data) {
        setProfilePictureUrl(values.pictureUrl);
      }
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleResize = () => {
    console.log("Window resized:", window.innerWidth); // Debugging line
    if (window.innerWidth < 800) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 800) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          background: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px  5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={handleToggleCollapse}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            sx={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
              display: window.innerWidth < 800 ? "none" : "block",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  onClick={handleClickOpen}
                  role="button"
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={profilePictureUrl}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>

              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{
                    m: "10px 0 0 0",
                  }}
                >
                  Welcome!
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10X"}>
            <MenuItem
              active={selected === "Dashboard"}
              style={{ color: colors.grey[100] }}
              onClick={() => setSelected("Dashboard")}
              icon={<HomeOutlinedIcon />}
            >
              <Typography>Dashboard</Typography>
              <Link to="/" />
            </MenuItem>

            <MenuItem
              active={selected === "Applications"}
              style={{ color: colors.grey[100] }}
              onClick={() => setSelected("Applications")}
              icon={<WorkOutlineIcon />}
            >
              <Typography>Applications</Typography>
              <Link to="/applications" />
            </MenuItem>

            <MenuItem
              active={selected === "Contacts"}
              style={{ color: colors.grey[100] }}
              onClick={() => setSelected("Contacts")}
              icon={<ContactsOutlinedIcon />}
            >
              <Typography>Contacts</Typography>
              <Link to="/contacts" />
            </MenuItem>

            <MenuItem
              active={selected === "Calendar"}
              style={{ color: colors.grey[100] }}
              onClick={() => setSelected("Calendar")}
              icon={<CalendarTodayOutlinedIcon />}
            >
              <Typography>Calendar</Typography>
              <Link to="/calendar" />
            </MenuItem>

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{
                m: "15px 0 5px 20px",
              }}
            >
              Charts
            </Typography>

            <MenuItem
              active={selected === "Bar Chart"}
              style={{ color: colors.grey[100] }}
              onClick={() => setSelected("Bar Chart")}
              icon={<BarChartOutlinedIcon />}
            >
              <Typography>Bar Chart</Typography>
              <Link to="/bar" />
            </MenuItem>

            <MenuItem
              active={selected === "Pie Chart"}
              style={{ color: colors.grey[100] }}
              onClick={() => setSelected("Pie Chart")}
              icon={<PieChartOutlineOutlinedIcon />}
            >
              <Typography>Pie Chart</Typography>
              <Link to="/pie" />
            </MenuItem>

            <MenuItem
              active={selected === "Line Chart"}
              style={{ color: colors.grey[100] }}
              onClick={() => setSelected("Line Chart")}
              icon={<TimelineOutlinedIcon />}
            >
              <Typography>Line Chart</Typography>
              <Link to="/line" />
            </MenuItem>
          </Box>
        </Menu>
      </ProSidebar>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Profile Picture</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a URL to a hosted image and click apply.
          </DialogContentText>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={{ pictureUrl: "" }}
          >
            {(props) => {
              const {
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              } = props;
              return (
                <form onSubmit={handleSubmit}>
                  <TextField
                    autoFocus
                    margin="dense"
                    name="pictureUrl"
                    label="Picture URL"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={values.pictureUrl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.pictureUrl && !!errors.pictureUrl}
                    helperText={touched.pictureUrl && errors.pictureUrl}
                  />
                  <DialogActions>
                    <Button
                      onClick={handleClose}
                      sx={{ color: colors.greenAccent[600] }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      value="Submit"
                      onClick={() => {
                        handleClose();
                      }}
                      sx={{ color: colors.greenAccent[600] }}
                    >
                      Apply
                    </Button>
                  </DialogActions>
                </form>
              );
            }}
          </Formik>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Sidebar;
