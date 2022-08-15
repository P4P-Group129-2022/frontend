import { styled } from "@mui/material/styles";
import {
  Box,
  Dialog, DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Tooltip,
  tooltipClasses,
  TooltipProps
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { NotificationContext } from "../../contexts/NotificationContextProvider";

import backgroundImage from "../../assets/wallpaper.webp";
import finderIcon from "../../assets/icons/finder.webp";
import launchpadIcon from "../../assets/icons/launchpad.webp";
import slackIcon from "../../assets/icons/slack.webp";
import vscodeIcon from "../../assets/icons/vscode.webp";
import terminalIcon from "../../assets/icons/terminal.webp";
import chromeIcon from "../../assets/icons/chrome.webp";
import trashIcon from "../../assets/icons/trash.webp";
import Button from "../Button";

const MainPageContainer = styled("div")({
  display: "flex",
  flexDirection: "column-reverse",
  justifyContent: "space-between",
  height: "100vh",
  alignItems: "center",
  width: "100vw",
  color: "black",
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
});

const WindowContainer = styled(Box)({
  overflow: "auto",
  borderRadius: 12,
  width: "99vw",
  minHeight: "0px",
  margin: "0.5vw",
  flexGrow: 1,
  boxShadow: "0px 0px 4px 4px rgba(0,0,0,0.20)",
  border: "0.5px solid #FFFFFF40",
});

const DockContainer = styled("div")({
  border: "1px solid #FFFFFF40",
  backgroundColor: "#00000023",
  borderRadius: 21,
  display: "flex",
  flexDirection: "row",
  padding: "6px",
  marginBottom: 4,
  width: "max-content",
  backdropFilter: "blur(24px)",
});

const DockItemImage = styled("img")({
  borderRadius: 12,
  width: "8vh",
  height: "8vh",
  margin: "0 5px",
});

const DockDivider = styled(Divider)({
  backgroundColor: "#FFFFFF30",
  width: "1.5px",
  margin: "1vh 20px"
});

const DockTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#EAEAEA",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#EAEAEA",
    backdropFilter: "blur(12px)",
    color: "#000000",
    fontSize: "0.9rem",
    fontWeight: 400,
  },
});

type DockItem = {
  onClick?: () => void;
  imgSrc: string;
  name: string;
};

enum ExitDialogAction {
  EXIT, CANCEL
}

function Dock() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { clearNotifications } = useContext(NotificationContext);

  const handleExit = (value: ExitDialogAction) => {
    setOpen(false);
    if (value === ExitDialogAction.EXIT) {
      clearNotifications();
      navigate("/scenario-select");
    }
  };

  const onFinderClick = () => setOpen(true);
  const onClickNavigate = (link: string) => () => navigate(link);

  const dockItems: DockItem[] = [
    {
      imgSrc: finderIcon,
      name: "Finder",
      onClick: onFinderClick,
    },
    {
      imgSrc: launchpadIcon,
      name: "Launchpad",
    },
    {
      imgSrc: chromeIcon,
      name: "Chrome",
    },
    {
      onClick: onClickNavigate("slack"),
      imgSrc: slackIcon,
      name: "Slack",
    },
    {
      onClick: onClickNavigate("vscode"),
      imgSrc: vscodeIcon,
      name: "Visual Studio Code",
    },
    {
      onClick: onClickNavigate("terminal"),
      imgSrc: terminalIcon,
      name: "Terminal",
    },
  ];

  return (
    // order is bottom-up due to "column-reverse" styling.
    <MainPageContainer>
      <DockContainer>
        {dockItems.map((item, index) =>
          <DockTooltip title={item.name} key={`dockItem-${index}`}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              style={item.onClick ? { cursor: "pointer" } : undefined}
              onClick={item.onClick}
            >
              <DockItemImage alt={item.name} src={item.imgSrc} />
            </Box>
          </DockTooltip>
        )}

        <DockDivider
          orientation="vertical"
          flexItem
        />

        <DockTooltip title="Trash">
          <DockItemImage alt="trash" src={trashIcon} />
        </DockTooltip>
      </DockContainer>

      <Dialog
        open={open}
        onClose={() => handleExit(ExitDialogAction.CANCEL)}
      >
        <DialogTitle fontSize={"1.5rem"}>{"Exit Scenario?"}</DialogTitle>
        <DialogContent>
          <DialogContentText fontSize={"1rem"}>
            Scenario will only replay from the start. Are you sure you want to exit?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            size={"small"}
            onClick={() => handleExit(ExitDialogAction.CANCEL)}
            sx={{ width: "7rem" }}
          >
            Cancel
          </Button>
          <Button
            size={"small"}
            onClick={() => handleExit(ExitDialogAction.EXIT)}
            sx={{ width: "7rem" }}
          >
            Exit
          </Button>
        </DialogActions>
      </Dialog>

      <WindowContainer>
        <Outlet />
      </WindowContainer>
    </MainPageContainer>
  );
}

export default Dock;
