import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import EditIcon from '@material-ui/icons/Edit';

import {
  Button,
  TextField,
} from "@material-ui/core";
import { createSection, useAuthState } from "../../context";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddSection(props) {
  const [open, setOpen] = React.useState(false);
  const [valueError, setValueError] = React.useState("");
  const [{ loading }, dispatch] = useAuthState();
  const [section, setSection] = useState(props.section);
  const testid = localStorage.getItem("testid")
  const sectionid = props.sectionid

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) =>
    setSection(e.target.value);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
    section === ""
    )
      setValueError("Enter valid values!");
    else {
      setValueError("")
      props.title === "Update section" ? props.updateSection(dispatch, testid, sectionid, section, props.createdBy) : createSection(dispatch, section, testid);
      formReset();
      handleClose();
    }
  };
  
  const formReset = () => {
    setSection("");
  };

  return (
    <>
      {loading ? (
        <div></div>
      ) : (
        <div>
          {props.text === "Add Section" ? 
          <Button
            onClick={handleClickOpen}
            variant="outlined"
            color="secondary"
            startIcon={<AddCircleIcon />}>
            {props.text}

          </Button>
            :
            <Button
            onClick={handleClickOpen}
            startIcon={<EditIcon />}>
            {props.text}
          </Button>
          }
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
              <form
                autoComplete="off"
                id="addSection"
                onSubmit={handleFormSubmit}
              >
                <TextField
                  required
                  id="section"
                  label="section"
                  name="section"
                  fullWidth
                  type="text"
                  variant="outlined"
                  className="mt-3 "
                  value={section}
                  onChange={(e) => handleInputChange(e)}
                />
              </form>
            </DialogContent>
            {valueError ? (
              <p className="text-small text-danger ml-4">{valueError}</p>
            ) : (
              <p></p>
            )}
            <DialogActions>
              <Button
                onClick={handleFormSubmit}
                color="primary"
                form="addSection"
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
}
