import {
  Button,
  Modal,
  Box,
  Typography,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { ReactComponent as Idea } from "../../assets/image 34.svg";

const FeedbackModal = ({ handleClose, open, setFeedback }) => {
  const [input, setInput] = useState("");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { md: 700, xs: "auto" },
    bgcolor: "primary.bglight",
    border: "2px solid",
    boxShadow: 24,
    borderRadius: 3,
    borderColor: "primary.main",
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} minWidth={300}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <IconButton>
            <Idea></Idea>
          </IconButton>
          <Typography variant="h3" component="h2" mr={{ md: 15 }}>
            Provide Additional Feedback
          </Typography>
          <IconButton
            onClick={() => {
              handleClose(false);
            }}
          >
            <Typography variant="h1" component="h1">
              X
            </Typography>
          </IconButton>
        </Stack>
        <Stack
          direction={"column"}
          component={"form"}
          onSubmit={(e) => {
            e.preventDefault();
            setFeedback(input);
            handleClose(false);
          }}
        >
          <TextField
            multiline
            borderRadius={3}
            width={"100%"}
            required
            maxRows={9}
            minRows={6}
            onChange={(e) => setInput(e.currentTarget.value)}
          />
          <Button
            sx={{
              bgcolor: "primary.main",
              color: "text.primary",
              width: "fit-content",
              alignSelf: "end",
              mt: 1,
              px: 3,
            }}
            type="submit"
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default FeedbackModal;
