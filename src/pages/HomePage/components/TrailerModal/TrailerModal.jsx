import React, { useState } from "react";
import Button from "@mui/material/Button";
import YouTube from "react-youtube";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { useMovieTrailerQuery } from "../../../../hooks/useMovieTrailer";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const TrailerModal = ({ id }) => {
  const [open, setOpen] = useState(false);
  const { data, isLoading, isError, error } = useMovieTrailerQuery(id);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert variant="filled" severity="error">
        {error.message}
      </Alert>
    );
  }

  const trailers = data.filter(
    (video) => video.type === "Trailer" && video.official
  );
  const trailerKey = trailers.length > 0 ? trailers[0].key : null;

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        예고편
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          예고편
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {trailerKey ? (
            <YouTube
              videoId={trailerKey}
              opts={{
                height: "500",
                width: "100%",
              }}
            />
          ) : (
            <Typography>예고편 없음</Typography>
          )}
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default TrailerModal;
