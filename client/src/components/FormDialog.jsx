import * as React from "react";
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

function FormDialog({ open, onClose }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ThemeContext);

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Profile Picture</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a url to a hosted image and click apply.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="URL"
            type="input"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} sx={{ color: colors.greenAccent[600] }}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onClose();
            }}
            sx={{ color: colors.greenAccent[600] }}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialog;
