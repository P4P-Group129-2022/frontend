import { SyntheticEvent, useContext, useState } from "react";
import { Box, IconButton, Snackbar, SnackbarContent, Typography } from "@mui/material";
import { NotificationContent } from "../../types/NotificationTypes";
import { NotificationContext } from "../../contexts/NotificationContextProvider";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

const NotificationHeader = styled(Typography)({
  fontSize: "1.25rem",
  fontWeight: "bold",
});

const NotificationBody = styled(Typography)({
  display: "flex",
  fontSize: "1rem",
  fontWeight: "400",
  justifyContent: "center",
});

const NotificationIcon = styled("img")({
  height: "3.5rem",
  marginRight: "0.5rem",
  filter: "drop-shadow(2px 2px 8px #00000030)"
});

function Notification({ title, message, imageSrc }: NotificationContent) {
  const [open, setOpen] = useState(true);
  const { AUTO_HIDE_DURATION } = useContext(NotificationContext);

  console.log("notification open: ", { title, message, imageSrc });

  const closeNotification = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const imageUrl = (name: string) => `${process.env.PUBLIC_URL}/assets/icons/${name}.webp`;

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      onClose={closeNotification}
      autoHideDuration={AUTO_HIDE_DURATION}
    >
      <SnackbarContent
        style={{
          color: "#000000",
          backgroundColor: "#EAEAEAAA",
          maxWidth: "30rem",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        }}
        message={
          <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
          >
            {imageSrc && <NotificationIcon src={imageUrl(imageSrc)} alt={`${imageSrc} icon`} />}
            <Box
              display={"flex"}
              flexDirection={"column"}
            >
              <NotificationHeader>
                {title}
              </NotificationHeader>
              <NotificationBody>
                {message}
              </NotificationBody>
            </Box>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={closeNotification}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        }
      />
    </Snackbar>
  );
}

export default Notification;