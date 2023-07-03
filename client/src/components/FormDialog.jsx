import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function FormDialog({open, onClose}) {

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Profile Picture</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter a url to a hosted image and click apply.</DialogContentText>
          <TextField autoFocus margin="dense" id="name" label="URL" type="input" fullWidth variant="standard" />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={() => {
            onClose();
            
          }}>Apply</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialog;
