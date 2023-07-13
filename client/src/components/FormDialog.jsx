import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ThemeContext, tokens } from "../theme";
import { useContext } from "react";
import { useTheme } from "@mui/material";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_PROFILEPICTURE } from "../utils/mutations";
import AUTH from "../utils/auth";

const initialValues = {
  pictureUrl: "",
};

function FormDialog({ open, onClose }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ThemeContext);
  const navigate = useNavigate();

  const [addProfilePicture] = useMutation(ADD_PROFILEPICTURE);
  const handleFormSubmit = async (values) => {
    console.log(values);
    try {
      const { data } = await addProfilePicture({
        variables: {
          _id: AUTH.getProfile().data._id,
          pictureUrl: values.pictureUrl,
        },
      });
      console.log(data);
      window.location.reload();
      // navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Profile Picture</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a url to a hosted image and click apply.
          </DialogContentText>
          <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
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
                      onClick={onClose}
                      sx={{ color: colors.greenAccent[600] }}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      value="Submit"
                      onClick={() => {
                        onClose();
                      }}
                      sx={{ color: colors.greenAccent[600] }}>
                      Apply
                    </Button>
                  </DialogActions>
                </form>
              );
            }}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default FormDialog;
