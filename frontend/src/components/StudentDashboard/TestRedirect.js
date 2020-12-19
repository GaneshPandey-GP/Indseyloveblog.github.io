import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import PublishIcon from "@material-ui/icons/Publish";
import { useAuthState } from "../../context";
import { SimpleBackdrop } from "../Loading";
import { Link } from "react-router-dom";

export default function TestRedirect({ handleSubmit }) {
  const [open, setOpen] = React.useState(false);
  const [{ load }] = useAuthState();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))

  const handleClickOpen = (e) => {
    setOpen(true)
    handleSubmit(e);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<PublishIcon />}
        onClick={handleClickOpen}
      >
        Submit
      </Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        {load ? (
          <SimpleBackdrop />
        ) : (
          <>
            <DialogTitle>{"Test Submitted!"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Your response has been recorded.
              </DialogContentText>
              <Link to="/your-results">
                <Button
                  autoFocus
                  onClick={handleClose}
                  color="primary"
                  variant="contained"
                >
                  View Submission
                </Button>
              </Link>

              <p className="mt-2 mb-2 ">
                <Link to="/stud-dashboard">Back to home</Link>
              </p>
            </DialogContent>
          </>
        )}
      </Dialog>
    </div>
  );
}
