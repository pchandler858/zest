// signup page
import * as React from "react";
import {useState} from "react";
import {tokens} from "../../theme";
import {useTheme} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
import {Link} from "react-router-dom";

import {useMutation} from "@apollo/client";
import {ADD_USER} from "../../utils/mutations";
import Auth from "../../utils/auth";

function Copyright(props) {
  return (
    <Typography variant="body1" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Typography color="inherit" component="span">
        Zest
      </Typography>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

// const defaultTheme = createTheme();

export default function SignUp() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [formState, setFormState] = useState({firstName: "", lastName: "", email: "", password: ""});
  const [addUser, {error, data}] = useMutation(ADD_USER);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };

  // The handleChange function updates the formState value for the name
  // property to the value entered by the user in the form.
  const handleChange = (event) => {
    const {name, value} = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const {data} = await addUser({
        variables: {...formState},
      });
      console.log(Auth);
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }

    setFormState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  return (
    // <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: colors.primary[400],
        }}>
        <Avatar sx={{m: 2, bgcolor: colors.greenAccent[600]}}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{m: 1, p: 2}}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField autoComplete="given-name" name="firstName" required fullWidth id="firstName" label="First Name" value={formState.firstName} onChange={handleChange} autoFocus />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="family-name" value={formState.lastName} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" value={formState.email} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" value={formState.password} onChange={handleChange} />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2, backgroundColor: colors.greenAccent[600]}} onSubmit={handleSubmit}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/signIn" variant="body2" style={{textDecoration: "none", color: colors.grey[100]}}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          {error && <div className="my-3 p-3 bg-danger text-white">{error.message}</div>}
        </Box>
      </Box>
      <Copyright sx={{mt: 5}} />
    </Container>
    // </ThemeProvider>
  );
}
