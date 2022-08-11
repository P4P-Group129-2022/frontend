import { styled } from "@mui/material/styles";
import { Box, Divider, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

import backgroundImage from "../../assets/wallpaper.png";
import finderIcon from "../../assets/icons/finder.png";
import launchpadIcon from "../../assets/icons/launchpad.png";
import slackIcon from "../../assets/icons/slack.png";
import vscodeIcon from "../../assets/icons/vscode.png";
import terminalIcon from "../../assets/icons/terminal.png";
import chromeIcon from "../../assets/icons/chrome.png";
import trashIcon from "../../assets/icons/trash.png";

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

const DockItemLink = styled(Link)({
  textDecoration: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
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
  link?: string;
  imgSrc: string;
  name: string;
};

const dockItems: DockItem[] = [
  {
    link: "/scenario-select",
    imgSrc: finderIcon,
    name: "Finder",
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
    link: "slack",
    imgSrc: slackIcon,
    name: "Slack",
  },
  {
    link: "vscode",
    imgSrc: vscodeIcon,
    name: "Visual Studio Code",
  },
  {
    link: "terminal",
    imgSrc: terminalIcon,
    name: "Terminal",
  },
];

function Dock() {
  return (
    // order is bottom-up due to "column-reverse" styling.
    <MainPageContainer>
      <DockContainer>
        {dockItems.map((item, index) =>
          <DockTooltip title={item.name} key={`dockItem-${index}-${item.link}`}>
            {item.link ? (
              <DockItemLink
                to={item.link}
              >
                <DockItemImage alt={item.link} src={item.imgSrc} />
              </DockItemLink>
            ) : (
              <DockItemImage key={`dockItem-${index}`} alt={item.link} src={item.imgSrc} />
            )}
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

      <WindowContainer>
        <Outlet />
      </WindowContainer>
    </MainPageContainer>
  );
}

export default Dock;
