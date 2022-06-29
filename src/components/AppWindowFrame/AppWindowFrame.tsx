import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "../../theme";

type Props = {
  children: React.ReactNode;
  frameColor: string;
  backgroundColor?: string;
  title?: string;
};

const Frame = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
  height: "2rem",
  minHeight: "2rem",
});

const FrameSection = styled(Box)({
  display: "flex",
  minWidth: "5rem",
  alignItems: "center",
});

const CircleButton = styled(Box)({
  display: "flex",
  borderRadius: "50%",
  height: "0.75rem",
  width: "0.75rem",
  margin: "0 4px",
});

const Title = styled(Typography)({
  padding: "0 3rem",
  fontSize: "0.85rem",
  fontWeight: "bold",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

const MainContentsContainer = styled(Box)({
  flexGrow: 1,
});

const redButtonColor = "#EE695E";
const yellowButtonColor = "#F4BE4F";
const greenButtonColor = "#62C554";

function AppWindowFrame({ children, frameColor, backgroundColor = "#ffffff", title }: Props) {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      height={"100%"}
    >
      <Frame bgcolor={frameColor}>
        <FrameSection justifyContent={"left"}>
          <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            marginLeft={"0.5rem"}
          >
            <CircleButton bgcolor={redButtonColor} />
            <CircleButton bgcolor={yellowButtonColor} />
            <CircleButton bgcolor={greenButtonColor} />
          </Box>
        </FrameSection>

        <FrameSection justifyContent={"center"} flexGrow={1}>
          <Title
            sx={{
              color: theme.palette.getContrastText(frameColor),
            }}
          >
            {title}
          </Title>
        </FrameSection>

        {/*  Just a placeholder to divide item containers in perfect thirds.  */}
        <FrameSection justifyContent={"right"} />
      </Frame>

      <MainContentsContainer bgcolor={backgroundColor}>
        {children}
      </MainContentsContainer>
    </Box>
  );
}

export default AppWindowFrame;