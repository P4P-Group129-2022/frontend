import { styled } from "@mui/material/styles";
import { Box, Divider } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

import backgroundImage from "../../../public/assets/wallpaper.png";
import finderIcon from "../../../public/assets/icons/finder.png";
import launchpadIcon from "../../../public/assets/icons/launchpad.png";
import slackIcon from "../../../public/assets/icons/slack.png";
import vscodeIcon from "../../../public/assets/icons/vscode.png";
import terminalIcon from "../../../public/assets/icons/terminal.png";
import chromeIcon from "../../../public/assets/icons/chrome.png";
import trashIcon from "../../../public/assets/icons/trash.png";

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

type DockItem = {
  link: string;
  imgSrc: string;
};

const dockItems: DockItem[] = [
  {
    link: "",
    imgSrc: finderIcon,
  },
  {
    link: "",
    imgSrc: launchpadIcon,
  },
  {
    link: "chrome",
    imgSrc: chromeIcon,
  },
  {
    link: "slack",
    imgSrc: slackIcon,
  },
  {
    link: "vscode",
    imgSrc: vscodeIcon,
  },
  {
    link: "terminal",
    imgSrc: terminalIcon,
  },
];

function Dock() {
  return (
    // order is bottom-up due to "column-reverse" styling.
    <MainPageContainer>
      <DockContainer>
        {dockItems.map((item, index) => (
          <DockItemLink
            key={`dockItem-${index}-${item.link}`}
            to={item.link}
          >
            <DockItemImage alt={item.link} src={item.imgSrc} />
          </DockItemLink>
        ))}

        <DockDivider
          orientation="vertical"
          flexItem
        />

        <DockItemImage alt="trash" src={trashIcon} />
      </DockContainer>

      <WindowContainer>
        <Outlet />
      </WindowContainer>
    </MainPageContainer>
  );
}

export default Dock;
