import { useContext, useState } from "react";
import { Snackbar, SnackbarContent, Typography } from "@mui/material";
import { NotificationContent } from "../../types/NotificationTypes";
import { NotificationContext } from "../../contexts/NotificationContextProvider";
import { styled } from "@mui/material/styles";

const NotificationHeader = styled(Typography)({
  fontSize: "1.25rem",
  fontWeight: "bold",
});

const NotificationBody = styled(Typography)({
  display: "flex",
  fontSize: "1rem",
  justifyContent: "center",
});

function Notification({ title, message, imageSrc }: NotificationContent) {
  const [open, setOpen] = useState(true);
  const { AUTO_HIDE_DURATION } = useContext(NotificationContext);

  console.log("notification open: ", { title, message, imageSrc });

  const closeNotification = () => setOpen(false);
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
          backgroundColor: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          maxWidth: "30rem",
        }}
        message={
          <>
            <NotificationHeader>
              {title}
            </NotificationHeader>
            <NotificationBody>
              {message}
              <span>
                {imageSrc && <img src={imageUrl(imageSrc)} alt={imageSrc} height="52px" />}
              </span>
            </NotificationBody>
          </>
        }
      />
    </Snackbar>
  );
}

export default Notification;