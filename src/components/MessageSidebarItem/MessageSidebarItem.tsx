import React from "react";

import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Box, SvgIconTypeMap, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SLACK_COLORS } from "../../theme/colors";

type Props = {
  icon: React.ReactElement<SvgIconTypeMap>;
  title: string,
  sx?: React.CSSProperties,
  titleSx?: React.CSSProperties,
};

const Title = styled(Typography)({
  fontSize: "1.25rem",
  marginLeft: "1rem",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

function MessageSidebarItem({ icon, title, sx, titleSx }: Props) {
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
      height={"1.5rem"}
      width={"100%"}
      justifyContent={"left"}
      margin={"0.5rem 0"}
      color={SLACK_COLORS.sideBarTextColor}
      sx={sx}
    >
      {icon}
      <Title variant="caption" sx={titleSx}>{title}</Title>
    </Box>
  );
}

export default MessageSidebarItem;