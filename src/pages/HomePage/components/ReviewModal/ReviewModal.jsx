import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useMovieReviewQuery } from "../../../../hooks/useMovieReview";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const ReviewModal = ({ id }) => {
  const [open, setOpen] = useState(false);
  const { data, isLoading, isError, error } = useMovieReviewQuery(id);

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

  if (!data || data.results.length === 0) {
    return <Typography>리뷰 없음</Typography>;
  }

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        리뷰
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          리뷰
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
          {data.results.map((review) => (
            <Box key={review.id} mb={2}>
              <Typography variant="h6" gutterBottom>
                {review.author}
              </Typography>
              <Typography paragraph>{review.content}</Typography>
              {review.url && (
                <Typography
                  component="a"
                  href={review.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "white",
                  }}
                >
                  더보기
                </Typography>
              )}
            </Box>
          ))}
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default ReviewModal;
