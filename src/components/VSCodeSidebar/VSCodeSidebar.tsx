import React from "react";
import { Box } from "@mui/material";

import { VSCODE_COLORS } from "../../theme/colors";
import VSCodeIcon from "../VSCodeIcon";

const VSCodeIconStyle: React.CSSProperties = {
  padding: "0.8rem 0",
  width: "100%",
  fontSize: "1.5rem",
};

function VsCodeSidebar() {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      width={"3.5rem"}
      bgcolor={VSCODE_COLORS.lightGrey}
      color={VSCODE_COLORS.sidebarIcon}
    >
      <VSCodeIcon iconName={"files"} style={{ ...VSCodeIconStyle, color: "white", borderLeft: "2px solid white" }} />
      <VSCodeIcon iconName={"search"} style={VSCodeIconStyle} />
      <VSCodeIcon iconName={"source-control"} style={VSCodeIconStyle} />
      <VSCodeIcon iconName={"debug-alt"} style={VSCodeIconStyle} />
      <VSCodeIcon iconName={"remote-explorer"} style={VSCodeIconStyle} />
      <VSCodeIcon iconName={"extensions"} style={VSCodeIconStyle} />

      {/* Placeholder for empty space in between. */}
      <Box flexGrow={1}></Box>

      <VSCodeIcon iconName={"account"} style={VSCodeIconStyle} />
      <VSCodeIcon iconName={"settings-gear"} style={VSCodeIconStyle} />
    </Box>
  );
}

export default VsCodeSidebar;