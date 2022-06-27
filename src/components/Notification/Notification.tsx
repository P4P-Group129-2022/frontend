import { useContext, useState } from "react";
import { Snackbar, Typography } from "@mui/material";
import { NotificationContent } from "../../types/NotificationTypes";
import { NotificationContext } from "../../contexts/NotificationContextProvider";

function Notification({ title, message, imageSrc }: NotificationContent) {
  const [open, setOpen] = useState(true);
  const { AUTO_HIDE_DURATION } = useContext(NotificationContext);

  console.log("content: ", { title, message, imageSrc });

  const closeNotification = () => setOpen(false);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      onClose={closeNotification}
      autoHideDuration={AUTO_HIDE_DURATION}
      message={
        <>
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
          <Typography variant="body1">
            {message}
          </Typography>
          {imageSrc && <img src={require(`../../assets/${imageSrc}`)} alt={imageSrc} height="24px" />}
        </>
      }
    />
  );
}

export default Notification;