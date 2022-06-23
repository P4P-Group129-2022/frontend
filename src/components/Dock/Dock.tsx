import { styled } from "@mui/material/styles";
import { Box, Divider, Typography } from "@mui/material";
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

const DockContainer = styled("div")({
  border: "2 solid black",
  backgroundColor: "#00000023",
  borderRadius: 16,
  display: "flex",
  flexDirection: "row",
  padding: "1rem 2rem",
  marginBottom: 24,
  width: "max-content",
  height: "2rem",
});

const DummyTextPlacer = styled(Typography)({
  border: "2 solid black",
  borderRadius: 12,
  fontSize: "1.5rem",
  padding: "10px",
  textAlign: "center",
  alignItems: "center",
  justifyContent: "center",
});

const DockItemImage = styled("img")({
  borderRadius: 12,
  width: "9vh",
  height: "9vh",
  margin: "0 5px",
});

type DockItem = {
  link: string;
  imgSrc: string;
};

const dockItems: DockItem[] = [
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
    <MainPageContainer>
      {/* order is reversed due to "column-reverse" styling. */}
      <DockContainer>
        <DockItemImage alt="finder" src={finderIcon} />
        <DockItemImage alt="launchpad" src={launchpadIcon} />
        {dockItems.map((item, index) => (
          <Link
            id={`dockItem-${index}-${item.link}`}
            style={{ textDecoration: "none", color: "black" }}
            to={item.link}
          >
            <DockItemImage alt={item.link} src={item.imgSrc} />
          </Link>
        ))}

        <Divider
          orientation="vertical"
          flexItem
          sx={{ bgcolor: "#00000088", margin: "0 20px" }}
        />

        <DockItemImage alt="trash" src={trashIcon} />
      </DockContainer>
      <Outlet />
    </MainPageContainer>
  );
}

export default Dock;
