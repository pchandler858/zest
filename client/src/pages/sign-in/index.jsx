// signin page
import * as React from "react";
import { useState } from "react";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { motion } from "framer-motion";

function Copyright(props) {
  return (
    <Typography
      variant="body1"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Typography color="inherit" component="span">
        Zest
      </Typography>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      console.log(Auth);
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <motion.div
        initial={{ opacity: 0, y: -500, scale: 0.5, rotate: 360 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
        transition={{
          type: "tween",
          duration: 1,
          ease: "easeInOut",
          when: "beforeChildren",
        }}
        style={{
          marginTop: "3rem",
          textAlign: "center",
          color: colors.greenAccent[600],
          fontSize: "8rem",
          fontFamily: "'Special Elite', cursive",
        }}
      >
        zest
      </motion.div>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: colors.primary[400],
        }}
      >
        <Avatar sx={{ m: 2, bgcolor: colors.greenAccent[600] }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ m: 1, p: 2 }}
        >
          {data ? (
            <Typography variant="h5">
              Success! You may now head{" "}
              <Link to="/">back to the homepage.</Link>
            </Typography>
          ) : (
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formState.email}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formState.password}
                onChange={handleChange}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: colors.greenAccent[600] }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    to="/signUp"
                    style={{ textDecoration: "none", color: colors.grey[100] }}
                  >
                    {" "}
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              {error && (
                <div className="my-3 p-3 bg-danger text-white">
                  {error.message}
                </div>
              )}
            </>
          )}
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
