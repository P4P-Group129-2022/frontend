import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

import backgroundImage from "../../assets/wallpaper.png";

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

function Dock() {
  return (
    <MainPageContainer>
      {/* styling is reversed cause it needs to be aligned "column-reverse" */}
      <DockContainer>
        <Link style={{ textDecoration: "none", color: "black" }} to="finder">
          <DummyTextPlacer>Finder</DummyTextPlacer>
        </Link>
        <Link style={{ textDecoration: "none", color: "black" }} to="slack">
          <DummyTextPlacer>Slack</DummyTextPlacer>
        </Link>
        <Link style={{ textDecoration: "none", color: "black" }} to="terminal">
          <DummyTextPlacer>Terminal</DummyTextPlacer>
        </Link>
      </DockContainer>
      <Outlet />
    </MainPageContainer>
  );
}

export default Dock;
